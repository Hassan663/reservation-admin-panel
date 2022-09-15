import {
  ADD_BOOKING_SLOT,
  DELETE_BOOKING_SLOT,
  GET_BOOKING_SLOT,
  UPDATE_BOOKING_SLOT,
} from './actions';

const initialState = {
  bookingSlots: [],
  loading: false,
  error: false,
};

function bookingSlotsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BOOKING_SLOT.REQUEST:
    case DELETE_BOOKING_SLOT.REQUEST:
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

    case GET_BOOKING_SLOT.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_BOOKING_SLOT.SUCCESS:
      return { ...state, loading: true, error: false, bookingSlots: payload };
    case GET_BOOKING_SLOT.FAILURE:
      return { ...state, loading: false, error: payload.message };

    case DELETE_BOOKING_SLOT.SUCCESS:
      return {
        ...state,
        bookingSlots: state.bookingSlots.filter(tSlot => tSlot.id !== payload),
      };
    case DELETE_BOOKING_SLOT.FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case UPDATE_BOOKING_SLOT.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case UPDATE_BOOKING_SLOT.SUCCESS: {
      return {
        ...state,
        loading: true,
        error: false,
        bookingSlots: [
          ...state.bookingSlots.map(slots => {
            if (slots.id === action.payload.data.id) return action.payload.data;
            else return slots;
          }),
        ],
      };
    }
    default:
      return state;
  }
}
export default bookingSlotsReducer;
