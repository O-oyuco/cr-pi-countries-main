import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { countriesSuccess, activitiesSuccess } from '../../ridux/actions';
import axios from 'axios';
import {URL_COUNTRIES, URL_ACTIVITIES } from '../../URL';


function Landing({ countriesSuccess, activitiesSuccess, handleAccess }) {
  const handleIngresarClick = async () => {
    try {
      handleAccess()
      const responseCountries = await axios.get(URL_COUNTRIES);
      const responseActivities = await axios.get(URL_ACTIVITIES);
      countriesSuccess(responseCountries.data);
      activitiesSuccess(responseActivities.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  return (
    <div>
      <div className="app-background1"></div>
       <div>
       <Link to="/home" className="titulo-landing" onClick={handleIngresarClick} >
        Bienvenidos a la aplicación de paises <i className="fa fa-heart" ></i>
      </Link >
    </div>
   </div>
  );
}

export default connect(null, { countriesSuccess, activitiesSuccess  })(Landing);
