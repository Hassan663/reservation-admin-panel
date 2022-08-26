import { DELETE_NOTIFICATION, FETCH_NOTIFICATION } from './types';
const initialState = {
  loading: false,
  error: false,
};

function notificationReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case FETCH_NOTIFICATION.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case FETCH_NOTIFICATION.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case FETCH_NOTIFICATION.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_NOTIFICATION.REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_NOTIFICATION.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_NOTIFICATION.FAILURE:
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
export default notificationReducer;
