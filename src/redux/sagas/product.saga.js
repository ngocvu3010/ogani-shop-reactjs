import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getHomeProductsSuccess} from '../actions';
import {GET_HOME_PRODUCT_FAIL, GET_HOME_PRODUCT} from '../constants';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function* getProductHomeSaga(action) {
  try {
    const response = yield axios.get(`${API_URL}/products?${action.payload}`);
    yield put(getHomeProductsSuccess(response.data));
  } catch (error) {
    console.log("error saga" + error);
    yield put({type: GET_HOME_PRODUCT_FAIL, payload: error});
  }
}

function* productsSaga() {
  yield takeEvery(GET_HOME_PRODUCT, getProductHomeSaga);
}

export default productsSaga;
