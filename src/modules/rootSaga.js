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
import productWatcher from './product/saga';
import menuWatcher from './menu/saga';
import blogWatcher from './blog/saga';
import notificationWatcher from './notification/saga';
import bookingsWatcher from './bookings/saga';

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
    fork(menuWatcher),
    fork(productWatcher),
    fork(blogWatcher),
    fork(notificationWatcher),
    fork(bookingsWatcher),
  ]);
}
