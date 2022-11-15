import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL} from '../constants';

const initialState = {
  user: {},
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

    default:
      return state;
  }
}
