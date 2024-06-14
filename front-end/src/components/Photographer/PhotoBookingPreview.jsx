import React from "react";
import { useParams } from "react-router-dom";
import "./PhotoBookingPreview.css";


const PhotoBookingPreview = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="p-booking-preview-main-body">PhotoBookingPreview{id}</div>
    </div>
  );
};

export default PhotoBookingPreview;
