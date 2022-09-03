import { DELETE_NOTIFICATION, FETCH_NOTIFICATION } from './types';

const notificationActions = {
  getNotification: {
    request: data => {
      return { type: FETCH_NOTIFICATION.REQUEST, payload: data };
    },
    success: data => {
      return { type: FETCH_NOTIFICATION.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: FETCH_NOTIFICATION.FAILURE, payload: data };
    },
  },
  deleteNotification: {
    request: data => {
      return { type: DELETE_NOTIFICATION.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_NOTIFICATION.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_NOTIFICATION.FAILURE, payload: data };
    },
  },
};
export default notificationActions;
