import React from "react";
import {useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import useButtonLoader from "../utils/useButtonLoader";
import { useForm } from "react-hook-form";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addSlot, slotLoading} from "../../actions/slotActions"
import { returnErrors, clearErrors, slotFail } from "../../actions/errorActions";
import NavBar from "../RegisterPage/NavBar/NavBar";
import Footer from "../RegisterPage/Footer/Footer";
import "./ZoneAdmin.css";

toast.configure();
const ZoneAdmin = ({ history }) => {
  const dispatch = useDispatch();
  
  const [zoneButtonElement, setButtonLoading] = useButtonLoader(
    "Submit",
    "Loading"
  );

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setButtonLoading(true);
    
    // Create slot object
    const newSlot = {
      slot_name: data.slot_name,
      zone:data.zone
    };
    
    dispatch(slotLoading())
    // Attempt to create slot
    dispatch(addSlot(newSlot))
      .then((response) => {
        setButtonLoading(false);
        if (response.payload.message) {
          history.push("/zones/admin");
          toast.success("Slot created!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          e.target.reset();
          dispatch(clearErrors());
        }
       
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

        if (error.response.data) {
          history.push("/zones/admin");
          toast.error("Slot already exists!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
        setButtonLoading(false);
      });
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

      <animated.div className="container" id="border" style={props}>
        <h3 id="register">Add Parking Slots </h3>
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
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-sm-12 col-md-3">
              <div className="input-group" id="input-color">
                <input
                  type="text"
                  className={`form-control ${
                    errors.slot_name ? "is-invalid" : ""
                  }`}
                  placeholder="Slot name"
                  name="slot_name"
                  ref={register({
                    required: true,
                  })}
                />
              </div>
              {errors.slot_name && errors.slot_name.type === "required" && (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#bf1650",
                  }}
                >
                  Slot name is required!
                </span>
              )}
            </div>
            &nbsp;
            <div className="col-sm-12 col-md-3" >
              <div id="zone-input">
              <select className={`form-control ${
                    errors.zone ? "is-invalid" : ""
                  }`} name="zone" ref={register({ required: true })}>
                <option value="zone A">zone A</option>
                <option value="zone B">zone B</option>
                <option value="zone C">zone C</option>
              </select>
             </div>
            </div>
            <br/>
            <div id="zone-btn">
            <button
              className="btn btn-md btn-primary m-0"
              type="submit"
              ref={zoneButtonElement}
            >
              Submit
            </button>
          </div>
          </form>
      </div>
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(ZoneAdmin);
