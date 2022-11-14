import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getListCategorySuccess, getDetailCategorySuccess, getDetailCategoryFail} from '../actions';
import {GET_CATEGORY_FAIL, GET_CATEGORY, GET_DETAIL_CATEGORY} from '../constants';
import {getCategories, getDetailCategory} from '../../apis/categoryApi';

function* getCategorySaga(action){
  try {
    const response = yield call(getCategories)
    yield put(getListCategorySuccess(response.data));
  } catch (error) {
    yield put({type: GET_CATEGORY_FAIL, payload: error});
  }
}

function* getDetailCategorySaga(action){
  try {
    const response = yield call(getDetailCategory, action.payload);
    yield put(getDetailCategorySuccess(response.data));
  } catch (error) {
    yield put(getDetailCategoryFail(error));
  }
}

function* categoriesSaga() {
  yield takeEvery(GET_CATEGORY, getCategorySaga);
  yield takeEvery(GET_DETAIL_CATEGORY, getDetailCategorySaga);
}

export default categoriesSaga;
