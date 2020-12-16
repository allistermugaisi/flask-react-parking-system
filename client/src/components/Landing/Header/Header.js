import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Button } from "./Button";
import UserLoggedInButton from "./UserLoggedInButton";
import Datetimepickerform from "./Datetimepickerform/Datetimepickerform";
import * as Scroll from "react-scroll";
import styled from "styled-components";

toast.configure();

// const Container = styled.div`
//   display: flex;
//   padding: 1rem;
//   justify-content: flex-end;
//   align-items: center;
//   margin-bottom: 3rem;
// `;

const ProfileImg = styled.img`
  height: 2rem;
  margin: 0 1rem;
  cursor: pointer;
`;

const MessageIcon = styled.span`
  color: #fff;
  font-size: 27px;
  cursor: pointer;
`;
const Header = (props) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => setClick(false);

  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <div className="header">
        <nav className="navbar-landing">
          <img src={logo} alt="logo" className="navbar-brand" />
          <Link to="#" className="navbar-logo" onClick={closeMobileMenu}>
            RESERVATION
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active " : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Scroll.Link
                className="nav-links"
                to="p-zone"
                smooth={true}
                spy={true}
                duration={1200}
                style={{ cursor: "pointer" }}
                onClick={closeMobileMenu}
              >
                Zones
              </Scroll.Link>
            </li>
            <li className="nav-item">
              <Scroll.Link
                className="nav-links"
                to="about"
                smooth={true}
                duration={1300}
                style={{ cursor: "pointer" }}
                onClick={closeMobileMenu}
              >
                About
              </Scroll.Link>
            </li>
          </ul>
          {isAuthenticated ? <UserLoggedInButton /> : <Button />}
        </nav>

        <div className="welcomeNote">
          <div className="row max-height justify-content-center align-items-center">
            <div className="mx-auto text-white text-center">
              <h1 className="tags">Welcome to RESERVATION</h1>
              <h2 className="my-2 tags">Parking</h2>
            </div>
          </div>
        </div>

        <Datetimepickerform />
      </div>
    </Fragment>
  );
};

export default withRouter(Header);
