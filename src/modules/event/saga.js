import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './types';
export function* handleAddEvent({ payload }) {
  // payload is coming from action when we call dispatch
  try {
  } catch (error) {}
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
