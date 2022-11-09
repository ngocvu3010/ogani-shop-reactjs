import {GET_HOME_PRODUCT, GET_HOME_PRODUCT_SUCCESS} from '../constants';

export function getHomeProducts(payload){
  return {
    type: GET_HOME_PRODUCT,
    payload
  };
};

export function getHomeProductsSuccess(payload){
  return {
    type: GET_HOME_PRODUCT_SUCCESS,
    payload
  }
}
