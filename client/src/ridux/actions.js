export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';

export const countriesSuccess = (countries) => ({
  type: COUNTRIES_SUCCESS,
  payload: countries,
});
