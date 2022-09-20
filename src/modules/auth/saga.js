import { call, take, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import authActions, { SIGNUP, SIGNIN, SIGNOUT, FORGOT_PASSWORD, CHANGE_PASSWORD } from './actions';
import { setSessionCookies, unSetSessionCookies } from 'modules/common/utils';
import { REQUEST } from '../common/actions';
import {
  signup,
  signin,
  signout,
  forgotPassword,
  changePassword,
  getAllUsers,
  latestTime,
} from '../../services/auth';
import { GET_ALL_CLIENTS, LATEST_TIME } from './types';

const forcedLogin = action => {
  action.payload.forced = 'true';
  handleSigninSubmit(action);
};

export function* handleSignupSubmit(action) {
  try {
    const data = yield call(signup, action.payload);
    console.log('data: ' + data);
    yield put(authActions.signup.success(data.data));
    antMessage.success('User Registered Successfully!', 2);
  } catch (error) {
    yield put(authActions.signup.failure(error.response.data.message));
    antMessage.error(error.response.data.message);
  }
}

export function* handleSigninRequest(action) {
  try {
    const { data } = yield call(signin, action.payload);
    yield put(authActions.signin.success(data.data));
    setSessionCookies({ user: data.user, token: data.token });
  } catch (error) {
    antMessage.error(error.response.data.message);
    yield put(authActions.signin.failure(error));
  }
}

export function* handleGetAllClients(action) {
  try {
    console.log('I am calling');
    const { data } = yield call(getAllUsers, action.payload);
    console.log('Response of getting all Users', data);
    yield put(authActions.getAllClients.success(data));
  } catch (error) {
    yield put(authActions.getAllClients.failure(error.message));
  }
}

export function* handleSignout() {
  try {
    yield take(SIGNOUT[REQUEST]);
    unSetSessionCookies();
    yield put(authActions.signout.success());
    window.location.href = '/';
  } catch (error) {
    yield put(authActions.signout.failure());
  }
}

export function* handleForgotPassword() {
  while (true) {
    try {
      const { payload } = yield take(FORGOT_PASSWORD[REQUEST]);
      const data = yield call(forgotPassword, payload);
      yield put(authActions.forgotPassword.success(data));
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.forgotPassword.failure({ code, message }));
      antMessage.error(message, 5);
    }
  }
}

export function* handleChangePassword() {
  while (true) {
    try {
      const { payload } = yield take(CHANGE_PASSWORD[REQUEST]);
      const data = yield call(changePassword, payload);
      yield put(authActions.changePassword.success(data));
      antMessage.success('Your password is changed!', 1);
      setTimeout(() => (window.location.href = '/dashboard'), 1000);
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.changePassword.failure({ code, message }));
      antMessage.error(message, 5);
    }
  }
}
export function* handleLatestTime(action) {
  try {
    console.log('Calling handleLatestTime');
    const { data } = yield call(latestTime, action.payload);
  } catch (error) {
    console.log('Error in Setting Latest time');
  }
}

export default function* signWatcher() {
  yield takeLatest(SIGNIN.REQUEST, handleSigninRequest);
  yield takeLatest(SIGNUP.REQUEST, handleSignupSubmit);
  yield takeLatest(SIGNOUT.REQUEST, handleSignout);
  yield takeLatest(GET_ALL_CLIENTS.REQUEST, handleGetAllClients);
  yield takeLatest(LATEST_TIME.request, handleLatestTime);
}
