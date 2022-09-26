import { GET_BOOKINGS,CANCEL_BOOKINGS,APPROVE_BOOKINGS } from './actions';

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
      return { ...state, loading: false, error: false, bookings: payload };
    case GET_BOOKINGS.FAILURE:
      return { ...state, loading: false, error: payload.message };

      case CANCEL_BOOKINGS.REQUEST:
        return { ...state, loading: true, error: false };
      case CANCEL_BOOKINGS.SUCCESS:
        return { ...state, loading: false, error: false, 
          bookings: [...state.bookings,payload] 
        };
      case CANCEL_BOOKINGS.FAILURE:
        return { ...state, loading: false, error: payload.message };

        case APPROVE_BOOKINGS.REQUEST:
          return { ...state, loading: true, error: false };
        case APPROVE_BOOKINGS.SUCCESS:
          return { ...state, loading: false, error: false, 
            bookings: [...state.bookings,payload] 
          };
        case APPROVE_BOOKINGS.FAILURE:
          return { ...state, loading: false, error: payload.message };

    default:
      return state;
  }
}
export default bookingsReducer;
