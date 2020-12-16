import axios from "axios";
import { GET_SLOT_DAYS, SLOT_DAYS_LOADING } from "../actions/types";
import { SLOT_DAYS_SERVER } from "./config";

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

export const getSlotDays = () => {
  const request = axios
    .get(`${SLOT_DAYS_SERVER}`)
    .then((response) => response.data);

  return {
    type: GET_SLOT_DAYS,
    payload: request,
  };
};

export const slotDaysLoading = () => {
  return {
    type: SLOT_DAYS_LOADING,
  };
};
