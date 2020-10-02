import React from "react";
import Navbar from "../Navbar";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="home">
        <h1>User Dashboard</h1>
      </div>
    </React.Fragment>
  );
};

export default Home;
