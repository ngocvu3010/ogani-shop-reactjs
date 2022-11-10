import {GET_HOME_PRODUCT, GET_HOME_PRODUCT_SUCCESS, GET_TOP_PRODUCT, GET_TOP_PRODUCT_SUCCESS} from '../constants';

export function getHomeProducts(payload){
  return {
    type: GET_HOME_PRODUCT,
    payload
  };
};

export function getTopProducts(payload){
  return {
    type: GET_TOP_PRODUCT,
    payload
  };
};

export function getHomeProductsSuccess(payload){
  return {
    type: GET_HOME_PRODUCT_SUCCESS,
    payload
  }
}

export function getTopProductsSuccess(payload){
  return {
    type: GET_TOP_PRODUCT_SUCCESS,
    payload
  }
}
