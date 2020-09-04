import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Navbar
        expand="sm"
        className="mb-5 "
        style={{ backgroundColor: "#000000" }}
      >
        <Container>
          <img src={logo} alt="logo" className={styles.logo} />
          <NavbarBrand className={styles.brand} href="/">
            RESERVATION
          </NavbarBrand>
          <NavbarToggler className={styles.navbarToggler} onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className={styles.collapse}>
            <Nav className="ml-auto " navbar style={{ paddingRight: "30px" }}>
              <NavItem>
                <Link className={styles.link} to="/">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className={styles.link} to="#">
                  Zones
                </Link>
              </NavItem>
              <NavItem>
                <Link className={styles.link} to="#">
                  About
                </Link>
              </NavItem>
            </Nav>
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
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
