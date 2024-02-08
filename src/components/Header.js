import { Link } from "react-router-dom";

function Header() {


    let logout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    };
    

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Voiture</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Acceuil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/favoris">Mes favoris</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/historiques">Mon historique</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/message">Messages</Link>
                        </li>
                    </ul>
                   
                    <Link to="/" className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
