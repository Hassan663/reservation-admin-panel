import { takeLatest, call, put } from 'redux-saga/effects';
import blogActions from './actions';
import { ADD_BLOG } from './types';
import { message as antMessage } from 'antd';
import { REQUEST } from 'modules/common/actions';
import blog from 'services/blog';

export function* handleAddBlog({ payload }) {
  try {
    const data = yield call(blog.addBlog, payload);
    yield put(blogActions.addBlog.success(data.data));
    antMessage.success('Blog Added Successfully!', 2);
  } catch (error) {
    antMessage.error(error.message, 2);
    yield put(blogActions.addBlog.failure(error));
  }
}

export default function* blogWatcher() {
  yield takeLatest(ADD_BLOG[REQUEST], handleAddBlog);
}
