import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import { reservation } from "../utils/UserFunctions";
import useButtonLoader from "../utils/useButtonLoader";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./MakeReservation.css";

toast.configure();
const MakeReservation = ({ history }) => {
  const [reserveButtonElement, setButtonLoading] = useButtonLoader(
    "Make Reservation",
    "Loading"
  );

  const [Value, setValue] = useState({
    username: "",
    phone_number: "",
  });
  const [Errors] = useState({
    username: "",
    phone_number: "",
  });
  const [Validity] = useState({
    username: false,
    phone_number: false,
  });

  const [entryDate, setEntryDate] = useState(moment());
  const [exitDate, setExitDate] = useState(moment());

  const dateEntryOnChange = (date) => setEntryDate(date);
  const dateExitOnChange = (date) => setExitDate(date);

  const yesterday = moment().subtract(1, "day");
  const threeDaysLater = moment().add(3, "day");

  const valid = function (current) {
    return current.isAfter(yesterday) && current.isBefore(threeDaysLater);
  };

  const isValid = function (current) {
    return current.isBefore(threeDaysLater) && current.isAfter(yesterday);
  };

  const handleChange = ({ target }) => {
    Value[target.name] = target.value;
    setValue({ ...Value, Value });
    handleValidation(target);
  };

  const handleValidation = (target) => {
    const { name, value } = target;
    const isPhone = name === "phone_number";
    const numberTest = /^[0-9]+$/;

    Validity[name] = value.length > 0;
    Errors[name] = Validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (Validity[name]) {
      if (isPhone) {
        Validity[name] = numberTest.test(value);
        Errors[name] = Validity[name] ? "" : `${name} should be a number`;
      }
    }
  };

  const handleReserveSubmit = (event) => {
    event.preventDefault();

    if (Object.values(Validity).every(Boolean)) {
      setButtonLoading(true);

      const newReservation = {
        username: Value.username,
        phone_number: Value.phone_number,
        entry_date: entryDate.format("LLLL"),
        exit_date: exitDate.format("LLLL"),
      };
      //console.log(newReservation);

      reservation(newReservation).then((response) => {
        console.log(response);
        if (response.access_denied) {
          history.push("/reservation");
          toast.error("Invalid username or phone number!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (response.info) {
          history.push("/");
          toast.success("Parking slot successfully reserved!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          history.push("/reservation");
        }

        setButtonLoading(false);
      });
    } else {
      for (let key in Value) {
        let target = {
          name: key,
          value: Value[key],
        };
        handleValidation(target);
      }
    }
  };

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
        <p style={{ color: "#2680eb" }}>Parking Zone A</p>
      </animated.div>
      <br />
      <br />

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="datetime">
              <label htmlFor="entry_date" style={{ paddingLeft: "15px" }}>
                Entry date & time
              </label>
              <DatePicker
                isValidDate={valid}
                inputProps={{
                  placeholder: "Entry date & time",
                  name: "entry_date",
                  required: true,
                }}
                dateFormat="DD-MM-YYYY"
                timeFormat="hh:mm A"
                value={entryDate}
                onChange={dateEntryOnChange}
              />
            </div>
          </div>
          &nbsp;
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="datetime">
              <label htmlFor="exit_date" style={{ paddingLeft: "15px" }}>
                Exit date & time
              </label>
              <DatePicker
                isValidDate={isValid}
                inputProps={{
                  placeholder: "Exit date & time",
                  name: "exit_date",
                  required: true,
                }}
                dateFormat="DD-MM-YYYY"
                timeFormat="hh:mm A"
                value={exitDate}
                onChange={dateExitOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                name="username"
                type="text"
                className={`form-control ${
                  Errors.username ? "is-invalid" : ""
                }`}
                placeholder="username"
                value={Value.username}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.username}</span>
            </div>
          </div>
          &nbsp;
          <div className="col-sm-12 col-md-3">
            <div className="input-group" id="input-color">
              <input
                name="phone_number"
                className={`form-control ${
                  Errors.phone_number ? "is-invalid" : ""
                }`}
                placeholder="Phone no."
                value={Value.phone_number}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.phone_number}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div
          className="btn btn-md btn-primary m-0 px-3"
          ref={reserveButtonElement}
          onClick={handleReserveSubmit}
          type="button"
        >
          Make Reservation
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default MakeReservation;
