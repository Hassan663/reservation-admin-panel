import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './types';
import event from 'services/event';
import actions from './actions';
export function* handleAddEvent({ payload }) {
  // payload is coming from action when we call dispatch
  try {
    for (var pair of payload.entries()) {
      console.log('Form Data in handler ', pair);
      // console.log(pair[0] + ': ' + pair[1]);
    }
    // console.log('Data in handleAddEvent', payload);
    const data = yield call(event.addEvent, payload);
    yield put(actions.addEvent.success(data));
  } catch (error) {
    yield put(actions.addEvent.failure(error));
  }
}

export function* handleDeleteEvent() {
  try {
  } catch (error) {}
}
export function* handleUpdateEvent() {
  try {
  } catch (error) {}
}
export function* handleFetchEvent() {
  try {
  } catch (error) {}
}
export default function* eventWatcher() {
  yield takeLatest(ADD_EVENT.REQUEST, handleAddEvent);
  yield takeLatest(DELETE_EVENT.REQUEST, handleDeleteEvent);
  yield takeLatest(UPDATE_EVENT.REQUEST, handleUpdateEvent);
  yield takeLatest(FETCH_EVENT.REQUEST, handleFetchEvent);
}
