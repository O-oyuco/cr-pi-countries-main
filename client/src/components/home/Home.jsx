import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import "./Home.css"; // Importar el archivo CSS

function Home() {
  const URL_COUNTRIES = "http://localhost:3001/countries";
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_COUNTRIES);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate index of the first and last card of the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = countries.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <Cards countries={currentCards}> </Cards>
      {/* Pagination */}
      <div className="pagination-container">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(countries.length / cardsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
