import React from "react";
import { Header, Search, ParkingTitle, About, Footer } from "./index";
import ScrollToTop from "../utils/ScrollToTop";

function Landing() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Search/>
      <br />
      <ParkingTitle />
      <ScrollToTop />
      <br />
      <br />
      <br />
      <About />
      <Footer />
    </div>
  );
}

export default Landing;
