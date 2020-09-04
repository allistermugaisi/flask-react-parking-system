import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { register } from "../utils/UserFunctions";
import "./RegisterPage.css";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePasswordToggle from "../utils/usePasswordToggle";
import useButtonLoader from "../utils/useButtonLoader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

toast.configure();
const RegisterPage = ({ history }) => {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [Errors] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [Validity] = useState({
    phone_number: false,
    username: false,
    email: false,
    password: false,
    confirm_password: false,
  });

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmToggleIcon] = usePasswordToggle();

  const [loginButtonElement, setButtonLoading] = useButtonLoader(
    "Register",
    "Loading"
  );

  const handleChange = ({ target }) => {
    Value[target.name] = target.value;
    setValue({ ...Value, Value });
    handleValidation(target);
  };

  const handleValidation = (target) => {
    const { name, value } = target;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const isConfirmPassword = name === "confirm_password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    Validity[name] = value.length > 0;
    Errors[name] = Validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (Validity[name]) {
      if (isEmail) {
        Validity[name] = emailTest.test(value);
        Errors[name] = Validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        Validity[name] = value.length >= 6;
        Errors[name] = Validity[name]
          ? ""
          : `${name} should be 6 characters minimum`;
      }
      if (isConfirmPassword) {
        Validity[name] = value.length >= 6;
        Errors[name] = Validity[name]
          ? ""
          : `${name} should be 6 characters minimum`;
      }
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (Object.values(Validity).every(Boolean)) {
      setButtonLoading(true);

      const newUser = {
        username: Value.username,
        email: Value.email,
        phone_number: Value.phone_number,
        password: Value.password,
        confirm_password: Value.confirm_password,
      };

      register(newUser).then((response) => {
        // console.log(response);

        // === "Password do not match" is referenced exactly with the server. Do not change the string ===

        if (response.password_match) {
          toast.error("Passwords do not match!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          history.push("/register");

          // === "User already exists" is referenced exactly with the server. Do not change the string ===
        } else if (response.user_exist) {
          toast.error(
            "User already registered, use a different email address and phone number!",
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            }
          );
          history.push("/register");
        } else if (response.result) {
          history.push("/login");
          toast.success("Successfully registered!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          history.push("/register");
        }

        setButtonLoading(false);
      });
    } else {
      for (let key in Value) {
        let target = {
          name: key,
          value: Value[key],
        };
        handleValidation(target);
      }
    }
  };

  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translate(-2000px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });
  return (
    <React.Fragment>
      <NavBar />
      <animated.div className="container" id="border" style={props}>
        <p id="register">
          Register
          <Link to="#" className="btn disabled" tabIndex="-1" role="button">
            Login
          </Link>
        </p>
        <p style={{ color: " #2680eb" }}>Create Account</p>
      </animated.div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                name="username"
                type="text"
                className={`form-control ${
                  Errors.username ? "is-invalid" : ""
                }`}
                placeholder="Username"
                value={Value.username}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.username}</span>
            </div>
          </div>
          &nbsp;
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                name="email"
                type="email"
                className={`form-control ${Errors.email ? "is-invalid" : ""}`}
                placeholder="Email Address"
                value={Value.email}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.email}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                name="phone_number"
                type="number"
                min="0"
                className={`form-control ${
                  Errors.phone_number ? "is-invalid" : ""
                }`}
                placeholder="Phone no."
                value={Value.phone_number}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.phone_number}</span>
            </div>
          </div>
          &nbsp;
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                type={PasswordInputType}
                name="password"
                className={`form-control ${
                  Errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={Value.password}
                onChange={handleChange}
              />
              {`${Errors.password}` ? (
                <span className="invalid-feedback">{Errors.password}</span>
              ) : (
                <span className="password-toggle-icon">{ToggleIcon}</span>
              )}
            </div>
          </div>
          &nbsp;
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                type={ConfirmPasswordInputType}
                name="confirm_password"
                className={`form-control ${
                  Errors.confirm_password ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
                value={Value.confirm_password}
                onChange={handleChange}
              />
              {`${Errors.confirm_password}` ? (
                <span className="invalid-feedback">
                  {Errors.confirm_password}
                </span>
              ) : (
                <span className="password-toggle-icon">
                  {ConfirmToggleIcon}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container" id="search-btn">
        <div className="input-group-append">
          <button
            className="btn btn-md btn-primary m-0"
            onClick={handleOnSubmit}
            ref={loginButtonElement}
            type="button"
          >
            Register
          </button>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(RegisterPage);
