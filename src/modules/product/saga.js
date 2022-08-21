import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';
import productActions from './actions';
import product from 'services/product';
export function* handleAddProduct({ payload }) {
  try {
    const data = yield call(product.addProduct, payload);
    yield put(productActions.addProduct.success(data));
  } catch (error) {
    yield put(productActions.addProduct.failure(error));
  }
}

export function* handleDeleteProduct() {
  try {
  } catch (error) {}
}
export function* handleUpdateProduct() {
  try {
  } catch (error) {}
}
export function* handleFetchProduct() {
  try {
  } catch (error) {}
}
export default function* productWatcher() {
  yield takeLatest(ADD_PRODUCT.REQUEST, handleAddProduct);
  yield takeLatest(DELETE_PRODUCT.REQUEST, handleDeleteProduct);
  yield takeLatest(UPDATE_PRODUCT.REQUEST, handleUpdateProduct);
  yield takeLatest(FETCH_PRODUCT.REQUEST, handleFetchProduct);
}
