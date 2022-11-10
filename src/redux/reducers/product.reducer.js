import {GET_HOME_PRODUCT, GET_HOME_PRODUCT_SUCCESS, GET_HOME_PRODUCT_FAIL, GET_TOP_PRODUCT_SUCCESS, GET_TOP_PRODUCT, GET_TOP_PRODUCT_FAIL} from "../constants"

const initialState = {
  featureProduct: [],
  lastestProduct: [],
  topRatedPRoduct: [],
  reviewProduct: [],
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
        featureProduct: action.payload.featured,
        isLoading: false
      };

    case GET_HOME_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: "error"
      }
    }

    case GET_TOP_PRODUCT:
      return {
        ...state,
        isLoading: true
      }

    case GET_TOP_PRODUCT_SUCCESS:
      return {
        ...state,
        lastestProduct: action.payload.new,
        topRatedPRoduct: action.payload.top_rated,
        reviewProduct: action.payload.review,
        isLoading: false
      };

    case GET_TOP_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: "error"
      }
    }

    default:
      return state;
  }
}
