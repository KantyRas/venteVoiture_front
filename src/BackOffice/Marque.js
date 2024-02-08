import React, {useEffect, useState} from "react";
import { request } from "../helper/axios_helper";
import {Link} from "react-router-dom";

export default function Marque(){
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

    /*useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://voiture-backend-production.up.railway.app/liste_marques", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setMarques(response.data);
                })
                .catch(error => {
                    console.error('Error fetching marques:', error);
                });
        }
    }, []);*/


    return (
        <>
            <>
                <Link to="/ajout_marque" className="btn btn-primary">
                    ajout marque
                </Link>
            </>

            <>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Marque</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Marques.map(ss => (
                        <tr key={ss.idmarque}>
                            <th scope="row">{ss.idmarque}</th>
                            <td>{ss.marque}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        </>
    );
}