import React, { useEffect, useState } from "react";
import "./PhotoPreviousBooking.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const PhotoPreviousBooking = () => {
  const token = sessionStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/photographer/previous-booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        toast.success(data.data.message);
        setBookings(data.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }, []);
  console.log(bookings);
  return (
    <div>
      <Toaster />
      <div className="p-previous-booking-main-body"></div>
    </div>
  );
};

export default PhotoPreviousBooking;
