import React, { useEffect, useState } from "react";
import "./PhotoCalendar.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../Constant/Constant";

const PhotoCalendar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ////////Bookings State
  const [calendarData, setCalendarData] = useState([]);
  useEffect(() => {
    setShowloader(true);
    axios
      // .post(`http://localhost:2222/api/user/booking/${id}`, formData, {
      .get(`${BASE_URI}/api/photographer/calendar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setCalendarData(data.data.data);
        setShowloader(false);
      })
      .catch((err) => {
        setShowloader(false);
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="p-calendar-main-body">
        <div className="p-calendar-body">
          {calendarData.map((data) => (
            <div className="p-calendar-content" key={data._id}>
              <div className="p-calender-content-data">{data.date}</div>
              <div className="p-calender-content-data">{data.name}</div>
              <div className="p-calender-content-data">
                {data.address},{data.city},{data.state}
              </div>
              <div className="p-calender-content-data">{data.phone}</div>
              <div className="p-calender-content-data">{data.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCalendar;
