import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PhotoBookingPreview.css";
import BASE_URI from "../Constant/Constant";
import axios from "axios";

const PhotoBookingPreview = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  ////////Bookings State
  const [booking, setBooking] = useState({});

  useEffect(() => {
    axios
      // .post(`http://localhost:2222/api/user/booking/${id}`, formData, {
      .get(`${BASE_URI}/api/photographer/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setBooking(data.data.data);
        // setShowloader(false);
      })
      .catch((err) => {
        // setShowloader(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="p-booking-preview-main-body">
        <div className="p-booking-preview-sub-body">
          <img
            src="/back-btn.png"
            onClick={() => navigate(-1)}
            className="p-booking-preview-back-btn"
          />

          <div>66546546544565465</div>
          <div>Amaljiht</div>
          <div>amaljithisd</div>
          <div>Pending</div>
          <div>calicut</div>
          <div>kerala</div>
          <div>9652348</div>
          <div>wedding Photography</div>
          <div>the couple dshfsjhdfgjsdhgfjsdfgsjdfhg</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBookingPreview;
