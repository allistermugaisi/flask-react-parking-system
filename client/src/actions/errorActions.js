import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  SLOT_FAIL,
  SLOT_DAYS_FAIL,
  RESERVATION_FAIL,
  AUTH_ERROR,
} from "./types";

// RETURN ERRORS from server

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id,
    },
  };
};

// CLEAR ERRORS

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// Login Fail
export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

// Register Fail
export const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};

// Slot Fail
export const slotFail = () => {
  return {
    type: SLOT_FAIL,
  };
};

// Slot Days Fail
export const slotDaysFail = () => {
  return {
    type: SLOT_DAYS_FAIL,
  };
};

// Reservation Fail
export const reservationFail = () => {
  return {
    type: RESERVATION_FAIL,
  };
};

// Auth Error
export const authError = () => {
  return {
    type: AUTH_ERROR,
  };
};

// Register User
// export const registerUser = ({
//   username,
//   email,
//   phone_number,
//   password,
//   confirm_password,
// }) => (dispatch) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   // Convert data to json format using JSON stringify
//   const body = JSON.stringify({
//     username,
//     email,
//     phone_number,
//     password,
//     confirm_password,
//   });

//   axios.post("/api/users", body, config).then((res) =>
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     })
//   );
// };

// // Login user
// export const login = ({ email, password }) => (dispatch) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   const body = JSON.stringify({ email, password });

//   axios
//     .post("/api/auth", body, config)
//     .then((res) =>
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );
//       dispatch({
//         type: LOGIN_FAIL,
//       });
//     });
// };

// // Check token and load user
// export const loadUser = () => (dispatch, getState) => {
//   // User loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get("/api/auth/user", tokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({ type: AUTH_ERROR });
//     });
// };
