import React, { useEffect, useState } from "react";
import "./UserNotification.css";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
const UserNotification = () => {
  const token = sessionStorage.getItem("token");

  ///////Collection of Notification displaying
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

  ////////Letter On /Off state
  const [notificationLetterOn, setNotificationLetterOn] = useState(false);

  /////Notification letter data
  const [notificationLetterData, setNotificationLetterData] = useState({});

  ////When clicking this will enable the letter form
  const notificationLetterHandler = (id) => {
    const Data = notificationCollection.filter((data) => {
      console.log(data._id, id);
      return data._id == id;
    });
    // setNotificationCollection(Data);
    setNotificationLetterData(Data);
    setNotificationLetterOn(true);
  };

  /////Letter off
  const notificationLetterOff = () => {
    // window.location.reload();
    setNotificationLetterOn(false);
  };
  console.log(notificationLetterData);
  return (
    <div>
      <div className="u-notification-main-body">
        <div className="u-notification-body-title">Notifications</div>
        <div className="u-notification-content-body">
          {/* /////////Notification Letter body */}
          {notificationLetterOn == false ? (
            <>
              {notificationCollection.map((data) => (
                <>
                  <div
                    className="u-notification-content"
                    key={data._id}
                    onClick={() => notificationLetterHandler(data._id)}
                  >
                    <div className="u-notification-content-icon">
                      {data.photographer_name.slice(0, 1)}
                      <div
                        className={
                          data.status == "accepted"
                            ? "u-notification-content-icon-accept-dot"
                            : "u-notification-content-icon-reject-dot"
                        }
                      ></div>
                    </div>
                    <div className="u-notification-content-data-sec">
                      <div className="u-notification-content-data">
                        From : {data.photographer_name}
                      </div>
                      <div className="u-notification-content-description">
                        {data.status == "rejected"
                          ? "Thank you for considering our photography services. We regret to inform you that we are unable to confirm your photographysession at this time."
                          : "We are pleased to inform you that your photography session has been confirmed."}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              {notificationLetterData[0]?.status == "rejected" ? (
                <div className="u-notification-letter-main-body">
                  <div className="u-notification-letter-body">
                    <img
                      onClick={notificationLetterOff}
                      className="u-notification-letter-closing-btn"
                      src="/close.png"
                    />
                    <div className="u-notification-letter-title">
                      We're Sorry, But Your Photography Session Could Not Be
                      Confirmed
                    </div>
                    <p>Dear {notificationLetterData[0].name},</p>
                    <p>
                      Thank you for considering our photography services. We
                      regret to inform you that we are unable to confirm your
                      photography session at this time.
                    </p>
                    <div className="u-notification-letter-title">
                      Reason for Rejection:
                    </div>
                    {notificationLetterData[0].status}{" "}
                    <div className="u-notification-letter-title">
                      Contact Information:
                    </div>
                    <p>
                      If you have any questions or would like to discuss
                      alternative dates or options, please contact us at {}.
                    </p>
                    <p>
                      We sincerely apologize for any inconvenience this may have
                      caused and appreciate your understanding.
                    </p>
                    <p>Warm regards,</p>
                    <p>Your Photography Team</p>
                    <p>{notificationLetterData[0].photographer_name}</p>
                    <p>
                      <a href="https://framefinder.vercel.app">
                        Visit our website
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {notificationLetterData[0].status == "accepted" ? (
                    <div className="u-notification-letter-main-body">
                      <div className="u-notification-letter-body">
                        <img
                          onClick={notificationLetterOff}
                          className="u-notification-letter-closing-btn"
                          src="/close.png"
                        />
                        <div className="u-notification-letter-title">
                          Your Photography Session is Confirmed!
                        </div>
                        <p>Dear {notificationLetterData[0].name},</p>
                        <p>
                          Thank you for booking a photography session with us!
                          We're thrilled to capture your special moments.
                        </p>
                        <div className="u-notification-letter-title">
                          Booking Details:
                        </div>
                        <ul>
                          <li>
                            <strong>Session Type:</strong>
                          </li>
                          <li>
                            <strong>
                              Date:{notificationLetterData[0].date}
                            </strong>
                          </li>
                          <li>
                            <strong>Time:</strong>
                          </li>
                          <li>
                            <strong>Location:</strong>
                          </li>
                        </ul>
                        <div className="u-notification-letter-title">
                          Contact Information:{" "}
                        </div>
                        <p>
                          If you have any questions or need to reschedule,
                          please contact us at {}.
                        </p>
                        <p>
                          We look forward to creating beautiful memories with
                          you. Thank you for choosing our photography services!
                        </p>
                        <p>Warm regards,</p>
                        <p>Your Photography Team</p>
                        <p>{notificationLetterData[0].photographer_name}</p>
                        <p>
                          <a href="https://framefinder.vercel.app">
                            Visit our website
                          </a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotification;
