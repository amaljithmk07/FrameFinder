import React, { useEffect, useState } from "react";
import "./UserNotificationPanel.css";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
const UserNotificationPanel = () => {
  const token = sessionStorage.getItem("token");

  const [notificationCollection, setNotificationCollection] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/user/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // setNotificationCollection(data.data.data);
        var Data = data.data.data;
        var sortedData = [...Data].sort((a, b) => {
          return a.photographer_name.localeCompare(b.photographer_name);
        });
        setNotificationCollection(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="u-notification-panel-main-body">
        <div className="u-notification-panel-body-title">Notifications</div>
        <div className="u-notification-panel-content-body">
          {notificationCollection.map((data) => (
            <div className="u-notification-panel-content" key={data._id}>
              <div className="u-notification-panel-content-img">
                {data.photographer_name.slice(0, 1)}
              </div>
              <div className="u-notification-panel-content-data">
                {data.rejection_note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotificationPanel;
