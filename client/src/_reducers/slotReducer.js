import {
  ADD_SLOT,
  GET_SLOT,
  DELETE_SLOT,
  SLOT_LOADING,
} from "../actions/types";

const initialState = {
  slots: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SLOT:
      return {
        ...state,
        slots: action.payload,
        loading: false,
      };
    case ADD_SLOT:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case DELETE_SLOT:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case SLOT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
