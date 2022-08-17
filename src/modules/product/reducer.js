import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';
const initialState = {
  loading: false,
  error: false,
};

function productReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case ADD_PRODUCT.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case ADD_PRODUCT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_PRODUCT.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_PRODUCT.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_PRODUCT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_PRODUCT.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UPDATE_PRODUCT.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case UPDATE_PRODUCT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UPDATE_PRODUCT.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case FETCH_PRODUCT.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case FETCH_PRODUCT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case FETCH_PRODUCT.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return {
        ...state,
        loading: false,
        error: false,
      };
  }
}
export default productReducer;
