import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./Button";
import UserLoggedInButton from "../../Landing/Header/UserLoggedInButton";
import "./NavBar.css";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [click, setClick] = useState(false);

  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => setClick(false);
  return (
    <Fragment>
      <nav className="navbar mb-5">
        <img src={logo} alt="logo" className="navbar-brand" />
        <Link to="#" className="navbar-logo" onClick={closeMobileMenu}>
          RESERVATION
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active " : "nav-menu"}>
          {isAuthenticated ? (
            <Fragment>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Zones
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
            </Fragment>
          ) : null}
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/register"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Register
            </Link>
          </li>
        </ul>
        {isAuthenticated ? <UserLoggedInButton /> : <Button />}
      </nav>
    </Fragment>
  );
};

export default NavBar;
