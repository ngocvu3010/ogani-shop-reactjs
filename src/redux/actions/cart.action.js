import {UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAILED, GET_CART,
  CREATE_BILL, CREATE_BILL_SUCCESS, CREATE_BILL_FAIL} from '../constants';

export function updateCart(payload){
  return {
    type: UPDATE_CART,
    payload
  };
};

export function getCart(payload){
  return {
    type: GET_CART,
    payload
  };
};

export function updateCartSuccess(payload){
  return {
    type: UPDATE_CART_SUCCESS,
    payload
  };
};

export function updateCartFail(payload){
  return {
    type: UPDATE_CART_FAILED,
    payload
  };
};

export function createBilling(payload){
  return {
    type: CREATE_BILL,
    payload
  }
}
