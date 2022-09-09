import { ADD_BOOKING_SLOT } from './actions';

const initialState = {
  bookingSlots: [],
  loading: false,
  error: false,
};

function bookingSlotsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BOOKING_SLOT.REQUEST:
      return { ...state, loading: true, error: false };
    case ADD_BOOKING_SLOT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        bookingSlots: [...state.bookingSlots, payload],
      };
    case ADD_BOOKING_SLOT.FAILURE:
      return { ...state, loading: false, error: payload.message };
    default:
      return state;
  }
}
export default bookingSlotsReducer;
