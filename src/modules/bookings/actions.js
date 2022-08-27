import { REQUEST, SUCCESS, FAILURE, action, createRequestTypes } from 'modules/common/actions';

export const GET_BOOKINGS = createRequestTypes('GET_BOOKINGS');

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
};
export default bookingsAction;
