import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './types';
const initialState = {
  loading: false,
  error: false,
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_EVENT.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_EVENT.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_EVENT.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_EVENT.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_EVENT.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_EVENT.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_EVENT.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_EVENT.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_EVENT.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_EVENT.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_EVENT.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}
export default eventReducer;