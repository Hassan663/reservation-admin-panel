import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST } from '../common/actions';
import { message as antMessage } from 'antd';
import { addSlotApi } from 'services/bookingSlot';
import BookingSlotsActions, { ADD_BOOKING_SLOT } from './actions';

export function* handleAddBookingSlot(action) {
  try {
    const { data } = yield call(addSlotApi, action.payload);
    yield put(BookingSlotsActions.addBookingSlot.success(data));
    antMessage.success('Booking Slot Added!', 2);
  } catch (error) {
    console.log('Saga Error:', error);
    yield put(BookingSlotsActions.addBookingSlot.failure(error.response.data.message));
    antMessage.error(error.message, 2);
  }
}
export default function* bookingSlotWatcher() {
  yield takeLatest(ADD_BOOKING_SLOT[REQUEST], handleAddBookingSlot);
}
