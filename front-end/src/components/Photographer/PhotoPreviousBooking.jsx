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

  ////////////////////////////////

  //////Booking Changer state
  const [bookchanger, setBookchanger] = useState(true);

  const formPending = () => {
    setBookchanger(false);
  };
  const formAccepted = () => {
    setBookchanger(true);
  };

  ///////////

  ///for Pending Bookings state
  const [pendingbookings, setPendingbookings] = useState([]);

  ////////Bookings State
  const [acceptbooking, setAcceptbooking] = useState([]);

  useEffect(() => {
    if (bookchanger == false) {
      //////////Pending Bookings

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
          setPendingbookings(data.data.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setShowloader(false);

          console.log(err);
        });
    } else {
      //////////Accepted Bookings

      setShowloader(true);
      axios
        .get(`${BASE_URI}/api/photographer/accepted-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
          toast.success(data.data.message);

          setAcceptbooking(data.data.data);
          setShowloader(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);

          setShowloader(false);
          console.log(err);
        });
    }
  }, [bookchanger]);

  const bookingPreview = (id) => {
    navigate(`/photo-booking-preview/${id}`);
  };

  return (
    <div>
      <Toaster />
      <div className="p-previous-booking-main-body">
        <div className="p-previous-booking-description-body">
          <div className="p-previous-booking-description-title">
            Client Bookings
          </div>
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

        <div className="p-previous-togglebar-sec">
          <div
            className={
              bookchanger == false
                ? "p-previous-toggle-active"
                : "p-previous-toggle"
            }
            onClick={formPending}
          >
            Pending
          </div>
          <div
            className={
              bookchanger == true
                ? "p-previous-toggle-active"
                : "p-previous-toggle"
            }
            onClick={formAccepted}
          >
            Accepted
          </div>
        </div>
        <div className="p-previous-booking-sec">
          <div className="p-previous-booking-title">
            {bookchanger == false ? "Pending Bookings" : "Accepted Bookings"}
          </div>
          {bookchanger == false ? (
            <>
              <div
                className={
                  showloader == false
                    ? "p-previous-booking-card-area"
                    : "p-previous-booking-card-loading-area"
                }
              >
                {/* ///////////////Pending / Rejected Bookings Displays Here */}
                {showloader == true ? (
                  <Loader />
                ) : (
                  <>
                    {pendingbookings.map((data) => (
                      <>
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
                            className={
                              data.status == "rejected"
                                ? "p-previous-booking-card-rejected-btn"
                                : "p-previous-booking-card-btn"
                            }
                            onClick={() => bookingPreview(data._id)}
                          >
                            Review
                          </button>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            ///////////////Accepted Bookings Displays Here
            <>
              <div
                className={
                  showloader == false
                    ? "p-previous-booking-card-area"
                    : "p-previous-booking-card-loading-area"
                }
              >
                {" "}
                {showloader == true ? (
                  <Loader />
                ) : (
                  <>
                    {acceptbooking.map((data) => (
                      <>
                        <div className="p-previous-accepted-card-body">
                          <div className="p-previous-accepted-card-title">
                            {data.name}
                          </div>
                          <div className="p-previous-accepted-card-content">
                            {data.email}
                          </div>
                          <div className="p-previous-accepted-card-content">
                            {data.address},{data.city},{data.state}
                          </div>
                          <div className="p-previous-accepted-card-content">
                            {data.phone}
                          </div>
                          <button
                            className="p-previous-accepted-card-btn"
                            onClick={() => bookingPreview(data._id)}
                          >
                            Review
                          </button>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoPreviousBooking;
