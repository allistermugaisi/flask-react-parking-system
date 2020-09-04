import React from "react";
import { Link } from "react-router-dom";
import "./Zones.css";

function Zones() {
  return (
    <div className="row justify-content-center" style={{ paddingTop: "40px" }}>
      <div
        className="card mb-3 col-sm-12 shadow-sm"
        style={{
          maxWidth: "340px",
          maxHeight: "112px",
          borderRadius: "20px",
        }}
      >
        <div className="row no-gutters">
          <div className="row" id="bg-card">
            <p id="large">P</p>
            <p id="small">1</p>
          </div>
          <div id="bg-card1">
            <Link
              to="/zones/zone-a"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p id="p1-font">Zone A</p>
            </Link>
            <p id="p-font">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              obcaecati quis explicabo
            </p>
          </div>
        </div>
      </div>
      &nbsp; &nbsp;
      <div
        className="card mb-3 col-sm-12 shadow-sm"
        style={{
          maxWidth: "340px",
          maxHeight: "112px",
          borderRadius: "20px",
        }}
      >
        <div className="row no-gutters">
          <div className="row" id="bg-card">
            <p id="large">P</p>
            <p id="small">2</p>
          </div>
          <div id="bg-card1">
            <Link
              to="/zones/zone-b"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p id="p1-font">Zone B</p>
            </Link>
            <p id="p-font">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              obcaecati quis explicabo
            </p>
          </div>
        </div>
      </div>
      &nbsp; &nbsp;
      <div
        className="card mb-3 col-sm-12 shadow-sm"
        style={{ maxWidth: "340px", maxHeight: "112px", borderRadius: "20px" }}
      >
        <div className="row no-gutters">
          <div className="row" id="bg-card">
            <p id="large">P</p>
            <p id="small">3</p>
          </div>

          <div id="bg-card1">
            <Link
              to="/zones/zone-c"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p id="p1-font">Zone C</p>
            </Link>
            <p id="p-font">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              obcaecati quis explicabo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zones;
