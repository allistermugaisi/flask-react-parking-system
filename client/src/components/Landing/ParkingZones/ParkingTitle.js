import React from "react";
import Zones from "./Zones/Zones";
import "./ParkingTitle.css";

function ParkingTitle() {
  return (
    <div style={{ backgroundColor: "#f4f7fa", minHeight: "300px" }}>
      <p id="p-zone">Parking Zones</p>
      <Zones />
    </div>
  );
}

export default ParkingTitle;
