import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './types';
import event from 'services/event';
import actions from './actions';
import { REQUEST } from 'modules/common/actions';
import EventActions from './actions';
import { message } from 'antd';
export function* handleAddEvent({ payload }) {
  // payload is coming from action when we call dispatch
  try {
    const data = yield call(event.addEvent, payload);
    yield put(actions.addEvent.success(data.data));
    message.success('Event Added Successfully!', 2);

    // yield put(EventActions.fetchEvent.request());
  } catch (error) {
    yield put(actions.addEvent.failure(error));
  }
}

export function* handleDeleteEvent({ payload }) {
  try {
    const { data } = yield call(event.deleteEvent, payload);
    yield put(actions.deleteEvent.success(payload));
    message.success('Event Deleted Successfully!', 2);
    // yield put(EventActions.fetchEvent.request());
  } catch (error) {
    yield put(actions.deleteEvent.failure(error));
  }
}
export function* handleUpdateEvent({ payload }) {
  try {
    const { data } = yield call(event.updateEvent, payload);
    yield put(actions.updateEvent.success({ eventId: payload.id, data }));
    message.success('Event Updated Successfully!', 2);
  } catch (error) {
    yield put(actions.updateEvent.failure(error));
  }
}
export function* handleFetchEvent({ payload }) {
  try {
    const { data } = yield call(event.fetchEvent, payload);
    yield put(actions.fetchEvent.success(data.event));
  } catch (error) {
    yield put(actions.fetchEvent.failure(error));
  }
}
export default function* eventWatcher() {
  yield takeLatest(ADD_EVENT[REQUEST], handleAddEvent);
  yield takeLatest(DELETE_EVENT[REQUEST], handleDeleteEvent);
  yield takeLatest(UPDATE_EVENT[REQUEST], handleUpdateEvent);
  yield takeLatest(FETCH_EVENT[REQUEST], handleFetchEvent);
}
