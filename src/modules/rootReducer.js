import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth/reducer';
import eventReducer from './event/reducer';
import categoryReducer from './category/reducer';
import productReducer from './product/reducer';
import adimnChatReducer from './adminChat/reducer';
import menuReducer from './menu/reducer';
import notificationReducer from './notification/reducer';
import bookingsReducer from './bookings/reducer';
import blogReducer from './blog/reducer';
import bookingSlotsReducer from './bookingSlots/reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    adimnChatReducer,
    authReducer,
    eventReducer,
    categoryReducer,
    productReducer,
    menuReducer,
    notificationReducer,
    bookingsReducer,
    bookingSlotsReducer,
    blogReducer,
  });
export default rootReducer;
