import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logoo from "../assets/images/logos/dark-logo.svg";

function Register() {
    const initialFormData = {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://voiturebackendlocale-production.up.railway.app/api/auth/register", formData);
            setFormData(initialFormData);
            setError(null);
            setSuccessMessage("Enregistrement effectué, veuillez vous connecter!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
             data-sidebar-position="fixed" data-header-position="fixed">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                        <img src={logoo} width="180" alt="logo-sary"/>
                                    </Link>
                                    <p className="text-center">Your Social Campaigns</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="firstname" className="form-label">Firstname</label>
                                            <input type="text" className="form-control" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Lastname</label>
                                            <input type="text" className="form-control" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link className="text-primary fw-bold ms-2" to="/">Log in</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
