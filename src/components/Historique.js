import voiture from "../assets/images/voiture.jpg";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../assets/css/card.css";
import {request} from "../helper/axios_helper";

function Historique(){
    const [historiques, setHistorique] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    useEffect(() => {
        request("get", `/historique/${userId}`)
            .then(response => {
                setHistorique(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return(
        <>
            {historiques.map(historique => (
                <div className="col-md-3 mb-4" key={historique.idannonce}>
                    <div className="card">
                        {historique.etat === 0 ? (
                            <span style={{color:"green"}}>En vente</span>
                        ) : (
                            <span style={{color:"red"}}>Vendu</span>
                        )}
                        <div className="img-container">
                            <img src={voiture} className="card-img-top" alt="Car" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{historique.modele}</h5>
                            <p className="card-text">{historique.matricule}</p>
                        </div>
                        <div className="mb-3 d-flex justify-content-around align-items-center">
                            <h3>{historique.prix}</h3>
                            <Link to={`/details/${historique.idannonce}`} className="btn btn-primary">Détails</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
export default Historique;