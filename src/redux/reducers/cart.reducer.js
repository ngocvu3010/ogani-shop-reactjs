import {UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAILED, GET_CART} from '../constants';

const initialState = {
  cartData: [],
  isLoading: false,
  isError: false,
  errors: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART: {
      return {
        ...state,
        isLoading: true
      }
    }

    case GET_CART: {
      return {
        ...state,
        isLoading: true
      }
    }

    case UPDATE_CART_SUCCESS: {
      return {
        ...state,
        cartData: [...action.payload],
        isLoading: false
      }
    }

    case UPDATE_CART_FAILED: {
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
