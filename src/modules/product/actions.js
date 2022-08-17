import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from './types';

const productActions = {
  addProduct: {
    request: data => {
      return { type: ADD_PRODUCT.REQUEST, payload: data };
    },
    success: data => {
      return { type: ADD_PRODUCT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: ADD_PRODUCT.FAILURE, payload: data };
    },
  },
  deleteProduct: {
    request: data => {
      return { type: DELETE_PRODUCT.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_PRODUCT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_PRODUCT.FAILURE, payload: data };
    },
  },
  updateProduct: {
    request: data => {
      return { type: UPDATE_PRODUCT.REQUEST, payload: data };
    },
    success: data => {
      return { type: UPDATE_PRODUCT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: UPDATE_PRODUCT.FAILURE, payload: data };
    },
  },
  fetchProduct: {
    request: data => {
      return { type: FETCH_PRODUCT.REQUEST, payload: data };
    },
    success: data => {
      return { type: FETCH_PRODUCT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: FETCH_PRODUCT.FAILURE, payload: data };
    },
  },
};
export default productActions;
