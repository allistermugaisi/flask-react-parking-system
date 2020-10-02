import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { returnErrors, registerFail } from "../../actions/errorActions";
import { useForm } from "react-hook-form";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
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
  const dispatch = useDispatch();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmToggleIcon] = usePasswordToggle();

  const [registerButtonElement, setButtonLoading] = useButtonLoader(
    "Register",
    "Loading"
  );

  const { register, handleSubmit, getValues, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setButtonLoading(true);

    // Create user object
    const newUser = {
      username: data.username,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      confirm_password: data.confirm_password,
    };

    // Attempt to register user
    dispatch(registerUser(newUser))
      .then((response) => {
        if (response.payload.message) {
          history.push("/login");
          toast.success("User successfully registered!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          e.target.reset();
        }
      })
      .catch((error) => {
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch(registerFail());

        if (error.response.data) {
          history.push("/register");
          toast.error("User already exists!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
        setButtonLoading(false);
      });
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
    <Fragment>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Username"
                  name="username"
                  ref={register({
                    required: true,
                  })}
                />
              </div>
              {errors.username && errors.username.type === "required" && (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#bf1650",
                  }}
                >
                  Username is required!
                </span>
              )}
            </div>
            &nbsp;
            <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email address"
                  name="email"
                  ref={register({
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#bf1650",
                }}
              >
                {errors.email && errors.email.message}
              </span>
            </div>
          </div>
          &nbsp;
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type="tel"
                  className={`form-control ${
                    errors.phone_number ? "is-invalid" : ""
                  }`}
                  placeholder="Mobile number"
                  name="phone_number"
                  ref={register({
                    required: true,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: " Mobile number should be a number",
                    },
                  })}
                />
              </div>
              {errors.phone_number && errors.phone_number.type === "required" && (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#bf1650",
                  }}
                >
                  Mobile number is required!
                </span>
              )}
              {errors.phone_number && (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#bf1650",
                  }}
                >
                  {errors.phone_number.message}
                </span>
              )}
              {errors.phone_number && errors.phone_number.type === "maxLength" && (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#bf1650",
                  }}
                >
                  Mobile should be 10 characters maximum
                </span>
              )}
            </div>
          </div>
          <br />
          &nbsp;
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type={PasswordInputType}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  name="password"
                  ref={register({
                    required: true,
                    minLength: 6,
                  })}
                />
              </div>
              {errors.password ? (
                (errors.password.type === "required" && (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#bf1650",
                    }}
                  >
                    Password is required!
                  </span>
                )) ||
                (errors.password.type === "minLength" && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#bf1650",
                    }}
                  >
                    Password should be atleast 6 characters
                  </span>
                ))
              ) : (
                <span className="password-toggle-icon">{ToggleIcon}</span>
              )}
            </div>
            &nbsp;
            <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type={ConfirmPasswordInputType}
                  className={`form-control ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  ref={register({
                    required: true,
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      },
                    },
                  })}
                />
              </div>
              {errors.confirm_password ? (
                (errors.confirm_password.type === "required" && (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#bf1650",
                    }}
                  >
                    Please confirm password!
                  </span>
                )) || (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#bf1650",
                    }}
                  >
                    {errors.confirm_password.message}
                  </span>
                )
              ) : (
                <span className="password-toggle-icon">
                  {ConfirmToggleIcon}
                </span>
              )}
            </div>
          </div>
          <br />
          <div id="login-btn">
            <button
              className="btn btn-md btn-primary m-0"
              type="submit"
              ref={registerButtonElement}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <Footer />
    </Fragment>
  );
};

export default withRouter(RegisterPage);
