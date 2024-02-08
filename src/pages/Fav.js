import Header from "../components/Header";
import Favori from "../components/Favori";
import 'bootstrap/dist/css/bootstrap.css';

export default function Fav(){
    return(
        <>
            <>
                <Header/>
                <br/>
                <br/>
            </>
            <>
                <center><h2>Mes favoris</h2></center>
                <br/>
                <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                <Favori/>
                </div>
            </>
        </>
    );
}