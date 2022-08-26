import { DELETE_NOTIFICATION, FETCH_NOTIFICATION } from './types';
import notificationActions from './actions';
import notification from 'services/notification';
import { message as antMessage } from 'antd';
import { REQUEST } from 'modules/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* handleFetchNotification() {
  try {
    const data = yield call(notification.getNotification, payload);
    yield put(notificationActions.getNotification.success(data));
  } catch (error) {
    yield put(notificationActions.getNotification.failure(error));
  }
}
export function* handleDeleteNotificaton() {
  try {
    const data = yield call(notification.deleteNotification, payload);
    yield put(notificationActions.deleteNotification.success(data));
  } catch (error) {
    yield call(notificationActions.deleteNotification.failure(error));
  }
}

export default function* notificationWatcher() {
  yield takeLatest(FETCH_[REQUEST], handleFetchNotification);
  yield takeLatest(DELETE_[REQUEST], handleDeleteNotificaton);
}
