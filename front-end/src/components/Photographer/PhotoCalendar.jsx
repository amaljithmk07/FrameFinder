import React, { useEffect, useState } from "react";
import "./PhotoCalendar.css";
import { useNavigate } from "react-router-dom";
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
        const sortedData = data.data.data.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateA - dateB;
        });
        setCalendarData(sortedData);
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
        <div className="p-calendar-text-body">
          <div className="p-calendar-text-title">
            Photographer's Booked Sessions Calendar
          </div>
          Welcome to our booked sessions calendar! This feature allows you to
          view all confirmed bookings for our photographers, helping you stay
          informed about their schedules and availability. The calendar provides
          a clear overview of each photographer's engagements, ensuring you can
          easily check when they are occupied.
        </div>

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
