import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth/reducer';
import eventReducer from './event/reducer';
import categoryReducer from './category/reducer';
import productReducer from './product/reducer';
import adimnChatReducer from './adminChat/reducer';
import menuReducer from './menu/reducer';
// import notificationReducer from './notification/reducer';
const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    adimnChatReducer,
    authReducer,
    eventReducer,
    categoryReducer,
    productReducer,
    menuReducer,
    // notificationReducer,
  });
export default rootReducer;
