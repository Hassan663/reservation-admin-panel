import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_MENU, DELETE_MENU, UPDATE_MENU, FETCH_MENU } from './types';

import menu from 'services/menu';
import actions from './actions';
export function* handleAddMenu({ payload }) {
  // payload is coming from action when we call dispatch
  try {
    const data = yield call(menu.addMenu, payload);
    yield put(actions.addMenu.success(data));
  } catch (error) {
    yield put(actions.addMenu.failure(error));
  }
}

export function* handleDeleteMenu() {
  try {
  } catch (error) {}
}
export function* handleUpdateMenu() {
  try {
  } catch (error) {}
}
export function* handleFetchMenu() {
  try {
  } catch (error) {}
}
export default function* menuWatcher() {
  yield takeLatest(ADD_MENU.REQUEST, handleAddMenu);
  yield takeLatest(DELETE_MENU.REQUEST, handleDeleteMenu);
  yield takeLatest(UPDATE_MENU.REQUEST, handleUpdateMenu);
  yield takeLatest(FETCH_MENU.REQUEST, handleFetchMenu);
}
