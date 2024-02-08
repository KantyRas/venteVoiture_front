import voiture from "../assets/images/voiture.jpg";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {request} from "../helper/axios_helper";

function Favori(){
    const [favoris,setFavori] = useState([]);

    useEffect(() => {
        request("get", "/all_favori")
            .then(response => {
                setFavori(response.data);
            })
            .catch(error => {
                console.error('Error fetching favori:', error);
            });
    }, []);
    
    return(
        <>
            {favoris.map(favori => (
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="img-container">
                            <img src={voiture} className="card-img-top" alt="Car" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{favori.modele}</h5>
                            <p className="card-text">{favori.matricule}</p>
                        </div>
                        <div className="mb-3 d-flex justify-content-around align-items-center">
                            <h3>{favori.prix}</h3>
                            <Link to={`/details/${favori.idannonce}`} className="btn btn-primary" key={favori.idannonce}>Détails</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
export default Favori;