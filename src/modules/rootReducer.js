import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth/reducer';
import clientChatReducer from './clientChat/reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    clientChatReducer,
  });
export default rootReducer;
