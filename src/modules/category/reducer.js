import { ADD_CATEGORY, GET_CATEGORY } from './actions';
import { DELETE_CATEGORY } from './types';
const initialState = {
  category: [],
  loading: false,
  error: false,
};

function categoryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CATEGORY.REQUEST:
    case DELETE_CATEGORY.REQUEST:
      return { ...state, loading: true, error: false };
    case DELETE_CATEGORY.SUCCESS:
      return {
        ...state,
        category: state.category.filter(cat => cat.id !== payload),
      };

    case ADD_CATEGORY.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        category: [...state.category, payload],
      };
    case ADD_CATEGORY.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
    case GET_CATEGORY.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_CATEGORY.SUCCESS:
      return { ...state, loading: true, error: false, category: payload.data };
    case GET_CATEGORY.FAILURE:
      return { ...state, loading: false, error: payload.message };
    case DELETE_CATEGORY.FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
}
export default categoryReducer;
