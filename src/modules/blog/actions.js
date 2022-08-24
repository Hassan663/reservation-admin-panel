import { ADD_BLOG } from './types';

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
};

export default blogActions;
