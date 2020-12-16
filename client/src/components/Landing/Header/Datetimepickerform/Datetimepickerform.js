import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./Datetimepickerform.css";

function Datetimepickerform() {
  const [startDate, setStartDate] = useState(null);
  // console.log(startDate)

  return (
    <div className="container shadow-sm bg-white" id="halfway-button">
      <div className="row">
        <div className="col-sm-12 col-md-2" id="input-color">
          <div className="input-group" id="display-none">
            <input
              type="text"
              placeholder="26.03.2020  12:38"
              id="picker"
              className="form-control"
            />
            <div className="input-group-prepend">
              <button type="button" id="toggle" className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-5" id="input-color">
          <label htmlFor="exit" style={{ paddingLeft: "75px" }}>
            Select date
          </label>
          <DayPickerInput placeholder="2020-03-01" format="YYYY/MM/DD" />
          {/* <div className="input-group-prepend">
              <button type="button" id="toggle2" className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </button>
          </div> */}
        </div>

        <div className="col-sm-12 col-md-4" id="search-btn">
          <div className="input-group-append">
            <button className="btn btn-md btn-primary m-0 px-3" type="button">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datetimepickerform;
