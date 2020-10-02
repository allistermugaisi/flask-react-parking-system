import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <div className="row" id="space">
        <Link to="/zones/zone-a">PARKING ZONE A</Link>
        <Link to="/zones/zone-b">PARKING ZONE B</Link>
        <Link to="/zones/zone-c">PARKING ZONE C</Link>
      </div>
      <div
        className="footer-copyright text-center py-3"
        style={{ color: "#2680eb" }}
      >
        M: 0723 59 44 18 &nbsp; &nbsp; E: infocare@gmail.com
      </div>
    </React.Fragment>
  );
}

export default Footer;
