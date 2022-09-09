import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import bookingsAction, { GET_BOOKINGS } from './actions';
import { REQUEST } from 'modules/common/actions';
import { getBookingsApi } from 'services/bookings';

export function* handleGetBookings() {
  try {
    console.log('Calling Get Booking');
    const { data } = yield call(getBookingsApi);
    console.log('Response of getting Bookimgs', data.results);
    yield put(bookingsAction.getBookings.success(data.results));
  } catch (e) {
    yield put(bookingsAction.getBookings.failure(e));
    antMessage.error(e.message, 2);
  }
}
export default function* bookingsWatcher() {
  yield takeLatest(GET_BOOKINGS[REQUEST], handleGetBookings);
}
