import Card from "../components/Card";
import 'bootstrap/dist/css/bootstrap.css';

export default function Product(){
    return(
        <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
            <Card/>
        </div>
    );
}