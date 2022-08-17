import axios from 'axios';

import { USERS_BASE_URL } from 'constants/config';
import { apiWrapper, errorInterceptor, requestInterceptor, checkForce } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
// request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);
// request.interceptors.request.use(checkForce);
const api = {
  getAdminChats: async data => request.get(`/chatConnection/getAdminChats`, data),
  getAllGroups: async objectId => request.get(`/chat/getGroups/${objectId}`),
  createGroup: async data => request.post('/chat/createGroup', data),
  checkUserConnection: async data => request.get(`/chatConnection/checkConnection/${data}`),
  createOnetoOneConnection: async data => request.post(`/chatConnection/createConnection`, data),
  deleteGroup: async objectId => request.delete(`/chat/deleteGroup/${objectId}`),
  updateGroup: async ({ objectId, data }) => request.patch(`chat/${objectId}`, data),
  sendNotification: async data => request.post('/chatConnection/pushNotification', data),
  getMultiUserToken: async usersArray => request.get(`/serviceToken/multi/${usersArray}`),
  getSingleUserToken: async objectId => request.get(`/serviceToken/single/${objectId}`),
  addToken: async ({ id: userId, tokenFound: token }) =>
    request.post(`/serviceToken`, { userId, token }),
  deleteToken: async ({ id: objectId, userId }) => request.delete(`/serviceToken/${objectId}`),
};
export default apiWrapper(api);
