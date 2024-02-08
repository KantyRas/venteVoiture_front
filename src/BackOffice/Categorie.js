import React, { useEffect, useState } from "react";
import { request } from "../helper/axios_helper";
import {Link} from "react-router-dom";

export default function Categorie() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        request("get", "/liste_categorie")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    /*useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://voiture-backend-production.up.railway.app/liste_categorie", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, []);*/

    return (
        <>
    <>
        <Link to="/ajout_categorie" className="btn btn-primary">
            ajout categorie
        </Link>
    </>

    <>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Categorie</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {categories.map(categ => (
                <tr key={categ.idCategorie}>
                    <th scope="row">{categ.idCategorie}</th>
                    <td>{categ.categorie}</td>
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
