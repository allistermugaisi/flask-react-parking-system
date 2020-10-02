import React, { useEffect } from "react";
import { auth } from "../../actions/authActions";
import { returnErrors, authError } from "../../actions/errorActions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let authUser = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      // To know my current status, send Auth request
      dispatch(auth())
        .then((res) => {
          // Not Logged in status
          if (!res.payload.user) {
            if (option) {
              props.history.push("/login");
            }

            // Logged in status
          } else {
            // Supposed to be an Admin page, but not an Admin person wants to access route
            if (adminRoute && !res.payload.user.admin) {
              props.history.push("/");

              // Logged in status, but Try to access login route
            } else {
              if (option === false) {
                props.history.push("/");
              }
            }
          }
        })
        .catch((error) => {
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              "AUTHENTICATION_FAIL"
            )
          );
          dispatch(authError());
          if (error.response.data) {
            if (option) {
              props.history.push("/login");
            }
          }
        });

      // eslint-disable-next-line
    }, []);
    return <SpecificComponent {...props} user={authUser} />;
  }
  return AuthenticationCheck;
}
