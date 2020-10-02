import axios from "axios";
import {
  AUTH_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD,
  RESET_PASSWORD,
} from "../actions/types";
import {
  USER_AUTH,
  USER_SERVER,
  REQUEST_RESET_PASSWORD_SERVER,
  RESET_PASSWORD_SERVER,
} from "./config";

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

// Check token and Auth user

export const auth = () => {
  const request = axios
    .get(`${USER_AUTH}/user`, tokenConfig())
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};

// Register User

export const registerUser = ({
  username,
  email,
  phone_number,
  password,
  confirm_password,
}) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  // Convert data to json format using JSON stringify
  const body = JSON.stringify({
    username,
    email,
    phone_number,
    password,
    confirm_password,
  });

  const request = axios
    .post(`${USER_SERVER}`, body, config)
    .then((response) => response.data);

  return {
    type: REGISTER_SUCCESS,
    payload: request,
  };
};

// Login User

export const loginUser = ({ email, password }) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  // Convert data to json format using JSON stringify
  const body = JSON.stringify({ email, password });

  const request = axios
    .post(`${USER_AUTH}`, body, config)
    .then((response) => response.data);

  return {
    type: LOGIN_SUCCESS,
    payload: request,
  };
};

// Logout User
export const logOut = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// request password reset
export const requestResetPassword = ({ email }) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  // Convert data to json format using JSON stringify
  const body = JSON.stringify({ email });

  const request = axios
    .post(`${REQUEST_RESET_PASSWORD_SERVER}`, body, config)
    .then((response) => response.data);

  return {
    type: REQUEST_RESET_PASSWORD,
    payload: request,
  };
};
