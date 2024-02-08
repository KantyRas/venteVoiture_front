import React, { useState } from "react";
import { request } from "../helper/axios_helper";

export default function AjoutMarque() {
    const [marque, setMarque] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await request("post", "/inserer_marque", { marque });
            if (response.status === 200) {
                console.log("Ajout de la marque réussi !");
                setMarque('');
            } else {
                console.error("Erreur lors de l'ajout de la marque :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la marque :", error);
        }
    };

    /*const handleClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch("https://voiture-backend-production.up.railway.app/inserer_marque", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ marque })
                });
                if (response.ok) {
                    console.log("Ajout de la marque réussi !");
                    // Réinitialiser le champ de saisie après l'ajout réussi
                    setMarque('');
                } else {
                    console.error("Erreur lors de l'ajout de la marque :", response.statusText);
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de la marque :", error);
            }
        }
    }*/

    return (
        <form className="row g-3">
            <div className="article-entry col-md-3 mt-3">
                <label htmlFor="marque" className="form-label">Marque</label>
                <input type="text" className="form-control" name="marque" value={marque} onChange={(e) => setMarque(e.target.value)} />
            </div>

            <div className="col-12 mt-3">
                <button type="submit" onClick={handleClick} className="btn btn-primary">Valider</button>
            </div>
        </form>
    );
}
