import { ADD_BLOG } from './types';

const initialState = {
  loading: false,
  error: false,
};

function blogReducer(state = initialState, { type, payload }) {
  console.log('Blog Reducer: ', payload);
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
        loading: true,
        error: false,
      };
    case ADD_BLOG.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
  }
}
export default blogReducer;
