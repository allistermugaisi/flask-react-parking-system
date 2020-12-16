import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import reservationReducer from "./reservationReducer";
import slotReducer from "./slotReducer";
import slotDaysReducer from "./slotDaysReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  reservation: reservationReducer,
  slot: slotReducer,
  slotDays: slotDaysReducer,
  searchSlots: searchReducer,
});

export default rootReducer;
