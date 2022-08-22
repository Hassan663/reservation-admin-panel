import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config';
import { apiWrapper, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.request.use(requestInterceptor);

const api = {
  addBlog: data => request.post('/blog', data),
};
export default apiWrapper(api);
