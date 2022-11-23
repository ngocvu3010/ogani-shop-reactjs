import {GET_HOME_PRODUCT, GET_HOME_PRODUCT_SUCCESS,
  GET_TOP_PRODUCT, GET_TOP_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT, GET_DETAIL_PRODUCT_SUCCESS, GET_DETAIL_PRODUCT_FAIL, CREATE_PRODUCT} from '../constants';

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

export function getProductDetail(payload) {
  return {
    type: GET_DETAIL_PRODUCT,
    payload
  }
}

export function getProductDetailSuccess(payload) {
  return {
    type: GET_DETAIL_PRODUCT_SUCCESS,
    payload
  }
}

export function getProductDetailFail(payload) {
  return {
    type: GET_DETAIL_PRODUCT_FAIL,
    payload
  }
}


export function createProductAction(payload){
  return {
    type: CREATE_PRODUCT,
    payload
  };
};
