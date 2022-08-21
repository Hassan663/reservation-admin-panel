import { takeLatest, call, put } from 'redux-saga/effects';
import blogActions from './actions';
import { ADD_BLOG } from './types';
import { message as antMessage } from 'antd';
import { REQUEST } from 'modules/common/actions';
import blog from 'services/blog';
import productActions from 'modules/product/actions';

export function* handleAddBlog({ payload }) {
  try {
    // for (var item of payload.entries()) {
    //   // used to console file data
    //   console.log(item);
    // }
    console.log('Blog-Saga: ', payload);
    const data = yield call(blog.addBlog, payload);
    console.log('API response in Saga: ', data);
    yield productActions(blogActions.addBlog.success(data.data));
    antMessage.success('Blog Added Successfully!', 2);
  } catch (error) {
    console.log('Blog Saga Error: ', error);
    antMessage.error(error.message, 2);
    yield put(blogActions.addBlog.failure(error));
  }
}

export default function* blogWatcher() {
  yield takeLatest(ADD_BLOG[REQUEST], handleAddBlog);
}
