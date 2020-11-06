import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "../../../actions/authActions";
import styles from "./UserLoggedInButton.module.css";

toast.configure();
const UserLoggedInButton = (props) => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut());
    toast.info("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    props.history.push("/");
  };
  return (
    <>
      <Link to="user-profile/dashboard">
        <button className={styles.btn}>Profile</button>
      </Link>
      &nbsp;
      <Link to="#" onClick={logOutUser}>
        <button className={styles.btn}>Logout</button>
      </Link>
    </>
  );
};

export default withRouter(UserLoggedInButton);
