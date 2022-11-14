import {
  GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAIL,
  GET_DETAIL_CATEGORY,GET_DETAIL_CATEGORY_SUCCESS,
  GET_DETAIL_CATEGORY_FAIL
} from "../constants"

const initialState = {
  categoryData: [],
  category: {},
  isLoading: false,
  isError: false,
  errors: []
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY: {
      return {
        ...state,
        isLoading: true
      }
    }

    case GET_DETAIL_CATEGORY: {
      return {
        ...state,
        isLoading: true
      }
    }

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryData: [...action.payload],
        isLoading: false
      };

    case GET_DETAIL_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        isLoading: false
      };

    case GET_CATEGORY_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload
      }
    }

    case GET_DETAIL_CATEGORY_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload
      }
    }
    default:
      return state;
  }
}
