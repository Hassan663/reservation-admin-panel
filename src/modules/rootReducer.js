import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth/reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
  });
export default rootReducer;
