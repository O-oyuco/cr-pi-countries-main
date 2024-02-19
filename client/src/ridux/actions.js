export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';
export const COUNTRIES_FILTER = 'COUNTRIES_FILTER';
export const COUNTRIES_ORDER = 'COUNTRIES_ORDER';

export const countriesSuccess = (countries) => ({
  type: COUNTRIES_SUCCESS,
  payload: countries,
});

export const filterCountries = (filter) => ({
  type: COUNTRIES_FILTER,
  payload: filter,
});

export const orderCountries= (order) => ({
  type: COUNTRIES_ORDER,
  payload: order,
});
