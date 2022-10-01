import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config';
import { apiWrapper, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.request.use(requestInterceptor);

const api = {
  addBlog: data => request.post('/blog', data),
  deleteBlog: id => request.delete(`/blog/${id}`),
  updateBlog: ({data,id}) => request.patch(`/blog/${id}`,data),
  fetchBlog: (payload) => request.get(`/blog?page=${payload}`),
};
export default apiWrapper(api);
