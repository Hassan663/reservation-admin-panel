import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import categoryActions, { ADD_CATEGORY, GET_CATEGORY } from './actions';
import { REQUEST } from '../common/actions';
import { categoryApi, getCategoryApi } from 'services/category';

export function* handleAddCategory(action) {
  try {
    const data = yield call(categoryApi, action.payload);
    yield put(categoryActions.addCategory.success(data));
    antMessage.success('Product Category Added Successfully!', 2);
  } catch (error) {
    yield put(categoryActions.addCategory.failure(error.response.data.message));
    antMessage.error(error.message, 2);
  }
}
export function* handleGetCategory(action) {
  try {
    console.log('chlo Saga mn tw agyee: ');
    const data = yield call(getCategoryApi);
    console.log('API response in Saga: ', data);
    yield put(categoryActions.getCategory.success(data));
    console.success('Category Fetched Successfully!');
  } catch (error) {
    yield put(categoryActions.getCategory.failure(error.response.data.message));
    antMessage.error(error.message, 2);
  }
}

export default function* categoryWatcher() {
  yield takeLatest(ADD_CATEGORY[REQUEST], handleAddCategory);
  yield takeLatest(GET_CATEGORY[REQUEST], handleGetCategory);
}
