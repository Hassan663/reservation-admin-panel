import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { push } from 'connected-react-router';
import actions from './actions';
import ClientChat from './types';

export function* handleGetClientChat() {
  try {
    // const data = call();
    // yield put(.success(data));
  } catch (error) {
    // yield put(.failure(error));
  }
}
export default function* clientWrapper() {
  yield takeLatest(ClientChat.getClientChats.request, handleGetClientChat);
}
