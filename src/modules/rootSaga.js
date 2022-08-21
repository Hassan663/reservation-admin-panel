import { fork, all } from 'redux-saga/effects';
import signWatcher, {
  // handleSignupSubmit,
  // handleSigninSubmit,
  handleSignout,
  handleForgotPassword,
  handleChangePassword,
} from './auth/saga';
import categoryWatcher from './category/saga';
import eventWatcher from './event/saga';
import adminChatWatcher from './adminChat/saga';
import meunWatcher from './menu/saga';

export default function* rootSaga() {
  yield all([
    // fork(handleSignupSubmit),
    // fork(handleSigninSubmit),
    fork(signWatcher),
    fork(handleSignout),
    fork(categoryWatcher),
    fork(handleForgotPassword),
    fork(handleChangePassword),
    fork(handleSignout),
    fork(adminChatWatcher),
    fork(eventWatcher),
    // fork(menuWatcher),
  ]);
}
