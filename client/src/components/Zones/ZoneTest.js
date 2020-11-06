import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import blueP from "../assets/blueP.png";
import redP from "../assets/redP.png";
import io from "socket.io-client";
import "./Zone.css";
// import MakeReservation from "../MakeReservation/MakeReservation";

const ZoneA = ({ history }) => {
  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translate(-800px,0)",
    },

    opacity: 1,
    transform: "translate(40px,0)",
  });

  const [numOfSlot, setNumOfSlot] = useState({});
  // const [loading, setLoading] = useState(false);
  const available = require("../assets/blueP.png");
  const unavailable = require("../assets/redP.png");
  const parkingImages = { available, unavailable };
  const [slotState, changeState] = useState({
    slots: [],
  });

  useEffect(() => {
    // setLoading(true);
    fetch("/zones/admin").then((response) =>
      response.json().then((data) => {
        setNumOfSlot(data.zones.slot);
        // setLoading(false);
      })
    );

    /*
  === The idea is to create an array of data based on the selection made by an admin 
  regarding the number of slots of each zones.

  === range function === creates an array of ids of each slots */
    const range = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );

    // Holds an array of ids of each slots
    // numOfSlot refers to the actual number of slots selected by an admin
    let slotsID = range(1, numOfSlot, 1);

    // === inserts properties {slot_no, image, id} to an array created by the range function
    const slots = slotsID.map((obj, i) => ({
      ...obj,
      slot_no: i + 1,
      image: parkingImages.available,
      id: i + 1,
      toggled: false,
    }));
    // Should not ever set state during rendering, so do this in useEffect instead. N/B: Reason why render is in useEffect
    // I think this may be an acceptable time to use // === eslint-disable-line ===
    // Do not put slotState in the dependency array. It will create an infinite loop which will slow down the application...
    changeState(() => {
      return { ...slotState, slots };
    });

    // numOfSlot is a key dependency, and should not be removed in the dependency array
  }, [numOfSlot, parkingImages.available]);

  // === toggleActive() === toggles the active image by id, selected by the user
  function toggleActive(index) {
    // history.push("/reservation");
    let arrayCopy = [...slotState.slots];

    const countDownDate = new Date("September 4, 2020 00:00:00").getTime();

    const now = new Date().getTime();

    // duration === (Reservation time) === to reserve a parking slot
    const reservationTime = countDownDate - now;
    console.log(reservationTime);

    // if arrayCopy[index].toggled equals to true then toggled is *false* else toggled is *true*
    arrayCopy[index].toggled
      ? (arrayCopy[index].toggled = false)
      : (arrayCopy[index].toggled = true);
    changeState({ ...slotState, slots: arrayCopy });
  }

  // setTimeout(() => {
  //   this.setState({name2:"rizqi"});
  // },30000)

  // mimic componentDidMount()
  // useEffect(() => {
  //   startTimer();
  // }, [TimerDays, TimerHours, TimerMinutes, TimerSeconds]);

  function toggleActiveImage(index) {
    if (slotState.slots[index].toggled) {
      // === parkingImages.unavailable === is a red image(Indicating the slot is assigned)
      return parkingImages.unavailable;
    } else {
      // === parkingImages.unavailable === is a blue image(Indicating the slot is not assigned)

      return parkingImages.available;
    }
  }

  const socket = io.connect("http://127.0.0.1:5000", {
  transports: ["websocket"],
  rejectUnauthorized: false,
  secure: true,
});

  // function disableActiveImage(index){
  //   if(slotState.slots[index].toggled){

  //   }
  // }

  // const makeReservation = (id) => {
  //   // history.push("/reservation");

  //   setSelected(parkingImages.unavailable);
  // };

  // if (loading) {
  //   return <p>Loading slots...</p>;
  // }

  // const renderLoading = () => {
  //   return <p style={{ justifyContent: "center" }}>Loading slots...</p>;
  // };

  const renderSlots = slotState.slots.map((slot, index) => {
    return (
      <div className="col-md-1" style={{ width: "auto" }} key={index}>
        <img
          key={index}
          src={toggleActiveImage(index)}
          style={{ width: "3rem", cursor: "pointer" }}
          alt="parking"
          onClick={() => toggleActive(index)}
        />
        <p style={{ fontSize: ".8rem", fontWeight: "500" }}>
          slot-{slot.slot_no}
        </p>
      </div>
    );
  });

  return (
    <React.Fragment>
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
      <div className="container mt-2">
        <div id="date">
          <span>Friday, 28 March 2020</span>
        </div>
        <br />
        <div className="row">{renderSlots}</div>
      </div>
      <br />

      <div className="container">
        <div className="row">
          <div className="col-md-8" style={{ width: "auto" }}>
            <div className="row">
              <div className="input-group-append" id="btn-search">
                <button className="btn btn-md btn-primary m-0 px-3">
                  Available
                  <img
                    src={blueP}
                    style={{
                      marginTop: "-0.2em",
                      paddingLeft: ".3em",
                      paddingBottom: ".1em",
                      width: "1rem",
                      height: "1rem",
                    }}
                    alt="parking"
                  />
                </button>
              </div>
              &nbsp;
              <div className="input-group-append" id="search-btn1">
                <button className="btn btn-md btn-primary m-0 px-3">
                  Unavailable
                  <img
                    src={redP}
                    style={{
                      marginTop: "-0.2em",
                      paddingLeft: ".3em",
                      paddingBottom: ".1em",
                      width: "1rem",
                      height: "1rem",
                    }}
                    alt="parking"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-1 " style={{ width: "auto" }}></div>

          <div className="col-md-3 " style={{ width: "auto" }}>
            <div className="row">
              <Link to="#" className="transparent btn-small" id="previous-text">
                Previous
              </Link>
              <Link to="#" className="transparent btn-small" id="next-text">
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(ZoneA);
