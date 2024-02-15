import { COUNTRIES_SUCCESS } from "./actions";

const initialState = {
  countries: [],
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};

export default countriesReducer;
