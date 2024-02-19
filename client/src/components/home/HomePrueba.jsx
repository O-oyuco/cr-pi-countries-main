import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import "./Home.css";
import SearchBar from "../searchBar/SearchBar";
import { connect } from "react-redux";
import { countriesSuccess, filterCountries, sortCountries } from "../../ridux/actions";
import CreateActivityForm from "../activityForm/ActivityForm";

function Home(props) {
  const URL_COUNTRIES = "http://localhost:3001/countries";
  const URL_COUNTRIES_NAME = "http://localhost:3001/countries/name/?name=";
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_COUNTRIES);
        props.countriesSuccess(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  
  const onSearch = async (name) => {
    try {
      const { data } = await axios.get(`${URL_COUNTRIES_NAME}${name}`);
      if (data.length > 0) {
        setFilteredCountries(data);
        setCurrentPage(1); // Establecer el índice de la página en 1 al realizar la búsqueda
      } else {
        alert("No hay países con ese nombre.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentPage(1); // Establecer el índice de la página en 1 al realizar la búsqueda
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (sortBy) => {
    props.sortCountries(sortBy);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = props.filteredCountries.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <SearchBar onSearch={onSearch} onChange={handleSearch} value={searchQuery} />
      <Cards countries={currentCards} />
      <button onClick={openModal}>Agregar Actividad</button>
      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Agregar Actividad</h2>
            <CreateActivityForm onCloseModal={handleCloseModal} />
          </div>
        </div>
      )}
      <div className="pagination-container">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(props.filteredCountries.length / cardsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => handleSort('name_asc')}>Sort by Name A-Z</button>
        <button onClick={() => handleSort('name_desc')}>Sort by Name Z-A</button>
        <button onClick={() => handleSort('population_asc')}>Sort by Population Asc</button>
        <button onClick={() => handleSort('population_desc')}>Sort by Population Desc</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  countries: state.countries,
  filteredCountries: state.filteredCountries,
});

export default connect(mapStateToProps, { countriesSuccess, filterCountries, sortCountries })(Home);
