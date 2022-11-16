import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER} from '../constants';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  errors: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        isLoading: true
      }
    }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      };

    case LOGIN_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload
      }
    }

    case LOGOUT_USER: {
      return {
       ...state,
        user: null,
        isLoading: false
      }
    }

    default:
      return state;
  }
}
