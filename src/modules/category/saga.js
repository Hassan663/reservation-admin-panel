import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import categoryActions, { ADD_CATEGORY, GET_CATEGORY } from './actions';
import { REQUEST } from '../common/actions';
import { categoryApi, getCategoryApi, deleteCategory } from 'services/category';
import { DELETE_CATEGORY } from './types';

export function* handleAddCategory(action) {
  try {
    const { data } = yield call(categoryApi, action.payload);
    console.log('Response of Adding New Category.......', data);
    yield put(categoryActions.addCategory.success(data));
    antMessage.success('Product Category Added Successfully!', 2);
  } catch (error) {
    yield put(categoryActions.addCategory.failure(error.response.data.message));
    antMessage.error(error.message, 2);
  }
}
export function* handleGetCategory(action) {
  try {
    const data = yield call(getCategoryApi, action.payloads);
    console.log('Data of GETTING Categories......', data);
    yield put(categoryActions.getCategory.success(data));
  } catch (error) {
    yield put(categoryActions.getCategory.failure(error.message));
    antMessage.error(error.message, 2);
  }
}

export function* handleDeleteCategory(action) {
  try {
    const { data } = yield call(deleteCategory, action.payload);
    console.log('Data of Deleteing Category....', data);
    yield put(categoryActions.deleteCategory.success(action.payload));
  } catch (error) {
    yield put(categoryActions.deleteCategory.failure(error.message));
    antMessage.error(error.message, 2);
  }
}

export default function* categoryWatcher() {
  yield takeLatest(ADD_CATEGORY[REQUEST], handleAddCategory);
  yield takeLatest(GET_CATEGORY[REQUEST], handleGetCategory);
  yield takeLatest(DELETE_CATEGORY.REQUEST, handleDeleteCategory);
}
