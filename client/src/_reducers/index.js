import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import reservationReducer from "./reservationReducer";
import slotReducer from "./slotReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  reservation: reservationReducer,
  slot: slotReducer
});

export default rootReducer;
