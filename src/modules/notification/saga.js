import { DELETE_NOTIFICATION, FETCH_NOTIFICATION } from './types';
import notificationActions from './actions';
import notification from 'services/notification';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* handleFetchNotification({ payload }) {
  try {
    console.log('Fetching  Notification');
    const data = yield call(notification.getNotification, payload);
    yield put(notificationActions.getNotification.success(data));
  } catch (error) {
    yield put(notificationActions.getNotification.failure(error));
  }
}
export function* handleDeleteNotificaton({ payload }) {
  try {
    const data = yield call(notification.deleteNotification, payload);
    yield put(notificationActions.deleteNotification.success(data));
  } catch (error) {
    yield call(notificationActions.deleteNotification.failure(error));
  }
}

export default function* notificationWatcher() {
  yield takeLatest(FETCH_NOTIFICATION.REQUEST, handleFetchNotification);
  yield takeLatest(DELETE_NOTIFICATION.REQUEST, handleDeleteNotificaton);
}
