import React from "react";
import "./jamb.css";
const Jamb = () => {
  return (
    <>
      <label htmlFor="hamb" className="jam-main">
        <input type="checkbox" id="hamb" />
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </>
  );
};

export default Jamb;
