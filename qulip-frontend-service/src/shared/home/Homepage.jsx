import React from "react";
import { ProfileCard } from "../../components";

const Homepage = () => {
  return (
    <div className="container-fluid">
      <div className="container-sm">
        <div className="row py-4">
          <div className="col-lg-6 py-4">
            <h1 className="display-3 fw-bold">Find your space, Get socialize</h1>
          </div>
        </div>
      </div>
      <div className="container-sm">
        <div className="row py-4">
          <div className="col-lg py-4">
            <ProfileCard />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
