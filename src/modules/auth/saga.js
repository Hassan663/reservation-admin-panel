import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { push } from 'connected-react-router';
import authActions, { SIGNUP, SIGNIN, SIGNOUT, FORGOT_PASSWORD, CHANGE_PASSWORD } from './actions';
import { REQUEST } from '../common/actions';
import { signup, signin, signout, forgotPassword, changePassword } from '../../services/auth';
import React from 'react';
import { Alert, Button, Space } from 'antd';

const forcedLogin = action => {
  action.payload.forced = 'true';
  //console.log(action);
  handleSigninSubmit(action);
};

export function* handleSignupSubmit() {
  while (true) {
    try {
      const { payload } = yield take(SIGNUP[REQUEST]);
      const data = yield call(signup, payload);
      yield put(authActions.signup.success(data));
    } catch (error) {}
  }
}

export function* handleSigninRequest(action) {
  try {
    const { data } = yield call(signin, action.payload);
    yield put(authActions.signin.success(data));
    setSessionCookies({ user: data.user, token: data.token });
  } catch (error) {
    console.log(error);
    if (error.message === 'Request failed with status code 400') {
      //yield put(authActions.signin.failure(error));
      //antMessage.error('User Already Logged In');
    } else if (error.message === 'Request failed with status code 401') {
      antMessage.error('Wrong Email Or Password');
    } else if (error.message === 'Request failed with status code 503') {
      antMessage.error('Maximum Active Sessions');
    } else {
      antMessage.error('Interval Server Error');
    }
    yield put(authActions.signin.failure(error));
  }
}

export function* handleSigninSubmit() {
  yield takeLatest(SIGNIN.REQUEST, handleSigninRequest);
}

export function* handleSignout() {
  while (true) {
    try {
      const { payload } = yield take(SIGNOUT[REQUEST]);
      yield call(signout, 'true');

      unSetSessionCookies();
      yield put(authActions.signout.success());
      // window.location.href = '/';
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.signout.success({ code, message }));
    }
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
