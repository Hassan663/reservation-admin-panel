import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';
export const ADD_BOOKING_SLOT = createRequestTypes('ADD_BOOKING_SLOT');

const BookingSlotsActions = {
  addBookingSlot: {
    request: data => action(ADD_BOOKING_SLOT[REQUEST], { payload: data }),
    success: data => action(ADD_BOOKING_SLOT[SUCCESS], { payload: data }),
    failure: error => action(ADD_BOOKING_SLOT[FAILURE], { payload: error }),
  },
};
export default BookingSlotsActions;
