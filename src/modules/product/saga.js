import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';
import productActions from './actions';
import product from 'services/product';
import { message as antMessage } from 'antd';
import { REQUEST } from 'modules/common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
export function* handleAddProduct({ payload }) {
  try {
    const data = yield call(product.addProduct, payload);
    yield put(productActions.addProduct.success(data));
    antMessage.success('Product Added Successfully!', 2);
    yield put(productActions.fetchProduct.request());
  } catch (error) {
    yield put(productActions.addProduct.failure(error));
  }
}

export function* handleDeleteProduct() {
  try {
    const {data} = yield call(product.deleteProduct, payload);
    yield put(productActions.deleteProduct.success(data));
    message.success('Product Deleted Successfully!', 2);
    yield put(productActions.fetchProduct.request());
  } catch (error) {
    yield put(productActions.deleteProduct.failure(error));
  }
}
export function* handleUpdateProduct({payload}) {
  try {
    const { data } = yield call(product.updateProduct, payload);
    console.log(data);
    yield put(productActions.updateProduct.success({ productId: payload.id, data }));
    message.success('Product Updated Successfully!', 2);
    yield put(productActions.fetchProduct.request());

  } catch (error) {
    yield put(productActions.updateProduct.failure(error));
  }
}
export function* handleFetchProduct() {
  try {
    const { data } = yield call(product.fetchProduct);
    yield put(productActions.fetchProduct.success(data.product));
  } catch (error) {
    yield put(productActions.fetchProduct.failure(error));
  }
}
export default function* productWatcher() {
  yield takeLatest(ADD_PRODUCT[REQUEST], handleAddProduct);
  yield takeLatest(DELETE_PRODUCT[REQUEST], handleDeleteProduct);
  yield takeLatest(UPDATE_PRODUCT[REQUEST], handleUpdateProduct);
  yield takeLatest(FETCH_PRODUCT[REQUEST], handleFetchProduct);
}
