import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../SidebarData";
import "./Navbar.css";

const Navbar = () => {
  const logo = require("../../assets/logo.png");

  return (
    <React.Fragment>
      {/* <!-- Sidebar navigation section --> */}
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div className="sidebar">
        <header>
          <img className="logo" src={logo} alt="logo" />
          RESERVATION
        </header>
        <ul>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
