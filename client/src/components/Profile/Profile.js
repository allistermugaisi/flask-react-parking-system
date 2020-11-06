// import React, { useState, useEffect } from "react";
// import { Link, withRouter } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styled from "styled-components";
// import styles from "./Profile.module.css";
// import logo from "../assets/logo.png";

// // import {
// //   Container,
// //   Nav,
// //   Navbar,
// //   NavbarBrand,
// //   NavbarToggler,
// //   Collapse,
// //   NavItem,
// // } from "reactstrap";

// toast.configure();

// const Profile = (props) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone_number, setPhone_number] = useState("");

//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     try {
//       const token = localStorage.usertoken;
//       const decoded = jwt_decode(token);

//       setUsername(decoded.identity.username);
//       setEmail(decoded.identity.email);
//       setPhone_number(decoded.identity.phone_number);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   const logOut = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("usertoken");
//     toast.info("Successfully logged out!", {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 3000,
//     });
//     props.history.push("/login");
//   };

//   const userLink = (
//     <Nav className="ml-auto" navbar>
//       <NavItem>
//         <Link className={styles.link} to="#" onClick={logOut}>
//           LogOut
//         </Link>
//       </NavItem>
//     </Nav>
//   );

//   return (
//     <React.Fragment>
//       <Navbar
//         expand="sm"
//         className="mb-5 "
//         style={{ backgroundColor: "#000000" }}
//       >
//         <Container>
//           <img src={logo} alt="logo" className={styles.logo} />
//           <NavbarBrand className={styles.brand} href="/">
//             RESERVATION
//           </NavbarBrand>
//           <NavbarToggler className={styles.navbarToggler} onClick={toggle} />
//           <Collapse isOpen={isOpen} navbar className={styles.collapse}>
//             <Nav className="ml-auto " navbar style={{ paddingRight: "30px" }}>
//               <NavItem>
//                 <Link className={styles.link} to="/">
//                   Home
//                 </Link>
//               </NavItem>
//               <NavItem>
//                 <Link className={styles.link} to="#">
//                   Zones
//                 </Link>
//               </NavItem>
//               <NavItem>
//                 <Link className={styles.link} to="#">
//                   About
//                 </Link>
//               </NavItem>
//             </Nav>
//             {localStorage.usertoken ? (
//               userLink
//             ) : (
//               <Nav className="ml-auto" navbar>
//                 <NavItem>
//                   <Link className={styles.link} to="/login">
//                     Login
//                   </Link>
//                 </NavItem>
//                 <NavItem>
//                   <Link className={styles.link} to="/register">
//                     Register
//                   </Link>
//                 </NavItem>
//               </Nav>
//             )}
//           </Collapse>
//         </Container>
//       </Navbar>
//       <div className="container">
//         <div className="jumbotron mt-5">
//           <div className="col-sm-8 mx-auto">
//             <h1 className="text-center">PROFILE</h1>
//           </div>
//           <table className="table col-md-6 mx-auto">
//             <tbody>
//               <tr>
//                 <td>Username</td>
//                 <td>{username}</td>
//               </tr>
//               <tr>
//                 <td>Email</td>
//                 <td>{email}</td>
//               </tr>
//               <tr>
//                 <td>Phone number</td>
//                 <td>{phone_number}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default withRouter(Profile);
