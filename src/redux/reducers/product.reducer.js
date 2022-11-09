import {GET_HOME_PRODUCT, GET_HOME_PRODUCT_SUCCESS, GET_HOME_PRODUCT_FAIL} from "../constants"

const initialState = {
  productsHome: [],
  isLoading: false,
  isError: false,
  error: []
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOME_PRODUCT:
      return {
        ...state,
        isLoading: true
      }
    case GET_HOME_PRODUCT_SUCCESS:
      return {
        ...state,
        productsHome: [...action.payload],
        isLoading: false
      };

    case GET_HOME_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: [...action.payload]
      }
    }
    default:
      return state;
  }
}
