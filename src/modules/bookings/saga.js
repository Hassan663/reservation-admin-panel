import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import bookingsAction, { GET_BOOKINGS } from './actions';
import { REQUEST } from 'modules/common/actions';
import { getBookingsApi } from 'services/bookings';

export function* handleGetBookings() {
  try {
    const data = yield call(getBookingsApi);
    yield put(bookingsAction.getBookings.success(data));
  } catch (e) {
    yield put(bookingsAction.getBookings.failure(e));
    antMessage.error(e.message, 2);
  }
}
export default function* bookingsWatcher() {
  yield takeLatest(GET_BOOKINGS[REQUEST], handleGetBookings);
}
