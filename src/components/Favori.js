import voiture from "../assets/images/voiture.jpg";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {request} from "../helper/axios_helper";

function Favori(){
    const [favoris,setFavori] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        request("get", `/liste_favori/${user.id}`)
            .then(response => {
                setFavori(response.data);
            })
            .catch(error => {
                console.error('Error fetching favori:', error);
            });
    }, [user.id]);
    
    return(
        <>
            {favoris.map(favori => (
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="img-container">
                            <img src={voiture} className="card-img-top" alt="Car" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Numero annonce :{favori.idannonce}</h5>
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