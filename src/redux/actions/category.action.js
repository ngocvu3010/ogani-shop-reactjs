import {
  GET_CATEGORY, GET_CATEGORY_SUCCESS,
  GET_DETAIL_CATEGORY, GET_DETAIL_CATEGORY_SUCCESS, GET_DETAIL_CATEGORY_FAIL
} from '../constants';

export function getCategory(payload){
  return {
    type: GET_CATEGORY,
    payload
  };
};

export function getListCategorySuccess(payload){
  return {
    type: GET_CATEGORY_SUCCESS,
    payload
  }
}

export function getDetailCategory(payload){
  return {
    type: GET_DETAIL_CATEGORY,
    payload
  };
}

export function getDetailCategorySuccess(payload){
  return {
    type: GET_DETAIL_CATEGORY_SUCCESS,
    payload
  };
}

export function getDetailCategoryFail(payload){
  return {
    type: GET_DETAIL_CATEGORY_FAIL,
    payload
  };
}
