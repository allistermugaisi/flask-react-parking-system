import axios from "axios";

export const registerUser = async (newUser) => {
  return await axios
    .post("users/register", {
      username: newUser.username,
      email: newUser.email,
      phone_number: newUser.phone_number,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

export const login = async (user) => {
  return await axios
    .post("users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data.access_token);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const reservation = async (newReservation) => {
  return await axios
    .post("/api/reservation", {
      username: newReservation.username,
      phone_number: newReservation.phone_number,
      entry_date: newReservation.entry_date,
      exit_date: newReservation.exit_date,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};
