import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';
import { message as antMessage } from 'antd';
import { GET_ALL_CLIENTS } from './types';
export const SIGNUP = createRequestTypes('SIGNUP');

export const SIGNIN = createRequestTypes('SIGNIN');
export const CONFIRM_SIGNIN = createRequestTypes('CONFIRM_SIGNIN');
export const SIGNOUT = createRequestTypes('SIGNOUT');

export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');

export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');

const authActions = {
  signup: {
    request: data => action(SIGNUP[REQUEST], { payload: data }),
    success: data => {
      return action(SIGNUP[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNUP[FAILURE], { payload: error });
    },
  },

  signin: {
    request: data => action(SIGNIN[REQUEST], { payload: data }),
    success: data => {
      return action(SIGNIN[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNIN[FAILURE], { payload: error });
    },
    saveUser: data => {
      return action(SIGNIN_SAVE_USER, { payload: data });
    },
  },

  signout: {
    request: data => {
      return action(SIGNOUT[REQUEST], { payload: data });
    },
    success: data => {
      return action(SIGNOUT[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNOUT[FAILURE], { payload: error });
    },
  },

  forgotPassword: {
    request: data => action(FORGOT_PASSWORD[REQUEST], { payload: data }),
    success: data => {
      return action(FORGOT_PASSWORD[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(FORGOT_PASSWORD[FAILURE], { payload: error });
    },
  },

  changePassword: {
    request: data => action(CHANGE_PASSWORD[REQUEST], { payload: data }),
    success: data => {
      return action(CHANGE_PASSWORD[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(CHANGE_PASSWORD[FAILURE], { payload: error });
    },
  },
  getAllClients: {
    request: data => {
      return { type: GET_ALL_CLIENTS.REQUEST, payload: data };
    },
    success: data => {
      return { type: GET_ALL_CLIENTS.SUCCESS, payload: data };
    },
    failure: error => {
      return { type: GET_ALL_CLIENTS.FAILURE, payload: error };
    },
  },
};

export default authActions;
