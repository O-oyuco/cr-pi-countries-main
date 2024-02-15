import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const [countries, setCountries] = useState({});

  const URL = 'http://localhost:3001/countries/';

  useEffect(() => {
    axios(`${URL}${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCountries(data);
        } else {
          window.alert('No se ha encontrado país con ese ID');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del país:', error);
      });
  }, [id]);


  return (
    <div>
      <div className='detail-container-card'>
        <div className='detail-card-card'>
          <h1>{countries.name}</h1>
          <img src={countries.image} alt={countries.name} />
          {countries.id && <p>CCA3: {countries.id}</p>}
          {countries.continent && <p>Continente: {countries.continent}</p>}
          {countries.capital && <p>Capital: {countries.capital}</p>}
          {countries.subregion && <p>Subcontinente: {countries.subregion}</p>}
          {countries.poblacion && <p>Población: {countries.poblacion}</p>}
          {countries.area && <p>Area: {countries.area} km^2</p>}
        </div>
      </div>

      <div
        className='detail-card-background'
        style={{ backgroundImage: `url(${countries.image})` }}
      />
    </div>
  );
}