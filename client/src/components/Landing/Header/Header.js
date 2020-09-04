import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import Datetimepickerform from "./Datetimepickerform/Datetimepickerform";
import * as Scroll from "react-scroll";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";

toast.configure();
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    toast.info("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    props.history.push("/");
  };

  const userLink = (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link className={styles.link} to="/profile">
          Profile
        </Link>
      </NavItem>
      <NavItem>
        <Link className={styles.link} to="#" onClick={logOut}>
          LogOut
        </Link>
      </NavItem>
    </Nav>
  );

  return (
    <div className={styles.header}>
      <Navbar expand="sm" className="mb-5 bg-transparent">
        <Container>
          <img src={logo} alt="logo" className={styles.logo} />
          <NavbarBrand className={styles.brand} href="/">
            RESERVATION
          </NavbarBrand>
          <NavbarToggler className={styles.navbarToggler} onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className={styles.collapse}>
            <Nav className="ml-auto" navbar style={{ paddingRight: "30px" }}>
              <NavItem>
                <Link className={styles.link} to="/">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Scroll.Link
                  className={styles.link}
                  to="p-zone"
                  smooth={true}
                  spy={true}
                  duration={1200}
                  style={{ cursor: "pointer" }}
                >
                  Zones
                </Scroll.Link>
              </NavItem>
              <NavItem>
                <Scroll.Link
                  className={styles.link}
                  to="about"
                  smooth={true}
                  duration={1300}
                  style={{ cursor: "pointer" }}
                >
                  About
                </Scroll.Link>
              </NavItem>
            </Nav>
            {localStorage.usertoken ? (
              userLink
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link className={styles.link} to="/login">
                    Login
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className={styles.link} to="/register">
                    Register
                  </Link>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>

      <div className={styles.welcomeNote}>
        <div className="row max-height justify-content-center align-items-center">
          <div className="mx-auto text-white text-center">
            <h1>Welcome to RESERVATION</h1>
            <h2 className="my-2">Parking</h2>
          </div>
        </div>
      </div>

      <Datetimepickerform />
    </div>
  );
};

export default withRouter(Header);
