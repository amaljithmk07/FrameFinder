import React from "react";
import "./Nodata.css";
const Nodata = () => {
  return (
    <div className="nodata-body">
     <video width="150" muted autoPlay >
        <source src="/nodata.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Nodata;
