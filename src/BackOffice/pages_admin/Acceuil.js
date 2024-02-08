import Sidebar from "../components_template/Sidebar";
import HeaderAdmin from "../components_template/HeaderAdmin";
import "../../assets/css/styles.min.css";

export default function Acceuil(props){
    const Contenu = props.contenu;
    return(
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                 data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar/>

            <div className="body-wrapper">
            <HeaderAdmin/>
                <div className="container-fluid">
                    <Contenu/>
                </div>
            </div>
        </div>
    );
}