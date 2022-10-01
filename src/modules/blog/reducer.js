import { ADD_BLOG, DELETE_BLOG, FETCH_BLOG, UPDATE_BLOG } from './types';

const initialState = {
  loading: false,
  error: false,
  blogs: [],
  blog: {},
  totalBlogs:0
};

function blogReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BLOG.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_BLOG.SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, payload],
        error: false,
      };
    case ADD_BLOG.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_BLOG.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_BLOG.SUCCESS:
      return {
        ...state,
        blogs: [...state.blogs.filter(blog => blog.id !== payload)],
        loading: false,
        error: false,
      };
    case DELETE_BLOG.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UPDATE_BLOG.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_BLOG.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        blogs: [
          ...state.blogs.map(blog => {
            if (blog.id === payload.data.id) return payload.data;
            else return blog;
          }),
        ],
      };
    case UPDATE_BLOG.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case FETCH_BLOG.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_BLOG.SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        error: false,
        blogs: [...payload.blog],
        totalBlogs:payload.BlogCount
      };
    case FETCH_BLOG.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}
export default blogReducer;
