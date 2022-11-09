import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getListCategorySuccess} from '../actions';
import {GET_CATEGORY_FAIL, GET_CATEGORY} from '../constants';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function* getCategorySaga(action) {
  try {
    const response = yield axios.get(`${API_URL}/categories`);
    yield put(getListCategorySuccess(response.data));
  } catch (error) {
    console.log("error saga" + error);
    yield put({type: GET_CATEGORY_FAIL, payload: error});
  }
}

function* productsSaga() {
  yield takeEvery(GET_CATEGORY, getCategorySaga);
}

export default productsSaga;
