export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const COUNTRIES_FILTER = 'COUNTRIES_FILTER';
export const ACTIVITIES_FILTER  = 'ACTIVITIES_FILTER ';
export const COUNTRIES_ORDER = 'COUNTRIES_ORDER';

export const countriesSuccess = (countries) => ({
  type: COUNTRIES_SUCCESS,
  payload: countries,
});
export const activitiesSuccess = (activities) => ({
  type: ACTIVITIES_SUCCESS,
  payload: activities,
});

export const filterCountries = (filter) => ({
  type: COUNTRIES_FILTER,
  payload: filter,
});
export const filterActivities = (filter) => ({
  type: ACTIVITIES_FILTER ,
  payload: filter,
});

export const orderCountries= (order) => ({
  type: COUNTRIES_ORDER,
  payload: order,
});
