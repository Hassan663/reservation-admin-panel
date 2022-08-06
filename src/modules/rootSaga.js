import { fork, all } from 'redux-saga/effects';
import {
  handleSignupSubmit,
  handleSigninSubmit,
  handleSignout,
  handleForgotPassword,
  handleChangePassword,
} from './auth/saga';
export default function* rootSaga() {
  yield all([
    fork(handleSignupSubmit),
    fork(handleSigninSubmit),
    fork(handleSignout),
    fork(handleForgotPassword),
    fork(handleChangePassword),
    fork(handleSignout),
  ]);
}
