import { SIGNUP, SIGNIN, SIGNOUT, FORGOT_PASSWORD, CHANGE_PASSWORD } from './actions';

import { GET_ALL_CLIENTS } from './types';
const initialState = {
  isLoggedIn: false,
  isSignedUp: false,
  allUsers: [],
  user: true ?? {
    user: {
      firstName: '',
      lastName: '',
    },
  },
  loading: false,
  error: false,
};

function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGNUP.REQUEST:
    case GET_ALL_CLIENTS.REQUEST:
      return { ...state, loading: true, error: false, isSignedUp: false };
    case GET_ALL_CLIENTS.SUCCESS:
      return { ...state, loading: false, error: false, allUsers: [...payload] };
    case SIGNUP.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSignedUp: true,
        data: payload,
        user: payload,
        // username: payload.data.user.username,
      };

    case SIGNUP.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        isSignedUp: false,
      };

    case SIGNIN.REQUEST:
      return {
        ...state,
        username: payload,
        loading: true,
        error: false,
        isLoggedIn: false,
      };

    case SIGNIN.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
        isLoggedIn: true,
        // mfaFormType: '',
        // loginVisible: false,
      };

    case SIGNIN.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        isLoggedIn: false,
        user: payload.user,
        // mfaFormType: payload.mfaFormType ? 'signin' : ''
      };

    case SIGNOUT.REQUEST:
      return { ...state, loading: true, error: false };

    case SIGNOUT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: false,
      };

    case SIGNOUT.FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: payload.message,
      };

    case FORGOT_PASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        username: payload.username,
      };

    case FORGOT_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        changePasswordVisible: true,
        forgotPasswordVisible: false,
        isForgotForm: true,
      };

    case FORGOT_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case CHANGE_PASSWORD.REQUEST:
      return { ...state, loading: true, error: false };

    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        changePasswordVisible: false,
      };

    case CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
    case 'LOGOUT':
      unSetSessionCookies();
      return {
        ...state,
        loading: false,
        error: false,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default authReducer;
