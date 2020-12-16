import { GET_SLOT_DAYS, SLOT_DAYS_LOADING } from "../actions/types";

const initialState = {
  slotDays: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SLOT_DAYS:
      return {
        ...state,
        slotDays: action.payload,
        loading: false,
      };
    case SLOT_DAYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
