import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import useButtonLoader from "../utils/useButtonLoader";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import { zoneFunc } from "../utils/AdminFunctions";
import { Input } from "reactstrap";
import "./ZoneAdmin.css";

toast.configure();
const ZoneAdmin = ({ history }) => {
  const [Value, setValue] = useState({ capacity: "", slot: "", zone: "" });
  const [Errors] = useState({ capacity: "", slot: "", zone: "" });
  const [Validity] = useState({ capacity: false, slot: false, zone: false });

  const [zoneButtonElement, setButtonLoading] = useButtonLoader(
    "Submit",
    "Loading"
  );

  const handleChange = ({ target }) => {
    Value[target.name] = target.value;
    setValue({ ...Value, Value });
    handleValidation(target);
  };

  const handleValidation = (target) => {
    const { name, value } = target;
    const isCapacity = name === "capacity";
    const isSlot = name === "slot";
    const numberTest = /^[0-9]+$/;

    Validity[name] = value.length > 0;
    Errors[name] = Validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (Validity[name]) {
      if (Validity[name]) {
        if (isCapacity) {
          Validity[name] = numberTest.test(value);
          Errors[name] = Validity[name] ? "" : `${name} should be a number`;
        }
      }
      if (Validity[name]) {
        if (isSlot) {
          Validity[name] = numberTest.test(value);
          Errors[name] = Validity[name] ? "" : `${name} should be a number`;
        }
      }
    }
  };

  const clearState = () => {
    setValue({ capacity: "", slot: "", zone: "" });
  };

  const handleZoneSubmit = (event) => {
    event.preventDefault();

    if (Object.values(Validity).every(Boolean)) {
      setButtonLoading(true);

      const newZone = {
        capacity: Value.capacity,
        slot: Value.slot,
        zone: Value.zone,
      };

      zoneFunc(newZone).then((response) => {
        //console.log(response.info_exceed);

        if (response.info_exceed) {
          history.push("/zones/admin");
          toast.error("Number of slots cannot exceed capacity!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (response.info) {
          history.push("/");
          toast.success("Parking zone successfully created!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          history.push("/zones/admin");
        }

        setButtonLoading(false);
      });
      clearState();
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

  const handleZoneEdit = () => {};

  const handleZoneDelete = () => {};

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

      <animated.div className="container" id="border" style={props}>
        <h3 id="register">Manage Parking Zones </h3>
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
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <label htmlFor="capacity" style={{ paddingLeft: "10px" }}>
              Parking Capacity
            </label>
            <div className="input-group" id="input-color">
              <input
                name="capacity"
                className={`form-control ${
                  Errors.capacity ? "is-invalid" : ""
                }`}
                placeholder="e.g. 200"
                value={Value.capacity}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.capacity}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <label htmlFor="slot" style={{ paddingLeft: "10px" }}>
              No. of slots
            </label>
            <div className="input-group" id="input-color">
              <input
                name="slot"
                className={`form-control ${Errors.slot ? "is-invalid" : ""}`}
                placeholder="e.g. 50"
                value={Value.slot}
                onChange={handleChange}
              />
              <span className="invalid-feedback">{Errors.slot}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <label htmlFor="zone" style={{ paddingLeft: "10px" }}>
              Parking Area
            </label>
            <div className="input-group" id="input-color">
              <Input
                id="zone-input"
                name="zone"
                type="select"
                className={`form-control ${Errors.zone ? "is-invalid" : ""}`}
                value={Value.zone}
                onChange={handleChange}
              >
                <option>zone A</option>
                <option>zone B</option>
                <option>zone C</option>
              </Input>
              <span className="invalid-feedback">{Errors.zone}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container" id="search-btn">
        <div className="input-group-append">
          <button
            className="btn btn-md btn-primary m-0"
            onClick={handleZoneSubmit}
            ref={zoneButtonElement}
            type="button"
          >
            Submit
          </button>
          &nbsp;
          <button
            className="btn btn-md btn-primary m-0"
            onClick={handleZoneEdit}
            type="button"
          >
            Edit
          </button>
          &nbsp;
          <button
            className="btn btn-md btn-primary m-0"
            onClick={handleZoneDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(ZoneAdmin);
