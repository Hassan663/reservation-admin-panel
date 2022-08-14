import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth/reducer';
import eventReducer from './event/reducer';
import productReducer from './product/reducer';
const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    eventReducer,
    productReducer,
  });
export default rootReducer;
