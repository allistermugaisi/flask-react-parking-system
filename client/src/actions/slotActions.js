import axios from "axios";
import {
    ADD_SLOT,
    GET_SLOT,
    DELETE_SLOT,
    SLOT_LOADING
  } from "../actions/types";
  import { SLOT_SERVER } from "./config"

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


export const getSlots = () => {
    const request = axios.get(`${SLOT_SERVER}`,tokenConfig())
    .then((response) => response.data);

    return {
        type: GET_SLOT,
        payload: request,
      };
}

export const addSlot = ({slot_name,zone}) => {

  // Request body
  // Convert data to json format using JSON stringify
  const body = JSON.stringify({ slot_name,zone });

   const request = axios.post(`${SLOT_SERVER}`,body,tokenConfig())
   .then((response) => response.data);

    return {
        type: ADD_SLOT,
        payload: request,
      };
}

export const deleteSlot = id => {
    const request = axios.delete(`${SLOT_SERVER}/${id}`,tokenConfig())
    .then(response => response.data)

    return {
        type: DELETE_SLOT,
        payload: request,
      };
 }

 export const slotLoading = () => {
    return {
        type: SLOT_LOADING
    }
}