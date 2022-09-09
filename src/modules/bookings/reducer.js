import { GET_BOOKINGS } from './actions';

const initialState = {
  bookings: [],
  loading: false,
  error: false,
};

function bookingsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_BOOKINGS.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_BOOKINGS.SUCCESS:
      console.log('Bookings........', payload);
      return { ...state, loading: false, error: false, bookings: payload };
    case GET_BOOKINGS.FAILURE:
      return { ...state, loading: false, error: payload.message };
    default:
      return state;
  }
}
export default bookingsReducer;
