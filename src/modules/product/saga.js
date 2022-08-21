import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';
import productActions from './actions';
import product from 'services/product';
import { REQUEST } from 'modules/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
export function* handleAddProduct({ payload }) {
  try {
      for (var pair of payload.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    console.log('in saga');
    const data = yield call(product.addProduct, payload);
    console.log(data);
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
  yield takeLatest(ADD_PRODUCT[REQUEST], handleAddProduct);
  yield takeLatest(DELETE_PRODUCT[REQUEST], handleDeleteProduct);
  yield takeLatest(UPDATE_PRODUCT[REQUEST], handleUpdateProduct);
  yield takeLatest(FETCH_PRODUCT[REQUEST], handleFetchProduct);
}
