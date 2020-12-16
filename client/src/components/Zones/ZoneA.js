import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSlots, slotLoading } from "../../actions/slotActions";
import { getSlotDays, slotDaysLoading } from "../../actions/slotDaysActions";
import {
  addReservation,
  deleteReservation,
  getReservations,
  reservationLoading,
} from "../../actions/reservationAction";
import {
  returnErrors,
  clearErrors,
  slotFail,
  slotDaysFail,
  reservationFail,
} from "../../actions/errorActions";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import Pagination from "./components/Pagination";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Zone.css";

toast.configure();
const ZoneA = React.memo(() => {
  const dispatch = useDispatch();
  const slotRef = useRef();

  const [Reservations, setReservations] = useState([]);
  const [zoneSlots, changeState] = useState({
    slots: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(5);

  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translate(-800px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });

  useEffect(() => {
    const data = localStorage.getItem("toggled-state");

    if (data) {
      changeState({ ...zoneSlots.slots, slots: JSON.parse(data) });
    } else {
      dispatch(slotLoading());
      dispatch(getSlots())
        .then((res) => {
          changeState(res.payload.result);
          dispatch(clearErrors());
        })
        .catch((error) => {
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              "SLOT_FAIL"
            )
          );
          dispatch(slotFail());
        });
    }
  }, []);

  if (zoneSlots.length > 0) {
    let slotsInZoneA = zoneSlots.filter((slot) => {
      return slot.zone === "zone A";
    });
    changeState({ ...zoneSlots.slots, slots: slotsInZoneA });
  }

  // Persist toggled state in localStorage on page refresh
  useEffect(() => {
    localStorage.setItem("toggled-state", JSON.stringify(zoneSlots.slots));
  });

  // Filter slots of zone A
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots =
    zoneSlots.slots && zoneSlots.slots.slice(indexOfFirstSlot, indexOfLastSlot);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    );
  }

  let cartReservations = useSelector((state) => state.reservation.reservations);
  function handleClick(data) {
    // Check if slot is already reserved
    let alreadyReserved = false;
    if (data.reserved === true) {
      alreadyReserved = true;
      toast.info("Slot already reserved!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    // Check if slot already exists in cartReservations
    let alreadyExists = false;
    cartReservations.forEach((reservation) => {
      if (reservation.slot_id === data.slot_id) {
        alreadyExists = true;

        const newReservation = {
          cost: data.cost,
          date: data.date,
          reserved: data.reserved,
          slot_id: data.slot_id,
          slot_name: data.slot_name,
          zone: data.zone,
        };

        dispatch(deleteReservation(newReservation));
        toast.error("Slot removed from cart!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    });

    // Add slot in cartReservations if not alreadyExits and not alreadyReserved
    if (!alreadyExists && !alreadyReserved) {
      const newReservation = {
        cost: data.cost,
        date: data.date,
        reserved: data.reserved,
        slot_id: data.slot_id,
        slot_name: data.slot_name,
        zone: data.zone,
      };

      dispatch(addReservation(newReservation));
      toast.success("Slot added to cart!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }

  // Function to toggle color by changing state
  function toggleActive(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id.id === id ||
        slot.slot_details.slot_id.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: !slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive1(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id1.id === id ||
        slot.slot_details.slot_id1.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: !slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive2(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id2.id === id ||
        slot.slot_details.slot_id2.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: !slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive3(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id3.id === id ||
        slot.slot_details.slot_id3.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: !slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive4(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id4.id === id ||
        slot.slot_details.slot_id4.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: !slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive5(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id5.id === id ||
        slot.slot_details.slot_id5.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: !slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  function toggleActive6(id) {
    let arrayCopy = [...zoneSlots.slots];
    const current = arrayCopy.map((slot) => {
      if (
        slot.slot_details.slot_id6.id === id ||
        slot.slot_details.slot_id6.reserved === "false"
      ) {
        return {
          id: slot.id,
          slot_details: {
            slot_id: {
              cost: slot.slot_details.slot_id.cost,
              date: slot.slot_details.slot_id.date,
              id: slot.slot_details.slot_id.id,
              reserved: slot.slot_details.slot_id.reserved,
              toggled: slot.slot_details.slot_id.toggled,
            },
            slot_id1: {
              cost: slot.slot_details.slot_id1.cost,
              date: slot.slot_details.slot_id1.date,
              id: slot.slot_details.slot_id1.id,
              reserved: slot.slot_details.slot_id1.reserved,
              toggled: slot.slot_details.slot_id1.toggled,
            },
            slot_id2: {
              cost: slot.slot_details.slot_id2.cost,
              date: slot.slot_details.slot_id2.date,
              id: slot.slot_details.slot_id2.id,
              reserved: slot.slot_details.slot_id2.reserved,
              toggled: slot.slot_details.slot_id2.toggled,
            },
            slot_id3: {
              cost: slot.slot_details.slot_id3.cost,
              date: slot.slot_details.slot_id3.date,
              id: slot.slot_details.slot_id3.id,
              reserved: slot.slot_details.slot_id3.reserved,
              toggled: slot.slot_details.slot_id3.toggled,
            },
            slot_id4: {
              cost: slot.slot_details.slot_id4.cost,
              date: slot.slot_details.slot_id4.date,
              id: slot.slot_details.slot_id4.id,
              reserved: slot.slot_details.slot_id4.reserved,
              toggled: slot.slot_details.slot_id4.toggled,
            },
            slot_id5: {
              cost: slot.slot_details.slot_id5.cost,
              date: slot.slot_details.slot_id5.date,
              id: slot.slot_details.slot_id5.id,
              reserved: slot.slot_details.slot_id5.reserved,
              toggled: slot.slot_details.slot_id5.toggled,
            },
            slot_id6: {
              cost: slot.slot_details.slot_id6.cost,
              date: slot.slot_details.slot_id6.date,
              id: slot.slot_details.slot_id6.id,
              reserved: slot.slot_details.slot_id6.reserved,
              toggled: !slot.slot_details.slot_id6.toggled,
            },
          },
          slot_name: slot.slot_name,
          zone: slot.zone,
        };
      } else {
        return slot;
      }
    });
    changeState({ arrayCopy, slots: current });
  }

  // Function to change color of the respective slots both on toggle and on reserve

  function toggleActiveStyles(slot) {
    if (slot.slot_details.slot_id.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive1Styles(slot) {
    if (slot.slot_details.slot_id1.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id1.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive2Styles(slot) {
    if (slot.slot_details.slot_id2.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id2.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive3Styles(slot) {
    if (slot.slot_details.slot_id3.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id3.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive4Styles(slot) {
    if (slot.slot_details.slot_id4.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id4.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive5Styles(slot) {
    if (slot.slot_details.slot_id5.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id5.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  function toggleActive6Styles(slot) {
    if (slot.slot_details.slot_id6.reserved) {
      return "slot inactive";
    } else if (slot.slot_details.slot_id6.toggled) {
      return "slot exists";
    } else {
      return "slot active";
    }
  }

  // function handleClick(item) {
  //   const newReservations = fruits.map((fruit) => {
  //     if (fruit.id === item.id) {
  //       return {
  //         id: fruit.id,
  //         name: fruit.name,
  //         isFavorite: !fruit.isFavorite,
  //       };
  //     } else {
  //       return fruit;
  //     }
  //   });

  //   setReservations(newReservations);
  // }

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
      <Container>
        <div id="date">
          <span style={{ cursor: "default" }}>
            {`${weekday}, ${newDate.getDate()} ${month}, ${newDate.getFullYear()}`}
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
            {currentSlots && currentSlots.length > 0 ? (
              currentSlots.map((slot, index) => {
                let data = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id.id,
                  cost: slot.slot_details.slot_id.cost,
                  reserved: slot.slot_details.slot_id.reserved,
                  toggled: slot.slot_details.slot_id.toggled,
                  date: slot.slot_details.slot_id.date,
                };

                let data1 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id1.id,
                  cost: slot.slot_details.slot_id1.cost,
                  reserved: slot.slot_details.slot_id1.reserved,
                  toggled: slot.slot_details.slot_id1.toggled,
                  date: slot.slot_details.slot_id1.date,
                };

                let data2 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id2.id,
                  cost: slot.slot_details.slot_id2.cost,
                  reserved: slot.slot_details.slot_id2.reserved,
                  toggled: slot.slot_details.slot_id2.toggled,
                  date: slot.slot_details.slot_id2.date,
                };

                let data3 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id3.id,
                  cost: slot.slot_details.slot_id3.cost,
                  reserved: slot.slot_details.slot_id3.reserved,
                  toggled: slot.slot_details.slot_id3.toggled,
                  date: slot.slot_details.slot_id3.date,
                };

                let data4 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id4.id,
                  cost: slot.slot_details.slot_id4.cost,
                  reserved: slot.slot_details.slot_id4.reserved,
                  toggled: slot.slot_details.slot_id4.toggled,
                  date: slot.slot_details.slot_id4.date,
                };

                let data5 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id5.id,
                  cost: slot.slot_details.slot_id5.cost,
                  reserved: slot.slot_details.slot_id5.reserved,
                  toggled: slot.slot_details.slot_id5.toggled,
                  date: slot.slot_details.slot_id5.date,
                };

                let data6 = {
                  slot_name: slot.slot_name,
                  zone: slot.zone,
                  slot_id: slot.slot_details.slot_id6.id,
                  cost: slot.slot_details.slot_id6.cost,
                  reserved: slot.slot_details.slot_id6.reserved,
                  toggled: slot.slot_details.slot_id6.toggled,
                  date: slot.slot_details.slot_id6.date,
                };

                return (
                  <tr key={index}>
                    <td key={index} id="td-slots">
                      {slot.slot_name}
                    </td>
                    <td
                      key={slot.slot_details.slot_id.id}
                      onClick={() => {
                        toggleActive(slot.slot_details.slot_id.id);
                        handleClick(data);
                      }}
                      className={toggleActiveStyles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id1.id}
                      onClick={() => {
                        toggleActive1(slot.slot_details.slot_id1.id);
                        handleClick(data1);
                      }}
                      className={toggleActive1Styles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id2.id}
                      onClick={() => {
                        toggleActive2(slot.slot_details.slot_id2.id);
                        handleClick(data2);
                      }}
                      className={toggleActive2Styles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id3.id}
                      onClick={() => {
                        toggleActive3(slot.slot_details.slot_id3.id);
                        handleClick(data3);
                      }}
                      className={toggleActive3Styles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id4.id}
                      onClick={() => {
                        toggleActive4(slot.slot_details.slot_id4.id);
                        handleClick(data4);
                      }}
                      className={toggleActive4Styles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id5.id}
                      onClick={() => {
                        toggleActive5(slot.slot_details.slot_id5.id);
                        handleClick(data5);
                      }}
                      className={toggleActive5Styles(slot)}
                    ></td>
                    <td
                      key={slot.slot_details.slot_id6.id}
                      onClick={() => {
                        toggleActive6(slot.slot_details.slot_id6.id);
                        handleClick(data6);
                      }}
                      className={toggleActive6Styles(slot)}
                    ></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} id="td-slots">
                  No slots found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <br />
        <Pagination
          slotsPerPage={slotsPerPage}
          totalSlots={zoneSlots.slots && zoneSlots.slots.length}
          paginate={paginate}
        />
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
          </div>
        </div>
        <br />
        <div id="pay-btn">
          <Link className="btn btn-md btn-primary" to="/reservation">
            Reservations
          </Link>
        </div>
      </Container>
      <br />
      <Footer />
    </Fragment>
  );
});

export default ZoneA;
