import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import "./Home.css"; 
import { connect } from "react-redux";
import { countriesSuccess } from "../../ridux/actions";
import CreateActivityForm from "../activityForm/ActivityForm";
import { Paginate } from "../pagination/Pagination";
import {URL_COUNTRIES_NAME} from '../../URL'
import NavS from "../nav/Nav";


function Home(props) {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [filterValor, setFilterValor] = useState("All")
  const [isPaginationOpen, setIsPaginationOpen] = useState(false)
  const cardsPerPage = 10;
  const currentCards = Paginate(filteredCountries, currentPage, cardsPerPage);


  useEffect(() => {
    setFilteredCountries(props.filteredCountries);
    
  }, [props.filteredCountries]);
const onSearch = async (name) => {
  if (filterValor === "All"){ 
    try {
      const { data } = await axios.get(`${URL_COUNTRIES_NAME}${name}`);
      if (data.length > 0) {
        setFilteredCountries(data);
        setCurrentPage(1); 
      } else {
        alert("No hay países con ese nombre.");
        setSearchQuery(""); 
        setFilteredCountries(props.filteredCountries); 
      }
    } catch (err) {
      alert(err.message);
    }
  } else {
    const filterCountries = props.filteredCountries.filter(country =>
      country.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filterCountries.length > 0) {
      setFilteredCountries(filterCountries);
      setCurrentPage(1);
    } else {
      alert('No hay países con ese nombre');
      setSearchQuery(""); 
      setFilteredCountries(props.filteredCountries); 
    }
  }
};


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = props.filteredCountries.filter((country) =>
      country.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentPage(1); 
  };

  const handleFilterChange = (e) => {
    setFilterValor(e.target.value) 
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

  return (
    <div>
      <NavS
          handleFilterChange={handleFilterChange}
          onSearch={onSearch}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          openModal={openModal}/>
    <Cards countries={currentCards} />
    {/* Modal */}
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
      <div className="app-background2"></div>
    {/* Paginación */}
    <div className="pagination-container">
      <button className="pagination-button" onClick={() => setIsPaginationOpen(!isPaginationOpen)}>
        Página {currentPage} <span className={isPaginationOpen ? "arrow-up" : "arrow-down"}></span>
      </button>
      {isPaginationOpen && (
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredCountries.length / cardsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}

function mapStateToProps(state) {
  return {
    filteredCountries: state.countries 
  };
}

export default connect(mapStateToProps, { countriesSuccess })(Home);
