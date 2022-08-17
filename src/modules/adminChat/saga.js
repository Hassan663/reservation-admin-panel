import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { push } from 'connected-react-router';
import actions from './actions';
import AdminChat from './types';
import { getOnlineUsers, setCurrentUserChat } from '../../components/commonActions/FirebaseActions'; // firebase functions
// import {
//   getAdminChats,
//   getAllGroups,
//   createGroup,
//   checkUserConnection,
//   createOnetoOneConnection,
// } from 'services/adminChat';
import chatActions from 'services/adminChat';
export function* handleUpdateGroup({ payload }) {
  try {
    const data = yield call(chatActions.updateGroup, { objectId: payload.id, data: payload.data });

    yield put(actions.updateGroup.success(data.data.response.data));
  } catch (error) {
    yield put(actions.updateGroup.failure(error));
  }
}
export function* handleDeleteGroup({ payload }) {
  try {
    const data = yield call(chatActions.deleteGroup, payload);
    yield put(actions.deleteGroup.success(data.data.response.data._id));
  } catch (error) {
    yield put(actions.deleteGroup.failure(error));
  }
}
export function* handlegetAdminChats({ payload }) {
  try {
   
  } catch (error) {

  }
}
export function* handlegetOnlineUsers({ payload }) {
  try {

  } catch (error) {

  }
}
// export function* handle({}) {}
export function* handleGetAllGroups({ payload }) {
  //true
  try {
    const data = yield call(chatActions.getAllGroups, payload);
    yield put(actions.getAllGroups.success(data.data.response.data));
  } catch (error) {
    yield put(actions.getAllGroups.failure(error));
  }
}
export function* handleCreateGroup({ payload }) {
  // true
  try {
    const data = yield call(chatActions.createGroup, payload);
    yield put(actions.createGroup.success(data.data.response.data));
  } catch (error) {
    yield put(actions.createGroup.failure(error));
  }
}
export function* handleCheckUserConnection({ payload }) {
  // true
  try {
    const { data } = yield call(chatActions.checkUserConnection, payload);
    yield put(actions.checkUserConnection.success(data.response.data._id));
  } catch (error) {
    yield put(actions.checkUserConnection.failure(error));
  }
}
export function* handleCreateOnetoOneConnection({ payload }) {
  try {

  } catch (error) {
 
  }
}
export function* handleAddToken({ payload }) {
  try {
    const data = yield call(chatActions.addToken, payload);
    localStorage.setItem('tokenid', data.data.response.data._id);
    yield put(actions.addToken.success(data.data.response.data._id));
  } catch (error) {
    yield put(actions.addToken.failure(error));
  }
}
export function* handleGetSingleUserToken({ payload }) {
  try {
    const data = yield call(chatActions.getSingleUserToken, payload);
    yield put(actions.getSingleUserToken.success(data.data.response.data));
  } catch (error) {
    yield put(actions.getSingleUserToken.failure(error));
  }
}
export function* handleGetMultiUserToken({ payload }) {
  try {
    const data = yield call(chatActions.getMultiUserToken, payload);
    yield put(actions.getMultiUserToken.success(data));
  } catch (error) {
    yield put(actions.getMultiUserToken.failure(error));
  }
}
export function* handleDeleteToken({ payload }) {
  try {
    // alert('wait');
    const data = yield call(chatActions.deleteToken, payload);
   
  } catch (error) {

  }
}
export function* handleSendNotification({ payload }) {
  try {
    const data = yield call(chatActions.sendNotification, payload);
    yield put(actions.sendNotification.success(data));
  } catch (error) {
  }
}
export default function* chatWatcher() {
  yield takeLatest(AdminChat.updateGroup.request, handleUpdateGroup);
  yield takeLatest(AdminChat.deleteGroup.request, handleDeleteGroup);
  yield takeLatest(AdminChat.getAdminChats.request, handlegetAdminChats);
  yield takeLatest(AdminChat.getOnlineUsers.request, handlegetOnlineUsers);
  yield takeLatest(AdminChat.getAllGroups.request, handleGetAllGroups);
  yield takeLatest(AdminChat.createGroup.request, handleCreateGroup);
  yield takeLatest(AdminChat.checkUserConnection.request, handleCheckUserConnection);
  yield takeLatest(AdminChat.createOnetoOneConnection.request, handleCreateOnetoOneConnection);
  yield takeLatest(AdminChat.addToken.request, handleAddToken);
  // yield takeLatest(AdminChat.getSingleUserToken.request, handleGetSingleUserToken);
  yield takeLatest(AdminChat.getMultiUserToken.request, handleGetMultiUserToken);
  yield takeLatest(AdminChat.deleteToken.request, handleDeleteToken);
  yield takeLatest(AdminChat.sendNotification.request, handleSendNotification);
  // yield takeLatest(, );
  // yield takeLatest(, );
}
