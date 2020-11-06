import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import {
  returnErrors,
  clearErrors,
  loginFail,
} from "../../actions/errorActions";
import { useForm } from "react-hook-form";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./LoginPage.css";
import usePasswordToggle from "../utils/usePasswordToggle";
import useButtonLoader from "../utils/useButtonLoader";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

toast.configure();
const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [loginButtonElement, setButtonLoading] = useButtonLoader(
    "Login",
    "Loading"
  );
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setButtonLoading(true);

    // Create user object
    const user = {
      email: data.email,
      password: data.password,
    };

    // Attempt to authenticate user
    dispatch(loginUser(user))
      .then((response) => {
        if (response.payload.token) {
          history.push("/");
          toast.success("Successfully logged in!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          e.target.reset();
          dispatch(clearErrors());
        }
      })
      .catch((error) => {
        dispatch(
          returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
        );
        dispatch(loginFail());

        if (error.response.data) {
          history.push("/login");
          toast.error("Invalid Credentials!", {
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
      transform: "translate(-800px,0)",
    },
    opacity: 1,
    transform: "translate(40px,0)",
  });

  return (
    <Fragment>
      <NavBar />
      <animated.div className="container" id="border" style={props}>
        <p id="register">
          Login
          <Link to="#" className="btn disabled" tabIndex="-1" role="button">
            Register
          </Link>
        </p>
        <p style={{ color: " #2680eb" }}>Welcome Back!</p>
      </animated.div>
      <br />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              style={{ fontSize: "13px", fontWeight: "500", color: "#bf1650" }}
            >
              {errors.email && errors.email.message}
            </span>
          </div>
          <br />
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
          <br />
          <div className="container">
            <Link
              to="/request_reset_password"
              style={{ textDecoration: "None", cursor: "pointer" }}
            >
              Forgot Your Password?
            </Link>
            <p className="mt-3" style={{ color: "#2680eb" }}>
              Don't have an account? &nbsp;
              <Link
                style={{ textDecoration: "None", cursor: "pointer" }}
                to="/register"
              >
                register
              </Link>
            </p>
          </div>
          <div className="container" id="login-btn">
            <button
              className="btn btn-md btn-primary m-0"
              type="submit"
              ref={loginButtonElement}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </Fragment>
  );
};

export default withRouter(LoginPage);
