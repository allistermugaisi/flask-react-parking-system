import {
  GET_RESERVATION,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  RESERVATION_LOADING,
} from "../actions/types";

const initialState = {
  reservations: JSON.parse(localStorage.getItem("cartReservations") || "[]"),
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATION:
      return {
        ...state,
        loading: false,
      };
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [action.payload, ...state.reservations],
        loading: false,
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.slot_id !== action.payload.slot_id
        ),
        loading: false,
      };
    case RESERVATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
