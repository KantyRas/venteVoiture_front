import "../assets/css/details.css";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { request } from "../helper/axios_helper";

function Detailproduit() {
    const { idannonce } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        request("get", `/detail_annonce/${idannonce}`)
            .then(response => {
                setDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching annonces:', error);
            });
    }, [idannonce]); // Ajoutez idannonce comme dépendance

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
                            <Link type="button" className="btn">
                                Acheter
                            </Link>
                            <Link type="button" className="btn">Envoyez message</Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
export default Detailproduit;
