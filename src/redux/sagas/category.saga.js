import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getListCategorySuccess} from '../actions';
import {GET_CATEGORY_FAIL, GET_CATEGORY} from '../constants';
import {getCategories} from '../../apis/categoryApi';

function* getCategorySaga(action) {
  try {
    const response = yield call(getCategories)
    yield put(getListCategorySuccess(response.data));
  } catch (error) {
    yield put({type: GET_CATEGORY_FAIL, payload: error});
  }
}

function* categoriesSaga() {
  yield takeEvery(GET_CATEGORY, getCategorySaga)
}

export default categoriesSaga;
