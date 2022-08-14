import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './types';

const eventActions = {
  addEvent: {
    request: data => {
      return { type: ADD_EVENT.REQUEST, payload: data };
    },
    success: data => {
      return { type: ADD_EVENT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: ADD_EVENT.FAILURE, payload: data };
    },
  },
  deleteEvent: {
    request: data => {
      return { type: DELETE_EVENT.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_EVENT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_EVENT.FAILURE, payload: data };
    },
  },
  updateEvent: {
    request: data => {
      return { type: UPDATE_EVENT.REQUEST, payload: data };
    },
    success: data => {
      return { type: UPDATE_EVENT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: UPDATE_EVENT.FAILURE, payload: data };
    },
  },
  fetchEvent: {
    request: data => {
      return { type: FETCH_EVENT.REQUEST, payload: data };
    },
    success: data => {
      return { type: FETCH_EVENT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: FETCH_EVENT.FAILURE, payload: data };
    },
  },
};
export default productActions;
