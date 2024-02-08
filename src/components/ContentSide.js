import React, { useState, useEffect } from 'react';
import { request } from "../helper/axios_helper";
import { Link, useParams } from "react-router-dom";

function ContentSide() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id_selection } = useParams();
    const [utilisateurs, setUtilisateur] = useState([]);
    const [message1, setData1] = useState([]);
    const [message2, setData2] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        request("get", `/api/demo/users/${user.id}`)
            .then(response => {
                setUtilisateur(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [user.id]);

    useEffect(() => {
        request("get", `/GetOwnMessage/${id_selection}/${user.id}`)
            .then(response => {
                setData1(response.data);
            })
            .catch(error => {
                console.error('Error fetching annonces:', error);
            });
        request("get", `/GetOwnMessage/${user.id}/${id_selection}`)
            .then(response => {
                setData2(response.data);
            })
            .catch(error => {
                console.error('Error fetching annonces:', error);
            });
    }, [id_selection, user.id]);

    const ReloadPage = (url) => {
        window.location.href = url;
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await request("post", "/addMessage", {
                idEnvoyeur: user.id,
                text: message,
                idDestinataire: id_selection,
            });
            if (response.status === 200) {
                console.log(response.data);
                window.location.reload();
            } else {
                console.error('Erreur lors de l\'envoi du message', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message', error);
        }
    };

    return (
        <div class="chat-content">
            <div class="content-sidebar">
                <div class="content-sidebar-title">Chats</div>
                <form action="" class="content-sidebar-form">
                    <input type="search" class="content-sidebar-input" placeholder="Search..." />
                    <button type="submit" class="content-sidebar-submit"><i class="ri-search-line"></i></button>
                </form>

                <div class="content-messages">
                    <ul class="content-messages-list">
                        {utilisateurs.map((item) => (
                            <li key={item.id}>
                                <Link to={`/message/${item.id}`} data-conversation="#conversation-1" onClick={() => ReloadPage(`/message/${item.id}`)}>
                                    <img class="content-message-image" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                                    <span class="content-message-info" >
                                        <span class="content-message-name">{item.email}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div class="conversation active" id="conversation-1">
                <div class="conversation-top">
                    <button type="button" class="conversation-back"><i class="ri-arrow-left-line"></i></button>
                    <div class="conversation-user">
                        <img class="conversation-user-image" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                        <div>
                            <div class="conversation-user-name">Someone</div>
                        </div>
                    </div>
                    <div class="conversation-buttons">
                        <Link to="/" type="button"><i class="ri-information-line"></i></Link>
                    </div>
                </div>

                <>
                    <div class="conversation-main">
                        <ul class="conversation-wrapper">
                            {message1.map(message1 => (
                                <li key={message1.id} class="conversation-item me">
                                    <div class="conversation-item-side">
                                        <img class="conversation-item-image" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                                    </div>
                                    <div class="conversation-item-content">
                                        <div class="conversation-item-wrapper">
                                            <div class="conversation-item-box">
                                                <div class="conversation-item-text">
                                                    <p>{message1.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}

                            {message2.map(message2 => (
                                <li key={message2.id} class="conversation-item">
                                    <div class="conversation-item-side">
                                        <img class="conversation-item-image" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                                    </div>
                                    <div class="conversation-item-content">
                                        <div class="conversation-item-wrapper">
                                            <div class="conversation-item-box">
                                                <div class="conversation-item-text">
                                                    <p>{message2.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div class="conversation-form">
                        <button type="button" class="conversation-form-button"><i class="ri-emotion-line"></i></button>
                        <div class="conversation-form-group">
                            <textarea class="conversation-form-input" rows="1" placeholder="Type here..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <button type="button" class="conversation-form-record"><i class="ri-mic-line"></i></button>
                        </div>
                        <button type="button" class="conversation-form-button conversation-form-submit" onClick={sendMessage}><i class="ri-send-plane-2-line"></i></button>

                    </div>
                </>
            </div>
        </div>
    );
}
export default ContentSide;
