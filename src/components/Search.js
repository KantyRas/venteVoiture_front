import "../assets/css/search-bar.css";
import React, { useEffect, useState } from "react";
import { request } from "../helper/axios_helper";
import voiture from "../assets/images/voiture.jpg";
import {Link} from "react-router-dom";
import "../assets/css/card.css";

function Search() {
    const [minPrix, setMinPrix] = useState('');
    const [maxPrix, setMaxPrix] = useState('');
    const [idmarque, setIdmarque] = useState(0);
    const [modele, setModele] = useState('');
    const [idcategorie, setIdcategorie] = useState(0);
    const [recherches, setRecherche] = useState([]);
    const [Categories, setCategoriess] = useState([]);
    const [Marques, setMarques] = useState([]);

    useEffect(() => {
        request("get", "/liste_marques")
            .then(response => {
                setMarques(response.data);
            })
            .catch(error => {
                console.error('Error fetching marques:', error);
            });
    }, []);

    useEffect(() => {
        request("get", "/liste_categorie")
            .then(response => {
                setCategoriess(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await request("get", `/recherche/${minPrix}/${maxPrix}/${idmarque}/${modele}/${idcategorie}`);
            setRecherche(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="wrapper">
                    <div className="search-container">
                        <input type="number" className="search" placeholder="Prix minimum" value={minPrix} onChange={(e) => setMinPrix(e.target.value)} />

                        <input type="number" className="search" placeholder="Prix maximum" value={maxPrix} onChange={(e) => setMaxPrix(e.target.value)} />

                        <input type="text" className="search" placeholder="Modèle" value={modele} onChange={(e) => setModele(e.target.value)} />

                        <select className="search" value={idmarque} onChange={(e) => setIdmarque(e.target.value)}>
                            {Marques.map(ss => (
                                <option value={ss.idmarque} key={ss.idmarque}>{ss.marque}</option>
                            ))}
                        </select>

                        <select className="search" value={idcategorie} onChange={(e) => setIdcategorie(e.target.value)}>
                            {Categories.map(ca => (
                                <option value={ca.idCategorie} key={ca.idCategorie}>{ca.categorie}</option>
                            ))}
                        </select>

                        <button type="submit" className="button-s">Rechercher</button>
                    </div>
                </div>
            </form>
        </div>
            <>
                {recherches.map(r => (
                    <div className="col-md-3 mb-4" key={r.idannonce}>
                        <div className="card">
                            {r.etat === 0 ? (
                                <span style={{color:"green"}}>En vente</span>
                            ) : (
                                <span style={{color:"red"}}>Vendu</span>
                            )}
                            <div className="img-container">
                                <img src={voiture} className="card-img-top" alt="Car" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{r.modele}</h5>
                                <p className="card-text">{r.matricule}</p>
                            </div>
                            <div className="mb-3 d-flex justify-content-around align-items-center">
                                <h3>{r.prix}</h3>
                                <Link to={`/details/${r.idannonce}`} className="btn btn-primary">Détails</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        </>
    );
}

export default Search;
