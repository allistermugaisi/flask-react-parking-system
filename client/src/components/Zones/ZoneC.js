import React, { useState, useEffect, Fragment,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSlots, slotLoading } from "../../actions/slotActions";
import { returnErrors, clearErrors, slotFail } from "../../actions/errorActions";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import Pagination from "./components/Pagination";
import { Container, Table } from "react-bootstrap";
import "./Zone.css";

const ZoneA = () => {
  const dispatch = useDispatch();
  const slotRef = useRef();
  
  const [reservations, setReservations] = useState([]);
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
  
  if(zoneSlots.length > 0) {
    let slotsInZoneC = zoneSlots.filter((slot) => {
      return slot.zone === "zone C"
    })
    changeState({...zoneSlots,slots:slotsInZoneC})
  }

  
  useEffect(() => {
    dispatch(slotLoading())
    dispatch(getSlots())
    .then(res => {
      changeState(res.payload.result)
      dispatch(clearErrors());
    }).catch(error => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "SLOT_FAIL"
        )
      );
      dispatch(slotFail());
    })
  }, [])

  // Get current slots
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = zoneSlots.slots && zoneSlots.slots.slice(indexOfFirstSlot, indexOfLastSlot);
  
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
    dates.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
  }

  function toggleActive(id) {
    // let arrayCopy = [...slots.reservations];

    // if arrayCopy[index].toggled equals to true then toggled is *false* else toggled is *true*
    // arrayCopy[id].available
    //   ? (arrayCopy[id].toggled = false)
    //   : (arrayCopy[id].toggled = true);
    // changeState({ ...slots, reservations: arrayCopy });

    // if(id){
    //   return "slot active"
    // }else{
    //   return "slot inactive"
    // }
    console.log(id)  
   
  }
 
  function toggleActiveStyles(id){
    // if(slotState.objects[id] === slotState.activeObject){
    //   return "slot active"
    // } else {
    //   return "slot inactive"
    // }
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
        <h3 id="register">Parking Zone C</h3>
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
          <span style={{cursor:"default"}}>
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
                        
            {currentSlots && currentSlots.map((slot, index) => {    

              const id = `${slot.slot_name}${dates[0]}${slot.zone}`
              const id1 = `${slot.slot_name}${dates[1]}${slot.zone}`
              const id2 = `${slot.slot_name}${dates[2]}${slot.zone}`
              const id3 = `${slot.slot_name}${dates[3]}${slot.zone}`
              const id4 = `${slot.slot_name}${dates[4]}${slot.zone}`
              const id5 = `${slot.slot_name}${dates[5]}${slot.zone}`
              const id6 = `${slot.slot_name}${dates[6]}${slot.zone}`
             
              return (
                <tr key={index}>
                  <td key={index} id="td-slots">{slot.slot_name}</td>
                  <td key={id}  className={toggleActiveStyles(id)} onClick={() => toggleActive(id)}></td>
                  <td key={id1} className={toggleActiveStyles(id)} onClick={() => toggleActive(id1)}></td>
                  <td key={id2} className={toggleActiveStyles(id)} onClick={() => toggleActive(id2)}></td>
                  <td key={id3} className={toggleActiveStyles(id)} onClick={() => toggleActive(id3)}></td>
                  <td key={id4} className={toggleActiveStyles(id)} onClick={() => toggleActive(id4)}></td>
                  <td key={id5} className={toggleActiveStyles(id)} onClick={() => toggleActive(id5)}></td>
                  <td key={id6} className={toggleActiveStyles(id)} onClick={() => toggleActive(id6)}></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br/>
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
      </Container>
      <br />
      <Footer />
    </Fragment>
  );
};

export default ZoneA;
