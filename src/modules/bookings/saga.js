import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import bookingsAction, { GET_BOOKINGS ,CANCEL_BOOKINGS,APPROVE_BOOKINGS} from './actions';
import { REQUEST } from 'modules/common/actions';
import { getBookingsApi,cancelBookingsApi,approveBookingsApi } from 'services/bookings';

export function* handleGetBookings() {
  try {
    const { data } = yield call(getBookingsApi);
    yield put(bookingsAction.getBookings.success(data.results));
  } catch (e) {
    yield put(bookingsAction.getBookings.failure(e));
    antMessage.error(e.message, 2);
  }
}
export function* bookingsWatcher() {
  yield takeLatest(GET_BOOKINGS[REQUEST], handleGetBookings);
}


///////////////CANCEL_BOOKINGS////////////////
export function* handleCancelBookings(action) {
  try {
    console.log(action);
    const { data } = yield call(cancelBookingsApi, action.payload);
    yield put(bookingsAction.cancelBookings.success(data.results));
    antMessage.success("Booking has been canceled");
  } catch (error) {
    antMessage.error(error.response.data.message);
    yield put(bookingsAction.cancelBookings.failure(error));
  }
}
export  function* cancelBookingsWatcher() {
  yield takeLatest(CANCEL_BOOKINGS[REQUEST], handleCancelBookings);
}
/////////////////////////////////////////////////

///////////////APPROVE_BOOKINGS////////////////
export function* handleApproveBookings(action) {
  try {
    console.log(action);
    const { data } = yield call(approveBookingsApi, action.payload);
    yield put(bookingsAction.approveBookings.success(data.results));
    antMessage.success("Booking has been approved");
  } catch (error) {
    antMessage.error(error.response.data.message);
    yield put(bookingsAction.approveBookings.failure(error));
  }
}
export  function* approveBookingsWatcher() {
  yield takeLatest(APPROVE_BOOKINGS[REQUEST], handleApproveBookings);
}
/////////////////////////////////////////////////