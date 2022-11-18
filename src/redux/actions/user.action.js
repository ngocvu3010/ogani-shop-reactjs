import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER} from '../constants';

export function loginUser(payload){
  return {
    type: LOGIN_USER,
    payload
  };
};

export function loginUserSuccess(payload){
  return {
    type: LOGIN_USER_SUCCESS,
    payload
  };
};

export function loginUserFail(payload){
  return {
    type: LOGIN_USER_FAIL,
    payload
  }
}

export function logoutUser(payload){
  return {
    type: LOGOUT_USER,
    payload
  }
}
