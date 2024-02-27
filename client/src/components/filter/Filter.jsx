import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterCountries, orderCountries, filterActivities } from '../../ridux/actions'
import './Filter.css'

function Filters({ dispatch, filterValue, activityFilterValue, orderValue }) {
    const [continentSelector, setContinentSelector] = useState(filterValue);
    const [activitySelector, setActivitySelector] = useState(activityFilterValue);
    const [orderSelector, setOrderSelector] = useState(orderValue);
  
    useEffect(() => {
      setContinentSelector(filterValue);
      setActivitySelector(activityFilterValue);
      setOrderSelector(orderValue);
    }, [filterValue, activityFilterValue, orderValue]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'continentSelector') {
        setContinentSelector(value);
        dispatch(filterCountries(value));
      } 
      if (name === 'activitySelector') {
        setActivitySelector(value);
        dispatch(filterActivities(value));
      }
      if (name === 'orderSelector') {
        setOrderSelector(value);
        dispatch(orderCountries(value));
      }
    };
  
    const handleCleanse = () => {
      setContinentSelector('All');
      setActivitySelector('All');
      setOrderSelector('N');
  
      dispatch(filterCountries('All'));
      dispatch(filterActivities('All'));
      dispatch(orderCountries('N'));
    };
  
    return (
      <div className="select-container">
      <button onClick={handleCleanse}>Limpiar selecciones</button>
      <select name="orderSelector" onChange={handleChange} value={orderSelector}>
          <option value='N' hidden>Selecciona un orden en base a poblacion o alfabeticamente</option>
          <option value='N' >Ninguno</option>
          <option value='S'>Menor a mayor</option>
          <option value='D'>Mayor a menor</option>
          <option value='A'>A-Z</option>
          <option value='Z'>Z-A</option>
      </select>
      <select name="continentSelector" onChange={handleChange} value={continentSelector}>
          <option value="All" hidden>Selecciona un continente</option>
          <option value="All">Todos</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
          <option value="Antarctica">Antarctica</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
      </select>
      <select name="activitySelector" onChange={handleChange} value={activitySelector}>
          <option value="All" hidden>Selecciona una actividad</option>
          <option value="All">Todas</option>
          <option value="Aventura">Aventura</option>
          <option value="Medico">Medico</option>
          <option value="Artístico">Artístico</option>
          <option value="Gastronómico">Gastronómico</option>
          <option value="Religioso">Religioso</option>
          <option value="Negocio">Negocio</option>
          <option value="Rural">Rural</option>
          <option value="Lujo">Lujo</option>
      </select>
      </div>
    );
  }
  
  const mapStateToProps = (state) => ({
    filterValue: state.filter,
    activityFilterValue: state.activityFilter,
    orderValue: state.order,
  });
  
  export default connect(mapStateToProps)(Filters);
