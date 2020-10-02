import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import { Container, Table, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./Zone.css";

const ZoneA = () => {
  const [show, setShow] = useState(false);
  const [available, setAvailable] = useState(true);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translate(-800px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });

  const attendence = [
    {
      slot_name: "slot-1",
      available: "available",
    },
    {
      slot_name: "slot-2",
      available: "unavailable",
    },
    {
      slot_name: "slot-3",
      available: "available",
    },
    {
      slot_name: "slot-4",
      available: "unavailable",
    },
    {
      slot_name: "slot-5",
      available: "available",
    },
  ];

  // Calculate the date range within a week displaying availability of slots

  const today = new Date();

  const date = new Date(today);
  let datesCollection = [];

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][new Date().getMonth()];

  const newDate = new Date();

  for (let i = 0; i < 7; i++) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);

    const nth = function (d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    datesCollection.push(
      `${days[newDate.getDay()]} - ${newDate.getDate()}${nth(
        newDate.getDate()
      )}`
    );
  }

  return (
    <Fragment>
      <NavBar />
      <animated.div className="container" id="border" style={props}>
        <h3 id="register">Parking Zone A</h3>
        <p style={{ color: "#2680eb" }}>Parking Spaces</p>
      </animated.div>
      <div className="container mb-3">
        <p className="col-md-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          est ipsam, tempora ipsum eaque architecto beatae aut id, veritatis
          quia alias magnam assumenda nisi eum. Commodi repellat iusto aliquid
          sapiente!
        </p>
      </div>
      <br />
      <br />
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter exit date & time</Modal.Title>
        </Modal.Header>
        <Modal.Body>Render selected Slots, dynamically</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">Confirm Date</Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <div id="date">
          <span>
            {`${weekday}, ${newDate.getDate()} ${month} ${newDate.getFullYear()}`}
          </span>
        </div>
        <Table responsive className="noWrap">
          <thead>
            <tr>
              <th>Slots</th>
              {datesCollection.map((date, index) => {
                return <th key={index}>{date}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {attendence.map((slot, index) => {
              return (
                <tr key={index}>
                  <td>{slot.slot_name}</td>
                  <td id={available ? "available" : "unavailable"}></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-8" style={{ width: "auto" }}>
              <div className="row">
                <div id="btn-search">
                  <button className="btn btn-md btn-primary m-0 px-3">
                    Available
                  </button>
                </div>
                &nbsp;
                <div id="search-btn1">
                  <button className="btn btn-md btn-primary m-0 px-3">
                    Unavailable
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-1 " style={{ width: "auto" }}></div>

            <div className="col-md-3 " style={{ width: "auto" }}>
              <div className="row">
                <div>
                  <button
                    onClick={handleShowModal}
                    className="btn btn-md btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <br />
      <br />
      <Footer />
    </Fragment>
  );
};

export default ZoneA;
