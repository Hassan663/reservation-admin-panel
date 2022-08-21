import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';

export const ADD_CATEGORY = createRequestTypes('ADD_CATEGORY');

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
};
export default categoryActions;
