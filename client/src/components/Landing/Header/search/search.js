import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSlots, slotLoading } from "../../../../actions/slotActions";
import { addReservation } from "../../../../actions/reservationAction";
import {
  returnErrors,
  clearErrors,
  slotFail,
} from "../../../../actions/errorActions";
import { Container, Table } from "react-bootstrap";
import "./search.css";

const Search = () => {
  const [searchSlots, changeState] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredSlots, setFilteredSlots] = useState([]);
  const dispatch = useDispatch();

  // Calculate the date range within a week displaying availability of slots

  const today = new Date();

  const date = new Date(today);
  let datesCollection = [];
  let dates = [];

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
    dates.push(
      `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    );
  }

  // useEffect(() => {
  //   dispatch(slotLoading());
  //   dispatch(getSlots())
  //     .then((res) => {
  //       changeState(res.payload.result);
  //       dispatch(clearErrors());
  //     })
  //     .catch((error) => {
  //       dispatch(
  //         returnErrors(error.response.data, error.response.status, "SLOT_FAIL")
  //       );
  //       dispatch(slotFail());
  //     });
  // }, []);

  // console.log(searchSlots)
  // useEffect(() => {
  //   setFilteredSlots(
  //     searchSlots.slots && searchSlots.slots.filter((slot,index) => {
  //       const ids = slot && Object.keys(slot)
  //       ids.some(id =>
  //         // console.log(slot[id].slot)
  //         // slot[id].key.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
  //         slot[id].slot.includes(query)
  //         )
  //       // console.log(ids)
  //       return slot
  //       // return slot.id.date.includes(query)
  //     })
  //   )
  // },[query, searchSlots.slots])

  // console.log(FilteredSlots);
  // if(typeof(searchSlots.slots) !== "undefined" && searchSlots.slots.length > 0){

  //   const filteredSlots = searchSlots.slots.filter(slot => {
  //     // console.log(slot.id.date)
  //     // return slot.id.date.includes(query)
  //     return slot.slot_name.includes(query)
  //   })
  //   console.log(filteredSlots)
  // }

  return (
    <>
      <Container>
        <div className="container" id="mobile-view">
          <div className="col-sm-12 col-md-12" id="available-parking">
            <span>16 Available Parking Spaces</span>
          </div>
          <div className="col-sm-12 col-md-12" id="date-parking">
            <span>Friday, 28 March 2020</span>
          </div>
        </div>
        <Table responsive className="noWrap">
          <tbody>
            <tr>
              <th id="grey-color">Zone A</th>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
              <td id="below-btn">slot 13</td>
            </tr>
            <tr>
              <th id="grey-color">Zone B</th>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
            </tr>
            <tr>
              <th id="grey-color">Zone C</th>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
              <td id="below-btn"></td>
            </tr>
          </tbody>
        </Table>
        <br />
      </Container>
    </>
  );
};

export default Search;
