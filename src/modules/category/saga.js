import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import categoryActions, { ADD_CATEGORY } from './actions';
import { REQUEST } from '../common/actions';
import { categoryApi } from 'services/category';

export function* handleAddCategory(action) {
  try {
    console.log('Category SAGA', action);
    const data = yield call(categoryApi, action.payload);
    console.log('category API response: ', data);
    yield put(categoryActions.addCategory.success(data));
    antMessage.success('Product Category Added Successfully!', 2);
  } catch (error) {
    yield put(authActions.signup.failure(error.response.data.message));
    antMessage.error(error.message);
  }
}

export default function* categoryWatcher() {
  yield takeLatest(ADD_CATEGORY[REQUEST], handleAddCategory);
}
