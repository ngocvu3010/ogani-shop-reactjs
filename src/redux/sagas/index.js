import { fork } from "redux-saga/effects";
import categorySaga from "./category.saga";
import productSaga from "./product.saga";
import userSaga from "./user.saga";
import cartSaga from "./cart.saga";

export default function* mySaga() {
  yield fork(categorySaga);
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(cartSaga);
}
