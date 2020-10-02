import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import usePasswordToggle from "../utils/usePasswordToggle";
import useButtonLoader from "../utils/useButtonLoader";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./ResetPassword.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

toast.configure();
const ResetPassword = () => {
  const dispatch = useDispatch();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmToggleIcon] = usePasswordToggle();
  const [resetPasswordElement, setButtonLoading] = useButtonLoader(
    "Reset Password",
    "Loading"
  );

  const { register, handleSubmit, getValues, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setButtonLoading(true);

    // Create user object
    const user = {
      password: data.password,
      confirm_password: data.confirm_password,
    };

    // Attempt to authenticate user
    // dispatch(loginUser(user))
    //   .then((response) => {
    //     if (response.payload.token) {
    //       history.push("/");
    //       toast.success("Successfully logged in!", {
    //         position: toast.POSITION.TOP_CENTER,
    //         autoClose: 3000,
    //       });
    //       e.target.reset();
    //       dispatch(clearErrors());
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(
    //       returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
    //     );
    //     dispatch(loginFail());

    //     if (error.response.data) {
    //       history.push("/login");
    //       toast.error("Invalid Credentials!", {
    //         position: toast.POSITION.TOP_CENTER,
    //         autoClose: 3000,
    //       });
    //     }
    //     setButtonLoading(false);
    //   });
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
          Reset Password
          <Link to="#" className="btn disabled" tabIndex="-1" role="button">
            Login
          </Link>
        </p>
        <p style={{ color: " #2680eb" }}>Enter new password</p>
      </animated.div>
      <br />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <span className="password-toggle-icon">{ConfirmToggleIcon}</span>
            )}
          </div>
          <br />
          <div className="container" id="reset-password-btn">
            <button
              className="btn btn-md btn-primary m-0"
              type="submit"
              ref={resetPasswordElement}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </Fragment>
  );
};

export default ResetPassword;
