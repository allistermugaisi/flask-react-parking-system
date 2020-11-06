import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export function Button() {
  return (
    <>
      <Link to="login">
        <button className={styles.btn}>Login</button>
      </Link>
      &nbsp;
      <Link to="register">
        <button className={styles.btn}>Register</button>
      </Link>
    </>
  );
}
