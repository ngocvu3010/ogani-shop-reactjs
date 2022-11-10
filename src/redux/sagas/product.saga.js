import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getHomeProductsSuccess, getTopProductsSuccess} from '../actions';
import {GET_HOME_PRODUCT_FAIL, GET_HOME_PRODUCT, GET_TOP_PRODUCT, GET_TOP_PRODUCT_FAIL} from '../constants';
import {getProducts} from '../../apis/productsApi';

function* getProductHomeSaga(action) {
  try {
    const response = yield call(getProducts, action.payload);
    yield put(getHomeProductsSuccess({featured: response.data}));
  } catch (error) {
    yield put({type: GET_HOME_PRODUCT_FAIL, payload: error});
  }
}

function* getTopProductSaga(action) {
  try {
    const [resProductNew, resTopRate, resReviewProduct] = yield Promise.all([
      getProducts("news=true&_limit=6"),
      getProducts("rate_gte=4&_limit=6"),
      getProducts("hasReview=true&_limit=6")
    ]);

    yield put(getTopProductsSuccess({new: resProductNew.data, top_rated: resTopRate.data, review: resReviewProduct.data}));
  } catch (error) {
    yield put({type: GET_TOP_PRODUCT_FAIL, payload: error});
  }
}

function* productsSaga() {
  yield takeEvery(GET_HOME_PRODUCT, getProductHomeSaga);
  yield takeEvery(GET_TOP_PRODUCT, getTopProductSaga)
}

export default productsSaga;
