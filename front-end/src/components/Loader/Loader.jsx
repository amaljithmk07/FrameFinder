import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div>
      <div className="loader-main-body">
        <div className="loader-border"></div>
        <img src="/loader.png" alt="" className="loader-img" />{" "}
      </div>
    </div>
  );
};

export default Loader;
