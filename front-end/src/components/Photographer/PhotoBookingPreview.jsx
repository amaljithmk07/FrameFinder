import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PhotoBookingPreview.css";
import BASE_URI from "../Constant/Constant";
import axios from "axios";
import Loader from "../Loader/Loader";

const PhotoBookingPreview = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ////////Bookings State
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    setShowloader(true);
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
        setShowloader(false);
      })
      .catch((err) => {
        setShowloader(false);
        console.log(err);
      });
  }, []);

  ////Accept the booking
  const acceptBooking = () => {
    axios
      .put(
        `${BASE_URI}/api/photographer/accept-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        const filterdata = booking.filter((data) => {
          return (data.status = "accepted");
        });
        setBooking(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////Reject the booking
  const rejectBooking = () => {
    axios
      .put(
        `${BASE_URI}/api/photographer/reject-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        const filterdata = booking.filter((data) => {
          return (data.status = "rejected");
        });
        setBooking(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="p-booking-preview-main-body">
        {showloader == true ? (
          <Loader />
        ) : (
          <>
            <div className="p-booking-preview-sub-body">
              <img
                src="/back-btn.png"
                onClick={() => navigate(-1)}
                className="p-booking-preview-back-btn"
              />
              {booking.map((data) => (
                <div className="p-booking-preview-form-body" key={data._id}>
                  <div className="p-booking-preview-data">
                    id :66546546544565465
                  </div>
                  <div className="p-booking-preview-data">
                    Name :{data.name}
                  </div>
                  <div className="p-booking-preview-data">
                    Email :{data.email}
                  </div>
                  <div className="p-booking-preview-data">
                    Date :{data.date}
                  </div>
                  <div
                    className="p-booking-preview-data"
                    style={
                      data.status == "accepted"
                        ? { color: "green" }
                        : data.status == "rejected"
                        ? { color: "red" }
                        : { color: "blue" }
                    }
                  >
                    Status :{data.status}
                  </div>
                  <div className="p-booking-preview-data">
                    Place :{data.address}
                  </div>
                  <div className="p-booking-preview-data">
                    State :{data.state}
                  </div>
                  <div className="p-booking-preview-data"> Phone :9652348</div>
                  <div className="p-booking-preview-data">
                    Type :wedding Photography
                  </div>
                  <div className="p-booking-preview-data">
                    {" "}
                    Description : the couple dshfsjhdfgjsdhgfjsdfgsjdfhg
                  </div>
                  <div className="p-booking-preview-data">
                    {" "}
                    <button
                      className="p-booking-preview-btn accept"
                      onClick={acceptBooking}
                      style={
                        data.status == "accepted"
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="p-booking-preview-btn reject"
                      onClick={rejectBooking}
                      style={
                        data.status == "rejected"
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoBookingPreview;
