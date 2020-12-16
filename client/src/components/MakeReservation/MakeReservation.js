import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import { Container, Table } from "react-bootstrap";
import { deleteReservation } from "../../actions/reservationAction";
import {
  returnErrors,
  clearErrors,
  reservationFail,
} from "../../actions/errorActions";
import useButtonLoader from "../utils/useButtonLoader";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./MakeReservation.css";

toast.configure();
const MakeReservation = ({ history }) => {
  const dispatch = useDispatch();

  let Reservations = useSelector((state) => state.reservation.reservations);

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

  // useEffect(() => {
  //   dispatch(reservationLoading())
  //   dispatch(getReservations())
  //   .then(res => {
  //     setReservations(res.payload.result)
  //     dispatch(clearErrors());
  //   }).catch(error => {
  //     dispatch(
  //       returnErrors(
  //         error.response.data,
  //         error.response.status,
  //         "RESERVATION_FAIL"
  //       )
  //     );
  //     dispatch(reservationFail());
  //   })

  // },[])

  // const makePayment = () => {
  //   FlutterwaveCheckout({
  //     public_key: "FLWPUBK_TEST-dd1a7775d3c151e60e9557778af1aee3-X",
  //     tx_ref: "hooli-tx-1920bbtyt",
  //     amount: 54600,
  //     currency: "KES",
  //     country: "KE",
  //     payment_options: "card, mpesa",
  //     // specified redirect URL
  //     redirect_url: "http://localhost:3000/reservation",
  //     meta: {
  //       consumer_id: 23,
  //       consumer_mac: "92a3-912ba-1192a",
  //     },
  //     customer: {
  //       email: "user@gmail.com",
  //       phone_number: "08102909304",
  //       name: "yemi desola",
  //     },
  //     callback: function (data) {
  //       console.log(data);
  //     },
  //     onclose: function () {
  //       // close modal
  //     },
  //     customizations: {
  //       title: "My store",
  //       description: "Payment for items in cart",
  //       logo: "https://assets.piedpiper.com/logo.png",
  //     },
  //   });
  // };

  function handleDelete(slot) {
    dispatch(deleteReservation(slot));
    toast.error("Slot removed from cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }

  const noAmount = `0.00`;

  const totalCost =
    Reservations && Reservations.length > 0
      ? Reservations.map((reservation) => reservation.cost)
          .reduce((acc, amount) => (acc += amount), 0)
          .toFixed(2)
      : noAmount;

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
              <th>Reserved Date</th>
              <th>Cost</th>
              <th>Remove from Reservation</th>
            </tr>
          </thead>
          <tbody>
            {Reservations && Reservations.length > 0 ? (
              Reservations.map((reservation, index) => {
                return (
                  <tr key={index}>
                    <td id="td-slots">{reservation.slot_name}</td>
                    <td id="td-slots">{reservation.zone}</td>
                    <td id="td-slots">{reservation.date}</td>
                    <td id="td-slots">{reservation.cost}</td>
                    <td id="td-slots">
                      <button
                        className="btn btn-md btn-danger "
                        type="submit"
                        onClick={() => handleDelete(reservation)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} id="td-slots">
                  Reservation is empty
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <br />
        <p id="amount">
          Total amount: <i id="price">Kes {totalCost}</i>
        </p>
        <div id="pay-btn">
          <Link className="btn btn-md btn-primary" to="/payment">
            Pay Now
          </Link>
        </div>
      </Container>
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default MakeReservation;
