import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./Card.css";

function CardCountries({ id, name, image }) {

const location = useLocation();


  return (
    <Link to={`/detail/${id}`} className="card-link">
    <div className="card-container">
      <div className="image-container">
        <img className="card-image" src={image} alt={name} />
      </div>
      <div className="card-overlay">
        <h3 className="card-name">{name}</h3>
      </div>
      
    </div>
  </Link>
);
}

function mapDispatchToProps(dispatch) {
  return {
    addFav: function (character) {
      dispatch(addFav(character));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCountries);
