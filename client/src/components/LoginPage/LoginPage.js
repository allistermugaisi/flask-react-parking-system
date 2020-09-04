import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./LoginPage.css";
import usePasswordToggle from "../utils/usePasswordToggle";
import useButtonLoader from "../utils/useButtonLoader";
import { login } from "../utils/UserFunctions";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

toast.configure();
const LoginPage = ({ history }) => {
  const [Value, setValue] = useState({ email: "", password: "" });
  const [Errors] = useState({ email: "", password: "" });
  const [Validity] = useState({ email: false, password: false });

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [loginButtonElement, setButtonLoading] = useButtonLoader(
    "Login",
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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.values(Validity).every(Boolean)) {
      setButtonLoading(true);

      const user = {
        email: Value.email,

        password: Value.password,
      };

      login(user).then((response) => {
        //console.log(response);
        if (response.access_denied) {
          history.push("/login");
          toast.error("Invalid username or password!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (response.access_token) {
          history.push("/profile");
          toast.success("Successfully logged in!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          history.push("/login");
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
      transform: "translate(-800px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });

  return (
    <React.Fragment>
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
        <div className="row">
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
                name="password"
                type={PasswordInputType}
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
        </div>
      </div>
      <br />
      <div className="container">
        <p style={{ color: "#2680eb" }}>Forgot Your Password?</p>
        <p style={{ color: "#2680eb" }}>
          Don't have an account? &nbsp;
          <Link
            style={{ textDecoration: "None", cursor: "pointer" }}
            to="/register"
          >
            register
          </Link>
        </p>
      </div>
      <br />
      <div className="container">
        <div className="input-group-append" id="search-btn">
          <button
            className="btn btn-md btn-primary m-0"
            onClick={handleSubmit}
            ref={loginButtonElement}
          >
            Login
          </button>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(LoginPage);
