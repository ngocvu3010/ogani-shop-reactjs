import {GET_CATEGORY, GET_CATEGORY_SUCCESS} from '../constants';

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
