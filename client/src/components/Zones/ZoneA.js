import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSlots, slotLoading } from "../../actions/slotActions";
import { addReservation } from "../../actions/reservationAction"
import { returnErrors, clearErrors, slotFail } from "../../actions/errorActions";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import Pagination from "./components/Pagination";
import { Container, Table } from "react-bootstrap";
import "./Zone.css";

const ZoneA = React.memo(() => {
  const dispatch = useDispatch();
  const slotRef = useRef();
  
  const [reservations, setReservations] = useState([])
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

  if(zoneSlots.length > 0) {
    
    const newSlots = zoneSlots.map((slot) => {
      const id = `${slot.slot_name}${dates[0]}${slot.zone}`
      const id1 = `${slot.slot_name}${dates[1]}${slot.zone}`
      const id2 = `${slot.slot_name}${dates[2]}${slot.zone}`
      const id3 = `${slot.slot_name}${dates[3]}${slot.zone}`
      const id4 = `${slot.slot_name}${dates[4]}${slot.zone}`
      const id5 = `${slot.slot_name}${dates[5]}${slot.zone}`
      const id6 = `${slot.slot_name}${dates[6]}${slot.zone}`
    

    return {
        ...slot,
        id:{
          id,
          reserved:false
        },
        id1:{
          id1,
          reserved:false
        },
        id2:{
          id2,
          reserved:false
        },
        id3:{
          id3,
          reserved:false
        },
        id4:{
          id4,
          reserved:false
        },
        id5:{
          id5,
          reserved:false
        },
        id6:{
          id6,
          reserved:false
        }
      }
    })

    let slotsInZoneA = newSlots.filter((slot) => {
        return slot.zone === "zone A"
    })

    changeState({...zoneSlots.slots,slots:slotsInZoneA})
  }


  function handleClick(data) {
    let arrayCopy = [...zoneSlots.slots];

    // if arrayCopy[index].toggled equals to true then toggled is *false* else toggled is *true*
    // arrayCopy[id].available
    //   ? (arrayCopy[id].toggled = false)
    //   : (arrayCopy[id].toggled = true);
    // changeState({ ...slots, reservations: arrayCopy }); 
       
    const newReservation = {
      reserved_date: data.reserved_date,
      reserved_slot:data.reserved_slot,
      slot_number:data.slot,
      zone:data.zone,
      cost:data.cost,
    };

    dispatch(addReservation(newReservation))
     .then(res => {
       console.log(res.data)
     }).catch(err => {
       console.log(err.response.data)
     })

    // console.log(newReservation)
   
  }

  
  
  
  function toggleActiveStyles(index){
      if(zoneSlots.slots[index].id.reserved){
          return "slot inactive"
        } else {
        return "slot active"
      }
    }
  
  function toggleActive1Styles(index){
    if(zoneSlots.slots[index].id1.reserved){
      return "slot inactive"
    } else {
    return "slot active"
  }
  }

  function toggleActive2Styles(index){
    if(zoneSlots.slots[index].id2.reserved){
      return "slot inactive"
    } else {
    return "slot active"
  }
  }

  function toggleActive3Styles(index){
    if(zoneSlots.slots[index].id3.reserved){
      return "slot inactive"
    } else {
    return "slot active"
  }
  }

  function toggleActive4Styles(index){
    if(zoneSlots.slots[index].id4.reserved){
      return "slot inactive"
    } else {
    return "slot active"
  }
  }

  function toggleActive5Styles(index){
    if(zoneSlots.slots[index].id5.reserved){
      return "slot inactive"
    } else {
    return "slot active"
  }
  }

  function toggleActive6Styles(index){
    if(zoneSlots.slots[index].id6.reserved){
      return "slot inactive"
    } else {
    return "slot active"
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
            {currentSlots && currentSlots.length > 0 ? ( currentSlots.map((slot, index) => {   
              
                let data = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id.id,
                  reserved_date:dates[0]
                } 
                
                let data1 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id1.id1,
                  reserved_date:dates[1]
                } 
                
                let data2 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id2.id2,
                  reserved_date:dates[2]
                } 
                
                let data3 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id3.id3,
                  reserved_date:dates[3]
                } 
                
                let data4 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id4.id4,
                  reserved_date:dates[4]
                } 
                
                let data5 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id5.id5,
                  reserved_date:dates[5]
                } 
                
                let data6 = {
                  slot:slot.slot_name,
                  zone:slot.zone,
                  cost:300,
                  reserved_slot:slot.id6.id6,
                  reserved_date:dates[6]
                } 


               return (
                <tr key={index}>
                  <td key={index} id="td-slots">{slot.slot_name}</td>
                  <td key={slot.id.id}  className={toggleActiveStyles(index)} onClick={() => handleClick(data)}></td>
                  <td key={slot.id1.id1} className={toggleActive1Styles(index)} onClick={() => handleClick(data1)}></td>
                  <td key={slot.id2.id2} className={toggleActive2Styles(index)} onClick={() => handleClick(data2)}></td>
                  <td key={slot.id3.id3} className={toggleActive3Styles(index)} onClick={() => handleClick(data3)}></td>
                  <td key={slot.id4.id4} className={toggleActive4Styles(index)} onClick={() => handleClick(data4)}></td>
                  <td key={slot.id5.id5} className={toggleActive5Styles(index)} onClick={() => handleClick(data5)}></td>
                  <td key={slot.id6.id6} className={toggleActive6Styles(index)} onClick={() => handleClick(data6)}></td>
                </tr>
            )})) : (

              <tr>
              <td colSpan={8} id="td-slots">No slots found</td>
          </tr>

            )

           }
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
