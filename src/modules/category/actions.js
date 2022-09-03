import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';
import { DELETE_CATEGORY } from './types.js';
export const ADD_CATEGORY = createRequestTypes('ADD_CATEGORY');
export const GET_CATEGORY = createRequestTypes('GET_CATEGORY');

const categoryActions = {
  addCategory: {
    request: data => action(ADD_CATEGORY[REQUEST], { payload: data }),
    success: data => {
      return action(ADD_CATEGORY[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(ADD_CATEGORY[FAILURE], { payload: error });
    },
  },
  getCategory: {
    request: data => action(GET_CATEGORY[REQUEST], { payload: data }),
    success: data => {
      return action(GET_CATEGORY[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(GET_CATEGORY[FAILURE], { payload: error });
    },
  },
  deleteCategory: {
    request: data => {
      return { type: DELETE_CATEGORY.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_CATEGORY.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_CATEGORY.FAILURE, payload: data };
    },
  },
};
export default categoryActions;
