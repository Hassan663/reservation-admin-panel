import { takeLatest, call, put } from 'redux-saga/effects';
import blogActions from './actions';
import { ADD_BLOG, DELETE_BLOG, FETCH_BLOG, UPDATE_BLOG } from './types';
import { message as antMessage } from 'antd';
import { REQUEST } from 'modules/common/actions';
import blog from 'services/blog';

export function* handleAddBlog({ payload }) {
  try {
    const data = yield call(blog.addBlog, payload);
    yield put(blogActions.addBlog.success(data.data));
    // yield put(blogActions.fetchBlog.request());
    antMessage.success('Blog Added Successfully!', 2);
  } catch (error) {
    antMessage.error(error.message, 2);
    yield put(blogActions.addBlog.failure(error));
  }
}
export function* handleDeleteBlog({ payload }) {
  try {
    const { data } = yield call(blog.deleteBlog, payload);
    antMessage.success('Blog Deleted Successfully!', 2);
    yield put(blogActions.deleteBlog.success(payload));
    // yield put(blogActions.fetchBlog.request());
  } catch (error) {
    yield put(blogActions.deleteBlog.failure(error));
  }
}
export function* handleUpdateBlog({ payload }) {
  try {
    const { data } = yield call(blog.updateBlog, payload);
    yield put(blogActions.updateBlog.success({ eventId: payload.id, data }));
    antMessage.success('Blog Updated Successfully!', 2);
  } catch (error) {
    yield put(blogActions.updateBlog.failure(error));
  }
}
export function* handleFetchBlog({ payload }) {
  try {
    const { data } = yield call(blog.fetchBlog, payload);
    console.log(data);
    yield put(blogActions.fetchBlog.success(data.blog));
  } catch (error) {
    yield put(blogActions.fetchBlog.failure(error));
  }
}
export default function* blogWatcher() {
  yield takeLatest(ADD_BLOG[REQUEST], handleAddBlog);
  yield takeLatest(DELETE_BLOG[REQUEST], handleDeleteBlog);
  yield takeLatest(UPDATE_BLOG[REQUEST], handleUpdateBlog);
  yield takeLatest(FETCH_BLOG[REQUEST], handleFetchBlog);
}
