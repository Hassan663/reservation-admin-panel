import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';
const initialState = {
  loading: false,
  error: false,
  products: [],
  product: {},
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
        event: action.payload,
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
        products: [...state.products.filter(product => product._id !== action.payload)],
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
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        products: [
          ...state.products.map(product => {
            if (product._id === action.payload.data._id) return action.payload.data;
            else return product;
          }),
        ],
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
        products: [...action.payload],
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
