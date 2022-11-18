import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {UPDATE_CART, GET_CART} from '../constants';
import {updateCartSuccess, updateCartFail} from "../actions";
import bcrypt from "bcryptjs";
import {flashSuccess, flashError} from "../../untils/flash";
import {addCart, updateCart, getCarts} from '../../apis/cartApi';

function* updateCartSaga(action) {
  try {
    const {cartData, userId} = action.payload;
    const response = yield call(getCarts, `userId=${userId}`);
    let responseResult;
    if (response?.data && response.data.length > 0) {
      const cart = response.data[0];
      responseResult = yield call(updateCart, cart.id, {...cart, cartData: cartData})
    } else {
      responseResult = yield call(addCart, action.payload);
    }

    yield put(updateCartSuccess(responseResult.data.cartData));
    flashSuccess("🦄 Thêm sản phẩm thành công");
  } catch(error){
    flashError("🦄 Thêm vào giỏ hàng thất bại !")
    yield put(updateCartFail(error))
  }
}

function* getCartSaga(action) {
  try {
    const response = yield call(getCarts, `userId=${action.payload.userId}`);
    yield put(updateCartSuccess(response.data[0].cartData));
  } catch(error) {
    yield put(updateCartFail(error));
  }
}

export default function* cartSaga() {
  yield takeLatest(UPDATE_CART, updateCartSaga);
  yield takeEvery(GET_CART, getCartSaga);
}
