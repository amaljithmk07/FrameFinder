import React, { useState, useEffect } from "react";
import "./UserAccount.css";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
// import { Link, useNavigate } from "react-router-dom";
// import Nodata from "../Nodata/Nodata";
const UserAccount = () => {
  const token = sessionStorage.getItem("token");

  ///for users account bookings list
  const [accountBookings, setAccountBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/user/booking-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // setShowloader(false);

        console.log(data.data.data);
        setAccountBookings(data.data.data);
      })
      .catch((err) => {
        // setShowloader(false);

        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="useraccount-main-body">
        <div className="useraccount-sub-body">
          <div className="useraccount-title">Recent Bookings</div>{" "}
        </div>
        <div className="useraccount-card-main">
          {accountBookings.map((data) => (
            <div className="useraccount-card-body" key={data._id}>
              <div className="useraccount-card-data">
                {" "}
                Photographer :{data.photographer_name}
              </div>
              <div className="useraccount-card-data">
                {" "}
                Status : {data.status}
              </div>
              <div className="useraccount-card-data">
                {" "}
                Booked Date : {data.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
