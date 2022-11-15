import { call, put, takeLatest } from 'redux-saga/effects';
import {LOGIN_USER} from '../constants';
import {loginUserSuccess, loginUserFail} from "../actions";
import bcrypt from "bcryptjs";
import {toast} from "react-toastify";
import {getUser} from '../../apis/userApi';

function* loginSaga(action) {
  try {
    const params = action.payload;
    const history = action.payload.history;
    const response = yield call(getUser, `?email=${params.name}`);
    if (response.data.length > 0) {
      const user = response.data[0];
      const isPasswordCorrect = yield bcrypt.compare(params.password, response.data[0].password);
      if (isPasswordCorrect) {
        toast.success("🦄 Đăng nhập thành công !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.setItem("account", JSON.stringify({
          id: user.id,
          email: user.email,
          first: user.first,
          last: user.last
        }));
        if (user.role === "user") {
          history.push("/")
        } else {
           history.push("/admin")
        }

        yield put(loginUserSuccess(user))
      } else {
        toast.error("🦄 Đăng nhập thất bại !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        yield put(loginUserFail(user))
      }
    }

  } catch(error){
    toast.error("🦄 Đăng nhập thất bại !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    yield put(loginUserFail(error))
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN_USER, loginSaga);
}
