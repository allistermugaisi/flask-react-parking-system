import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideNavData } from "./SideNavData";
import Image from "./assets/images/profilelg.png";
import "./UserNavbar.css";

const ProfileImg = styled.img`
  height: 5rem;
`;
const ProfileName = styled.h1`
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
`;

const Navbar = () => {
  return (
    <React.Fragment>
      {/* <!-- Sidebar navigation section --> */}
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div className="sidebar">
        <header className="mb-5">
          <ProfileImg src={Image} />
          <ProfileName>Scott Grant</ProfileName>
        </header>
        <ul>
          {SideNavData.map((item, index) => {
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
