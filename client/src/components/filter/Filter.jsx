import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterCountries, orderCountries } from '../../ridux/actions'

function Filters({ dispatch, handleFilterChange, filterValue, orderValue }) {
    const [continentSelector, setContinentSelector] = useState(filterValue);
    const [orderSelector, setOrderSelector] = useState(orderValue);
  
    useEffect(() => {
      setContinentSelector(filterValue);
      setOrderSelector(orderValue);
    }, [filterValue, orderValue]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      handleFilterChange(e);
  
      if (name === 'continentSelector') {
        setContinentSelector(value);
        dispatch(filterCountries(value));
      } 
      if (name === 'orderSelector') {
        setOrderSelector(value);
        dispatch(orderCountries(value));
      }
    };
  
    const handleCleanse = () => {
      setContinentSelector('All');
      setOrderSelector('N');
  
      dispatch(filterCountries('All'));
      dispatch(orderCountries('N'));
    };
  
    return (
      <div>
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
      </div>
    );
  }
  
  const mapStateToProps = (state) => ({
    filterValue: state.filter,
    orderValue: state.order,
  });
  
  export default connect(mapStateToProps)(Filters);