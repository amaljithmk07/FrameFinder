import React, { useEffect, useState } from "react";
import "./PhotoAcceptedBooking.css";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import BASE_URI from "../Constant/Constant";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const PhotoAcceptedBooking = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ////////Bookings State
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    setShowloader(true);
    axios
      .get(`${BASE_URI}/api/photographer/accepted-bookings`, {
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
        toast.error(err.response.data.message);

        setShowloader(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Toaster />
      {showloader == true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="p-accept-booking-main-body">
            <div className="p-accept-booking-sub-body">
              {booking.map((data) => (
                <div className="card">
                  {data.name}
                  <div>id :{data._id}</div>
                  <div>Name :{data.name}</div>
                  <div>Email :{data.email}</div>
                  <div style={{ color: "green" }}>Status :{data.status}</div>
                  <div>Place :{data.address}</div>
                  <div>State :{data.state}</div>
                  <div> Phone :9652348</div>
                  <div>Type :wedding Photography</div>
                  <div>
                    {" "}
                    Description : the couple dshfsjhdfgjsdhgfjsdfgsjdfhg
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoAcceptedBooking;
