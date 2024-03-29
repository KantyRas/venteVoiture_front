import "../assets/css/details.css";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { request } from "../helper/axios_helper";

function Detailproduit() {
    const { idannonce } = useParams();
    const [details, setDetails] = useState([]);
    const [validations, setValidation] = useState([]);
    const [achatEffectue, setAchatEffectue] = useState(false);
    const [messageAchat, setMessageAchat] = useState('');


    useEffect(() => {
        request("get", "/etat/0")
            .then(response => {
                setValidation(response.data);
            })
            .catch(error => {
                console.error('Error fetching validation:', error);
            });
    }, []);
    const handleValidation = async (idAnnonce) => {
        try {
            const response = await request("patch", `/${idAnnonce}/vendu?newEtat=1`, null);
            if (response.status === 200) {
                const updatedValidations = validations.filter(validation => validation.idannonce !== idAnnonce);
                setValidation(updatedValidations);
                setAchatEffectue(true);
                setMessageAchat('L\'achat a été effectué avec succès!');
            } else {
                console.error('Erreur lors de la validation de l\'annonce: ', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la validation de l\'annonce: ', error);
        }
    };


    useEffect(() => {
        request("get", `/detail_annonce/${idannonce}`)
            .then(response => {
                setDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching annonces:', error);
            });
    }, [idannonce]);

    useEffect(() => {
        const imgs = document.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        let imgId = 1;

        imgBtns.forEach((imgItem) => {
            imgItem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgItem.dataset.id;
                slideImage();
            });
        });

        function slideImage() {
            const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
            document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
        }

        window.addEventListener('resize', slideImage);

        return () => {
            imgBtns.forEach((imgItem) => {
                imgItem.removeEventListener('click', (event) => {
                    event.preventDefault();
                    imgId = imgItem.dataset.id;
                    slideImage();
                });
            });

            window.removeEventListener('resize', slideImage);
        };


    }, []);

    return (
        <>
        {achatEffectue && (
            <div className="achat-message">
                <p>{messageAchat}</p>
            </div>
        )}

    <div className="test-wrapper">
            <div className="test">
                <div className="product-imgs">
                    <div className="img-select">
                        {details.map((sary, index) => (
                            sary.imagelinks.map((link, idx) => (
                                <div className="img-item" key={idx}>
                                    <Link data-id={index + 1}>
                                        <img src={link} alt="sary" />
                                    </Link>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
                {details.map(detail => (
                    <div className="product-content" key={detail.idannonce}>
                        <h4 className="product-title">{detail.marque.marque} {detail.modele}</h4>

                        <div className="product-price">
                            <p className="new-price">Prix: <span>MGA {detail.prix}</span></p>
                        </div>

                        <div className="product-detail">
                            <h2>Informations générales: </h2>
                            <p>{detail.detail}</p>
                            <ul>
                            <li>
                                Catégorie : <span>{detail.categories.map(categorie => categorie.categorie).join(', ')}</span>
                            </li>
                                {detail.etat === 0 ? (
                                    <li>Disponibilité: <span>Mbola misy</span></li>
                                ) : (
                                    <li>Disponibilité: <span>Efa lafo</span></li>
                                )}
                                <li>Immatriculation: <span>{detail.matricule}</span></li>
                                <li>Année de fabrication : <span>{detail.annee_fabrication}</span></li>
                            </ul>
                        </div>

                        <div className="purchase-info">
                            <button type="button" className="btn" onClick={() => handleValidation(detail.idannonce)}>
                                Acheter
                            </button>
                            <Link type="button" className="btn">Envoyez message</Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
export default Detailproduit;
