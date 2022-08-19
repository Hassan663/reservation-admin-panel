import { fork, all } from 'redux-saga/effects';
import signWatcher, {
  // handleSignupSubmit,
  // handleSigninSubmit,
  handleSignout,
  handleForgotPassword,
  handleChangePassword,
} from './auth/saga';
import eventWatcher from './event/saga';
import adminChatWatcher from './adminChat/saga';
export default function* rootSaga() {
  yield all([
    // fork(handleSignupSubmit),
    // fork(handleSigninSubmit),
    // fork(signWatcher),
    fork(handleSignout),
    fork(handleForgotPassword),
    fork(handleChangePassword),
    fork(handleSignout),
    // fork(adminChatWatcher),
    fork(eventWatcher),
  ]);
}
