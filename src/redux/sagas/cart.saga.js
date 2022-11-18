import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {UPDATE_CART, GET_CART, CREATE_BILL} from '../constants';
import {updateCartSuccess, updateCartFail, createBillSuccess, createBillFail} from "../actions";
import bcrypt from "bcryptjs";
import {flashSuccess, flashError} from "../../untils/flash";
import {addCart, updateCart, getCarts, addBilling, deleteCart} from '../../apis/cartApi';

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
    flashSuccess("🦄 Cập nhập giỏ hàng thành công");
  } catch(error){
    flashError("🦄 Cập nhập giỏ hàng thất bại !")
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

function* createPayment(action) {
  try {
    yield call(addBilling, action.payload);
    const response = yield call(getCarts, `userId=${action.payload.userId}`);
    const cart = response.data[0];
    yield call(deleteCart, cart.id);
    yield put(updateCartSuccess([]));
    flashSuccess("🦄 Đặt hàng thành công");
  } catch(error) {
    flashError("🦄 Đặt hàng thất bại");
    yield put(updateCartFail(error));
  }
}

export default function* cartSaga() {
  yield takeLatest(UPDATE_CART, updateCartSaga);
  yield takeEvery(GET_CART, getCartSaga);
  yield takeLatest(CREATE_BILL, createPayment)
}
