import React, { useState } from "react";
import { request } from "../helper/axios_helper";

export default function AjoutCategorie() {
    const [categorie, setCategorie] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await request("post", "/inserer_categorie", { categorie });
            if (response.status === 200) {
                console.log("Ajout de la catégorie réussi !");
                setCategorie('');
            } else {
                console.error("Erreur lors de l'ajout de la catégorie :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        }
    };

    /*const handleClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch("https://voiture-backend-production.up.railway.app/inserer_categorie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ categorie })
                });
                if (response.ok) {
                    console.log("Ajout de la catégorie réussi !");
                    // Réinitialiser le champ de saisie après l'ajout réussi
                    setCategorie('');
                } else {
                    console.error("Erreur lors de l'ajout de la catégorie :", response.statusText);
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de la catégorie :", error);
            }
        }
    }*/

    return (
        <form className="row g-3">
            <div className="article-entry col-md-3 mt-3">
                <label htmlFor="categorie" className="form-label">Catégorie</label>
                <input type="text" className="form-control" name="categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
            </div>

            <div className="col-12 mt-3">
                <button type="submit" onClick={handleClick} className="btn btn-primary">Valider</button>
            </div>
        </form>
    );
}
