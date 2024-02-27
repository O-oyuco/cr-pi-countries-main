import { COUNTRIES_SUCCESS, ACTIVITIES_SUCCESS, COUNTRIES_FILTER, ACTIVITIES_FILTER, COUNTRIES_ORDER } from "./actions";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  allActivities: [],
  filter: 'All',
  activityFilter: 'All', // Nuevo estado para el filtro de actividades
  order: 'N'
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_SUCCESS:
      console.log("Received countries:", action.payload);
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case ACTIVITIES_SUCCESS:
      console.log("Received activities:", action.payload);
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };
    case COUNTRIES_FILTER:
      return {
        ...state,
        filter: action.payload,
        countries: filtroCountries(state.allCountries, action.payload, state.activityFilter, state.order), // Ahora incluye también el filtro de actividad
      };
    case ACTIVITIES_FILTER:
      return {
        ...state,
        activityFilter: action.payload,
        countries: filtroCountries(state.allCountries, state.filter, action.payload, state.order), // Ahora incluye también el filtro de actividad
      };
    case COUNTRIES_ORDER:
      return {
        ...state,
        order: action.payload,
        countries: filtroCountries(state.allCountries, state.filter, state.activityFilter, action.payload),
      };
    default:
      return state;
  }
}

function filtroCountries(countries, filter, activityFilter, order) {
  let filteredCountries = [...countries]; 

  if (filter !== 'All') {
    filteredCountries = filteredCountries.filter(country => country.continent === filter);
  }

  if (activityFilter !== 'All') {
    filteredCountries = filteredCountries.filter(country =>
      country.Activities.some(activity => activity.activityType === activityFilter)
    );
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
}

export default countriesReducer;
