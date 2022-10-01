import axios from 'axios';

import { USERS_BASE_URL } from 'constants/config';
import { apiWrapper, errorInterceptor, requestInterceptor, checkForce } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
// request.interceptors.response.use(null, errorInterceptor);
request.interceptors.request.use(requestInterceptor);
// request.interceptors.request.use(checkForce);
const api = {
  addProduct: data => request.post(`${USERS_BASE_URL}/product`, data),
  deleteProduct: id => request.delete(`/product/${id}`),
  updateProduct: ({data,id}) => request.patch(`/product/${id}`,data),
  fetchProduct: (payload) => request.get(`/product?page=${payload}`),
};
export default apiWrapper(api);
