import axios from 'axios';

import { USERS_BASE_URL } from 'constants/config';
import { apiWrapper, errorInterceptor, requestInterceptor, checkForce } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
// request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);
// request.interceptors.request.use(checkForce);
const api = {
  addEvent: data => request.post('/event', data),
  deleteEvent: id => request.delete(`/event/${id}`),
  updateEvent: ({data,id}) => request.patch(`/event/${id}`,data),
  fetchEvent: () => request.get('/event'),
};
export default apiWrapper(api);
