import axios from "axios";
import {
  ADD_RESERVATION,
  GET_RESERVATION,
  DELETE_RESERVATION,
  RESERVATION_LOADING,
} from "../actions/types";
import { RESERVATION_SERVER } from "./config";

// Setup config/headers and token

export const tokenConfig = () => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  // if token, add to headers
  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
};

// export const getReservations = () => {
//   const request = axios
//     .get(`${RESERVATION_SERVER}`, tokenConfig())
//     .then((response) => response.data);

//   return {
//     type: GET_RESERVATION,
//     payload: request,
//   };
// };

export const getReservations = () => {
  return {
    type: GET_RESERVATION,
  };
};

// export const addReservation = ({
//   reserved_slot,
//   reserved_date,
//   cost,
//   zone,
//   slot_number,
// }) => {
//   // Request body
//   // Convert data to json format using JSON stringify
//   const body = JSON.stringify({
//     reserved_date,
//     reserved_slot,
//     cost,
//     zone,
//     slot_number,
//   });

//   const request = axios
//     .post(`${RESERVATION_SERVER}`, body, tokenConfig())
//     .then((res) => res.data);

//   return {
//     type: ADD_RESERVATION,
//     payload: request,
//   };
// };

// export const deleteReservation = (id) => (dispatch) => {
//   axios.delete(`${RESERVATION_SERVER}/${id}`).then((res) =>
//     dispatch({
//       type: DELETE_RESERVATION,
//       payload: id,
//     })
//   );
// };

export const addReservation = (slot) => (dispatch, getState) => {
  dispatch({
    type: ADD_RESERVATION,
    payload: slot,
  });
  const cartReservations = getState().reservation.reservations.slice();
  localStorage.setItem("cartReservations", JSON.stringify(cartReservations));
};

export const deleteReservation = (slot) => (dispatch, getState) => {
  dispatch({
    type: DELETE_RESERVATION,
    payload: slot,
  });
  const cartReservations = getState().reservation.reservations.slice();
  localStorage.setItem("cartReservations", JSON.stringify(cartReservations));
};

export const reservationLoading = () => {
  return {
    type: RESERVATION_LOADING,
  };
};
