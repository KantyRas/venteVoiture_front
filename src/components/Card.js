import "../assets/css/card.css";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { request } from "../helper/axios_helper";

function Card() {
    const [annonces, setAnnonces] = useState([]);
    const [favoris, setFavoris] = useState([]);
    const [favorisCharges, setFavorisCharges] = useState(false); 
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        request("get", "/validation/1")
            .then(response => {
                setAnnonces(response.data);
            })
            .catch(error => {
                console.error('Error fetching annonces:', error);
            });
    }, []);

    const fetchUserFavorites = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !user) {
                return;
            }
            const response = await request("get", `/liste_favori/${user.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setFavoris(response.data.map(favori => favori.idannonce));
                setFavorisCharges(true); 
            } else {
                console.error('Erreur lors de la récupération des favoris :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris :', error);
        }
    }, [user]);

    useEffect(() => {
        if (user && !favorisCharges) { 
            fetchUserFavorites();
        }
    }, [user, favorisCharges, fetchUserFavorites]); 

    const isAlreadyFavorite = (idannonce) => {
        return favoris.includes(idannonce);
    };

    const handleToggleFavorite = async (idannonce) => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !user) {
                return;
            }
    
            const isFavorite = isAlreadyFavorite(idannonce);
    
            const method = isFavorite ? 'delete' : 'post';
    
            const endpoint = isFavorite ? `/favori/${idannonce}` : '/inserer_favori';
    
            const response = await request(method, endpoint, { idannonce, idutilisateur: user.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                if (method === 'delete') {
                    setFavoris(prevFavoris => prevFavoris.filter(fav => fav !== idannonce));
                } else {
                    setFavoris(prevFavoris => [...prevFavoris, idannonce]);
                }
            } else {
                console.error('Erreur lors de la modification des favoris :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la modification des favoris :', error);
        }
    };

    return (
        <>
            {annonces.map(annonce => (
                <div className="col-md-3 mb-4" key={annonce.idannonce}>
                    <div className="card">
                        {annonce.etat === 0 ? (
                            <span style={{color:"green"}}>En vente</span>
                        ) : (
                            <span style={{color:"red"}}>Vendu</span>
                        )}
                        <div className="img-container">
                            <img src={annonce.imagelinks} className="card-img-top" alt="Car" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"> {annonce.marque.marque} {annonce.modele}</h5>
                        </div>
                        <div className="mb-3 d-flex justify-content-around align-items-center">
                            <h5>{annonce.prix} Mga</h5>
                            <button className={`favorite-btn ${isAlreadyFavorite(annonce.idannonce) ? 'active' : ''}`} onClick={() => handleToggleFavorite(annonce.idannonce)}>
                                <span className="heart-icon"></span>
                            </button>
                            <Link to={`/details/${annonce.idannonce}`} className="btn btn-primary">Détails</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Card;
