import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import { Container, Table } from "react-bootstrap";
import { reservation } from "../utils/UserFunctions";
import useButtonLoader from "../utils/useButtonLoader";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./MakeReservation.css";

toast.configure();
const MakeReservation = ({ history }) => {
  // const [reserveButtonElement, setButtonLoading] = useButtonLoader(
  //   "Make Reservation",
  //   "Loading"
  // );

  // const newReservation = {
  //   username: Value.username,
  //   phone_number: Value.phone_number,
  //   entry_date: entryDate.format("LLLL"),
  //   exit_date: exitDate.format("LLLL"),
  // };
  // //console.log(newReservation);

  // reservation(newReservation).then((response) => {
  //   console.log(response);
  //   if (response.access_denied) {
  //     history.push("/reservation");
  //     toast.error("Invalid username or phone number!", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //     });
  //   } else if (response.info) {
  //     history.push("/");
  //     toast.success("Parking slot successfully reserved!", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //     });
  //   } else {
  //     history.push("/reservation");
  //   }

  const Reservations = [
    {
      slot_name: "Slot-1",
      zone: "zone A",
      entry_date: "27/09/2020 12:30pm",
      exit_date: "27/09/2020 6:30pm",
      cost: "500",
    },
    {
      slot_name: "Slot-3",
      zone: "zone B",
      entry_date: "28/09/2020 12:30pm",
      exit_date: "28/09/2020 6:30pm",
      cost: "1500",
    },
    {
      slot_name: "Slot-7",
      zone: "zone A",
      entry_date: "29/09/2020 12:30pm",
      exit_date: "29/09/2020 6:30pm",
      cost: "750",
    },
    {
      slot_name: "Slot-6",
      zone: "zone C",
      entry_date: "30/09/2020 12:30pm",
      exit_date: "30/09/2020 6:30pm",
      cost: "400",
    },
    {
      slot_name: "Slot-8",
      zone: "zone B",
      entry_date: "01/10/2020 12:30pm",
      exit_date: "02/10/2020 6:30pm",
      cost: "800",
    },
  ];

  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translate(-800px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });

  return (
    <React.Fragment>
      <NavBar />
      <br />
      <animated.div className="container" id="border" style={props}>
        <p id="reservation">Reservation Details</p>
        <p style={{ color: "#2680eb" }}>Parking Zones</p>
      </animated.div>
      <br />
      <br />
      <Container>
        <Table responsive className="noWrap">
          <thead>
            <tr>
              <th>Slot Name</th>
              <th>Zone</th>
              <th>Entry Date</th>
              <th>Exit Date</th>
              <th>Cost</th>
              <th>Remove from Reservation</th>
            </tr>
          </thead>
          <tbody>
            {Reservations.map((reservation, index) => {
              return (
                <tr key={index}>
                  <td>{reservation.slot_name}</td>
                  <td>{reservation.zone}</td>
                  <td>{reservation.entry_date}</td>
                  <td>{reservation.exit_date}</td>
                  <td>{reservation.cost}</td>
                  <td>
                    <button className="btn btn-md btn-danger " type="submit">
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <p id="amount">
          Total amount: <i id="price">KES 2,500</i>
        </p>
        <div id="pay-btn">
          <button className="btn btn-md btn-primary" type="submit">
            Pay Reservation
          </button>
        </div>
      </Container>
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default MakeReservation;
