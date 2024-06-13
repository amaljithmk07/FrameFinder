import React, { useEffect, useState } from "react";
import "./PhotoPreviousBooking.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI from "../Constant/Constant";
const PhotoPreviousBooking = () => {
  const token = sessionStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      // .get(`http://localhost:2222/api/photographer/previous-booking`, {
      .get(`${BASE_URI}/api/photographer/previous-booking`, {
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
      <div className="p-previous-booking-main-body">
        <div className="p-previous-booking-description-body">
          <div className="p-previous-booking-title">Client Bookings</div>
          <div className="p-previous-booking-paragraph">
            Welcome to the booking overview page. Below is a comprehensive list
            of clients who have scheduled sessions with me. Each booking
            includes detailed information about the session type, date, time,
            and a personalized description. Click on each booking to learn more
            about the specific requirements and expectations of each session. I
            look forward to capturing these special moments and delivering
            exceptional results for every client.
          </div>
        </div>

        <div className="p-previous-booking-sec">
          {bookings.map((data) => (
            <div className="p-previous-booking-card-body">
              <div>{data.name}</div>
              <div>{data.email}</div>
              <div>
                {data.address},{data.city},{data.state}
              </div>
              <div>{data.phone}</div>
              <button>Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoPreviousBooking;
