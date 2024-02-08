import {Link} from "react-router-dom";
import darkLogo from "../../assets/images/logos/dark-logo.svg";

export default function Sidebar(){
    return(
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to="/" className="text-nowrap logo-img">
                        <img src={darkLogo} width="180" alt="sary" />
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">GESTION</span>
                        </li>

                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/categories" aria-expanded="false">
                <span>
                  <i className="ti ti-user-minus"></i>
                </span>
                                <span className="hide-menu">Catégorie</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/marques" aria-expanded="false">
                <span>
                  <i className="ti ti-brand-producthunt"></i>
                </span>
                                <span className="hide-menu">Marque</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/validation" aria-expanded="false">
                <span>
                  <i className="ti ti-brand-producthunt"></i>
                </span>
                                <span className="hide-menu">Validation annonce</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">PAGES</span>
                        </li>

                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/statistiques" aria-expanded="false">
                        <span>
                  <i className="ti ti-pig-money"></i>
                </span>
                                <span className="hide-menu">Statistiques</span>
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>
        </aside>
    );
}