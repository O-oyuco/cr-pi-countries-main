import { Link, } from "react-router-dom";
import "./Card.css";

function CardCountries({ id, name, image, continent }) {
  return (
    <Link to={`/detail/${id}`} className="card-link-home">
    <div className="card-container-home">
      <div className="image-container-home">
        <img className="card-image-home" src={image} alt={name} />
      </div>
      <div className="card-overlay-home">
        <h3 className="card-name-home">{name}</h3>
        <h3 className="continente-name-home">{continent}</h3>

      </div>
      
    </div>
  </Link>
);
}
export default(CardCountries);
