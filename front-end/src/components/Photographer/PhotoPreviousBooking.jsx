import React, { useEffect, useState } from "react";
import "./PhotoPreviousBooking.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const PhotoPreviousBooking = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ///Bookings state
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setShowloader(true);
    axios
      // .get(`http://localhost:2222/api/photographer/previous-booking`, {
      .get(`${BASE_URI}/api/photographer/previous-booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setShowloader(false);

        toast.success(data.data.message);
        setBookings(data.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setShowloader(false);

        console.log(err);
      });
  }, []);
  console.log(bookings);

  const bookingPreview = (id) => {
    navigate(`/photo-booking-preview/${id}`);
  };
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

        <div
          className={
            showloader == true
              ? "p-previous-loading-sec"
              : "p-previous-booking-sec"
          }
        >
          {showloader == true ? (
            <Loader />
          ) : (
            <>
              {bookings.map((data) => (
                <div className="p-previous-booking-card-body">
                  <div className="p-previous-booking-card-title">
                    {data.name}
                  </div>
                  <div className="p-previous-booking-card-content">
                    {data.email}
                  </div>
                  <div className="p-previous-booking-card-content">
                    {data.address},{data.city},{data.state}
                  </div>
                  <div className="p-previous-booking-card-content">
                    {data.phone}
                  </div>
                  <button
                    className="p-previous-booking-card-btn"
                    onClick={() => bookingPreview(data._id)}
                  >
                    Review
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoPreviousBooking;
