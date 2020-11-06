import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import useButtonLoader from "../utils/useButtonLoader";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./RequestResetPassword.css";

toast.configure();
const RequestResetPassword = () => {
  const dispatch = useDispatch();

  const [requestResetPasswordElement, setButtonLoading] = useButtonLoader(
    "Request Reset Password",
    "Loading"
  );

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setButtonLoading(true);

    // Create user object
    const user = {
      email: data.email,
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
          Request Reset Password
          <Link to="#" className="btn disabled" tabIndex="-1" role="button">
            Login
          </Link>
        </p>
        <p style={{ color: " #2680eb" }}>Enter email address</p>
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
          <div className="container" id="request-reset-password-btn">
            <button
              className="btn btn-md btn-primary m-0"
              type="submit"
              ref={requestResetPasswordElement}
            >
              Request Password Reset
            </button>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </Fragment>
  );
};

export default RequestResetPassword;
