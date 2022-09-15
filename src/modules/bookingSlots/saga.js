import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST } from '../common/actions';
import { message as antMessage } from 'antd';
import { addSlotApi, getSlotApi, deleteSlotApi } from 'services/bookingSlot';
import BookingSlotsActions, {
  ADD_BOOKING_SLOT,
  GET_BOOKING_SLOT,
  DELETE_BOOKING_SLOT,
  UPDATE_BOOKING_SLOT,
} from './actions';

export function* handleAddBookingSlot(action) {
  try {
    const { data } = yield call(addSlotApi, action.payload);
    yield put(BookingSlotsActions.addBookingSlot.success(data));
    antMessage.success('Booking Slot Added!', 2);
  } catch (error) {
    yield put(BookingSlotsActions.addBookingSlot.failure(error.response.data.message));
    antMessage.error(error.message, 2);
  }
}

export function* handleGetBookingSlot() {
  try {
    const data = yield call(getSlotApi);
    yield put(BookingSlotsActions.getBookingSlot.success(data.data.results));
  } catch (error) {
    yield put(BookingSlotsActions.getBookingSlot.failure(error.message));
    antMessage.error(error.message, 2);
  }
}

export function* handleDeleteBookingSlot(action) {
  try {
    const { data } = yield call(deleteSlotApi, action.payload);
    yield put(BookingSlotsActions.deleteBookingSlot.success(action.payload));
  } catch (error) {
    yield put(BookingSlotsActions.deleteBookingSlot.failure(error.message));
    antMessage.error(error.message, 2);
  }
}
export function* handleUpdateBookingSlot(action) {
  try {
    console.log('In New Sagaaa');
    const { data } = yield call(event.updateEvent, action.payload);
    console.log('API respone in SAGA::: ', data);
    yield put(BookingSlotsActions.updateBookingSlot.success({ eventId: action.payload.id, data }));
    message.success('Time Slot Updated Successfully!', 2);
  } catch (error) {
    yield put(BookingSlotsActions.updateBookingSlot.failure(error));
  }
}

export default function* bookingSlotWatcher() {
  yield takeLatest(ADD_BOOKING_SLOT[REQUEST], handleAddBookingSlot);
  yield takeLatest(GET_BOOKING_SLOT[REQUEST], handleGetBookingSlot);
  yield takeLatest(DELETE_BOOKING_SLOT[REQUEST], handleDeleteBookingSlot);
}
