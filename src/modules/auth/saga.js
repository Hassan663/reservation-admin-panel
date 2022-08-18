import { call, take, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import authActions, { SIGNUP, SIGNIN, SIGNOUT, FORGOT_PASSWORD, CHANGE_PASSWORD } from './actions';
import { REQUEST } from '../common/actions';
import { signup, signin, signout, forgotPassword, changePassword } from '../../services/auth';

const forcedLogin = action => {
  action.payload.forced = 'true';
  handleSigninSubmit(action);
};

export function* handleSignupSubmit(action) {
  try {
    const data = yield call(signup, action.payload);
    yield put(authActions.signup.success(data.data));
    antMessage.success('User Registered Successfully!', 2);
    // yield put(authActions.signup.success(data.data));
    // setSessionCookies({user: data.data.firstName, id: data.data.id });
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

export default function* signWatcher() {
  yield takeLatest(SIGNIN.REQUEST, handleSigninRequest);
  yield takeLatest(SIGNUP.REQUEST, handleSignupSubmit);
}
// export function* handleSignup() {
//   yield takeEvery(SIGNUP.REQUEST, handleSignupSubmit);
// }
