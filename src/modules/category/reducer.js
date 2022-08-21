import { ADD_CATEGORY } from './actions';

const initialState = {
  category: {},
  loading: false,
  error: false,
};

function categoryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CATEGORY.REQUEST:
      return { ...state, loading: true, error: false };
    case ADD_CATEGORY.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        category: payload,
      };
    case ADD_CATEGORY.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
    default:
      return state;
  }
}
export default categoryReducer;
