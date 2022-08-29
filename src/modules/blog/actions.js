import { ADD_BLOG,DELETE_BLOG,FETCH_BLOG,UPDATE_BLOG } from './types';

const blogActions = {
  addBlog: {
    request: data => {
      return { type: ADD_BLOG.REQUEST, payload: data };
    },
    success: data => {
      return { type: ADD_BLOG.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: ADD_BLOG.FAILURE, payload: data };
    },
  },
  deleteBlog: {
    request: data => {
      return { type: DELETE_BLOG.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_BLOG.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_BLOG.FAILURE, payload: data };
    },
  },
  updateBlog: {
    request: data => {
      return { type: UPDATE_BLOG.REQUEST, payload: data };
    },
    success: data => {
      return { type: UPDATE_BLOG.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: UPDATE_BLOG.FAILURE, payload: data };
    },
  },
  fetchBlog: {
    request: data => {
      return { type: FETCH_BLOG.REQUEST, payload: data };
    },
    success: data => {
      return { type: FETCH_BLOG.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: FETCH_BLOG.FAILURE, payload: data };
    },
  },
};

export default blogActions;
