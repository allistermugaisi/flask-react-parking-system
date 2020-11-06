import axios from "axios";
import {
    ADD_RESERVATION,
    GET_RESERVATION,
    DELETE_RESERVATION,
    RESERVATION_LOADING
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

export const getReservations = () => dispatch => {
    dispatch(setReservationLoading());
    axios.get(`${RESERVATION_SERVER}`)
    .then(res => dispatch({
        type: GET_RESERVATION,
        payload:res.data
    }))
}

export const addReservation = ({reserved_slot,reserved_date,cost,zone,slot_number}) => {

  // Request body
  // Convert data to json format using JSON stringify
  const body = JSON.stringify({ reserved_date, reserved_slot, cost, zone, slot_number });

   const request = axios.post(`${RESERVATION_SERVER}`,body, tokenConfig())
    .then(res => res.data);

    return {
      type:ADD_RESERVATION,
      payload:request
    }
        

}

export const deleteReservation = id => dispatch => {
   axios.delete(`${RESERVATION_SERVER}/${id}`).then(res => 
    dispatch({
        type:  DELETE_RESERVATION,
        payload:id
    }))
}

export const setReservationLoading = () => {
    return {
        type: RESERVATION_LOADING
    }
}