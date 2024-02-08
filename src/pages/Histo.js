import Header from "../components/Header";
import Historique from "../components/Historique";

export default function Histo(){
    return(
        <>
            <>
                <Header/>
                <br/>
                <br/>
            </>
            <>
                <center><h2>Historiques de mes annonces</h2></center>
                <br/>
                <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                    <Historique/>
                </div>
            </>
        </>
    );
}