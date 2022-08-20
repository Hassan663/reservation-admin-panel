import { ADD_MENU, DELETE_MENU, UPDATE_MENU, FETCH_MENU } from './types';
const initialState = {
  loading: false,
  error: false,
};

function MenuReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MENU.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_MENU.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_MENU.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_MENU.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_MENU.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_MENU.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_MENU.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_MENU.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_MENU.FAILURE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_MENU.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_MENU.SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_MENU.FAILURE:
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
export default MenuReducer;
