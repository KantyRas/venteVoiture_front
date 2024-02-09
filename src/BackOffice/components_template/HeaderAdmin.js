import {Link} from "react-router-dom";
import user1 from "../../assets/images/profile/user-1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCube,faBell,faUser,faMailBulk,faListCheck} from "@fortawesome/free-solid-svg-icons";

export default function HeaderAdmin(){
    let logout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    };
    return(
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-block d-xl-none">
                        <Link className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse">
                            <FontAwesomeIcon icon={faCube}/>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link nav-icon-hover">
                            <FontAwesomeIcon icon={faBell}/>
                            <div className="notification bg-primary rounded-circle"></div>
                        </Link>
                    </li>
                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <li className="nav-item dropdown">
                            <Link className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <img src={user1} alt="sary ihany" width="35" height="35" className="rounded-circle"/>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body">
                                    <Link className="d-flex align-items-center gap-2 dropdown-item">
                                        <FontAwesomeIcon icon={faUser}/>
                                        <p className="mb-0 fs-3">My Profile</p>
                                    </Link>
                                    <Link class="d-flex align-items-center gap-2 dropdown-item">
                                        <FontAwesomeIcon icon={faMailBulk}/>
                                        <p className="mb-0 fs-3">My Account</p>
                                    </Link>
                                    <Link class="d-flex align-items-center gap-2 dropdown-item">
                                        <FontAwesomeIcon icon={faListCheck}/>
                                        <p className="mb-0 fs-3">My Task</p>
                                    </Link>
                                    <Link to="/" onClick={logout} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}