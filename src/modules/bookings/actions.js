import { REQUEST, SUCCESS, FAILURE, action, createRequestTypes } from 'modules/common/actions';

export const GET_BOOKINGS = createRequestTypes('GET_BOOKINGS');
export const CANCEL_BOOKINGS = createRequestTypes('CANCEL_BOOKINGS');
export const APPROVE_BOOKINGS = createRequestTypes('APPROVE_BOOKINGS');

const bookingsAction = {
  getBookings: {
    request: data => action(GET_BOOKINGS[REQUEST], { payload: data }),
    success: data => {
      return action(GET_BOOKINGS[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(GET_BOOKINGS[FAILURE], { payload: error });
    },
  },
  cancelBookings:{
    request: data => action(CANCEL_BOOKINGS[REQUEST], { payload: data }),
    success: data => {
      return action(CANCEL_BOOKINGS[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(CANCEL_BOOKINGS[FAILURE], { payload: error });
    },
  },
  approveBookings:{
    request: data => action(APPROVE_BOOKINGS[REQUEST], { payload: data }),
    success: data => {
      return action(APPROVE_BOOKINGS[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(APPROVE_BOOKINGS[FAILURE], { payload: error });
    },
  }
};
export default bookingsAction;
