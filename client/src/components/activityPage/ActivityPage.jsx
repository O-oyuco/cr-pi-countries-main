import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { countriesSuccess } from '../../ridux/actions';
import axios from 'axios';
import {URL_ACTIVITIES} from '../../URL';

function Landing({ countriesSuccess }) {
  const handleIngresarClick = async () => {
    try {
      const response = await axios.get(URL_ACTIVITIES);
      countriesSuccess(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  return (
    <div>
      <div className="app-background1"></div>
       <div>
       <Link to="/home" className="titulo-landing" onClick={handleIngresarClick} >
        Bienvenidos a la aplicación de paises <i class="fa fa-heart" ></i>
      </Link >
    </div>
   </div>
  );
}

export default connect(null, { countriesSuccess })(Landing);
