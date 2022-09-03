import { ADD_MENU, DELETE_MENU, UPDATE_MENU, FETCH_MENU } from './types';

const MenuActions = {
  addMenu: {
    request: data => {
      return { type: ADD_MENU.REQUEST, payload: data };
    },
    success: data => {
      return { type: ADD_MENU.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: ADD_MENU.FAILURE, payload: data };
    },
  },
  deleteMenu: {
    request: data => {
      return { type: DELETE_MENU.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_MENU.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_MENU.FAILURE, payload: data };
    },
  },
  updateMenu: {
    request: data => {
      return { type: UPDATE_MENU.REQUEST, payload: data };
    },
    success: data => {
      return { type: UPDATE_MENU.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: UPDATE_MENU.FAILURE, payload: data };
    },
  },
  fetchMenu: {
    request: data => {
      return { type: FETCH_MENU.REQUEST, payload: data };
    },
    success: data => {
      return { type: FETCH_MENU.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: FETCH_MENU.FAILURE, payload: data };
    },
  },
};
export default MenuActions;
