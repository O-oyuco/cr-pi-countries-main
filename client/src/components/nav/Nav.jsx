
import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import Filters from '../filter/Filter';
import './Nav.css';

export default function NavS(props){
  const openModal = () => {
    props.openModal();
  };
      return (
        <div className="nav-container">
          <div className="search-container">
            <button onClick={openModal}>Agregar Actividad</button>
            <Filters handleFilterChange={props.handleFilterChange} />
            <SearchBar
              onSearch={props.onSearch}
              onChange={props.handleSearch}
              value={props.searchQuery}
            />
          </div>

      </div>
    );
    }