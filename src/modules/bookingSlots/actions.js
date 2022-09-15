import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';
export const ADD_BOOKING_SLOT = createRequestTypes('ADD_BOOKING_SLOT');
export const GET_BOOKING_SLOT = createRequestTypes('GET_BOOKING_SLOT');
export const DELETE_BOOKING_SLOT = createRequestTypes('DELETE_BOOKING_SLOT');
export const UPDATE_BOOKING_SLOT = createRequestTypes('UPDATE_BOOKING_SLOT');

const BookingSlotsActions = {
  addBookingSlot: {
    request: data => action(ADD_BOOKING_SLOT[REQUEST], { payload: data }),
    success: data => action(ADD_BOOKING_SLOT[SUCCESS], { payload: data }),
    failure: error => action(ADD_BOOKING_SLOT[FAILURE], { payload: error }),
  },
  getBookingSlot: {
    request: data => action(GET_BOOKING_SLOT[REQUEST], { payload: data }),
    success: data => {
      return action(GET_BOOKING_SLOT[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(GET_BOOKING_SLOT[FAILURE], { payload: error });
    },
  },
  deleteBookingSlot: {
    request: data => {
      return { type: DELETE_BOOKING_SLOT.REQUEST, payload: data };
    },
    success: data => {
      return { type: DELETE_BOOKING_SLOT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: DELETE_BOOKING_SLOT.FAILURE, payload: data };
    },
  },
  updateBookingSlot: {
    request: data => {
      return { TYPE: UPDATE_BOOKING_SLOT.REQUEST, payload: data };
    },
    success: data => {
      return { type: UPDATE_BOOKING_SLOT.SUCCESS, payload: data };
    },
    failure: data => {
      return { type: UPDATE_BOOKING_SLOT.FAILURE, payload: data };
    },
  },
};
export default BookingSlotsActions;
