import React, { useEffect, useState } from "react";
import { request } from "../helper/axios_helper";

export default function Validation() {
    const [validations, setValidation] = useState([]);

    useEffect(() => {
        request("get", "/validation/0")
            .then(response => {
                setValidation(response.data);
            })
            .catch(error => {
                console.error('Error fetching validation:', error);
            });
    }, []);

    const handleValidation = async (idAnnonce) => {
        try {
            const response = await request("patch", `/${idAnnonce}/valider?newvalidation=1`, null);
            if (response.status === 200) {
                const updatedValidations = validations.filter(validation => validation.idannonce !== idAnnonce);
                setValidation(updatedValidations);
            } else {
                console.error('Erreur lors de la validation de l\'annonce: ', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la validation de l\'annonce: ', error);
        }
    };

    /*useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://voiture-backend-production.up.railway.app/validation/0", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setValidation(response.data);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, []);*/
    
    /*const handleValidation = async (idAnnonce) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.patch(`https://voiture-backend-production.up.railway.app/${idAnnonce}/valider?newvalidation=1`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    const updatedValidations = validations.filter(validation => validation.idannonce !== idAnnonce);
                    setValidation(updatedValidations);
                } else {
                    console.error('Erreur lors de la validation de l\'annonce: ', response.statusText);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la validation de l\'annonce: ', error);
        }
    };*/


    return (

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">idutilisateur</th>
                        <th scope="col">detail</th>
                        <th scope="col">prix</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {validations.map(valid => (
                        <tr key={valid.idannonce}>
                            <th scope="row">{valid.idannonce}</th>
                            <td>{valid.idutilisateur}</td>
                            <td>{valid.detail}</td>
                            <td>{valid.prix}</td>
                            <td><button type="button" className="btn-primary" onClick={() => handleValidation(valid.idannonce)}>Validez</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

    );
}
