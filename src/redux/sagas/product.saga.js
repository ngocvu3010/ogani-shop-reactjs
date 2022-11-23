import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {getHomeProductsSuccess, getTopProductsSuccess, getProductDetailSuccess, getProductDetailFail} from '../actions';
import {GET_HOME_PRODUCT_FAIL, GET_HOME_PRODUCT, GET_TOP_PRODUCT,
  GET_TOP_PRODUCT_FAIL, GET_DETAIL_PRODUCT, GET_DETAIL_PRODUCT_FAIL, CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL} from '../constants';
import {getProducts, getDetailProduct, createProduct} from '../../apis/productsApi';
import {flashSuccess, flashError} from "../../untils/flash";

function* getProductHomeSaga(action) {
  try {
    const response = yield call(getProducts, action.payload);
    yield put(getHomeProductsSuccess({featured: response.data, totalProduct: response.headers["x-total-count"]}));
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

function* getDetailProductSaga(action) {
  try {
    const response = yield call(getDetailProduct, action.payload);

    yield put(getProductDetailSuccess(response.data));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}


function* createProductSaga(action) {
  try {
    const response = yield call(createProduct, action.payload);
    flashSuccess("🦄 Tạo thành công");
    put({type: CREATE_PRODUCT_SUCCESS, payload: []});
  } catch (error) {
    flashError("🦄 Tạo thất bại");
    put({type: CREATE_PRODUCT_FAIL, payload: error});
  }
}


function* productsSaga() {
  yield takeEvery(GET_HOME_PRODUCT, getProductHomeSaga);
  yield takeEvery(GET_TOP_PRODUCT, getTopProductSaga);
  yield takeEvery(GET_DETAIL_PRODUCT, getDetailProductSaga);
  yield takeLatest(CREATE_PRODUCT, createProductSaga);
}

export default productsSaga;
