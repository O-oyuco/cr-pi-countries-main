// Landing.jsx

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { countriesSuccess } from '../../ridux/actions';
import axios from 'axios';

function Landing({ countriesSuccess }) {
  const handleIngresarClick = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      countriesSuccess(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenido a nuestra aplicación</h1>
      <Link to="/home">
        <button onClick={handleIngresarClick}>Ingresar</button>
      </Link>
    </div>
  );
}

export default connect(null, { countriesSuccess })(Landing);
