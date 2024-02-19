import { COUNTRIES_SUCCESS, COUNTRIES_FILTER, COUNTRIES_ORDER } from "./actions";

const initialState = {
  countries: [],
  allCountries: [],
  filter: 'All',
  order: 'N'
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_SUCCESS:
      console.log("Received countries:", action.payload); // Verificar que se reciban los países correctamente
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
      case COUNTRIES_FILTER:
      return {
        ...state,
        filter: action.payload,
        countries: filtroCountries(state.allCountries, action.payload, state.order),
      };
    case COUNTRIES_ORDER:
      return {
        ...state,
        order: action.payload,
        countries: filtroCountries(state.allCountries, state.filter, action.payload),
      };
    default:
      return state;
  }
}

  function filtroCountries(countries, filter, order) {
    let filteredCountries = [...countries]; 

    if (filter !== 'All') {
      filteredCountries = filteredCountries.filter(country => country.continent === filter);
    }

    if (order === 'S') {
      filteredCountries.sort((a, b) => a.poblacion - b.poblacion);
    } else if (order === 'D') {
      filteredCountries.sort((a, b) => b.poblacion - a.poblacion);
    } else if (order === 'N') {
      return filteredCountries;
    } else if (order === 'A') {
      filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'Z') {
      filteredCountries.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredCountries;
  };

export default countriesReducer;
