import React, { forwardRef, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
const Navbar = () => {
  ////////
  const role = sessionStorage.getItem("userRole");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  ////////Background changer state
  const [backgroundcolor, setBackgroundcolor] = useState(0);

  ///background change during hover

  const backgroundChange = () => {
    if (backgroundcolor <= 2) {
      setBackgroundcolor(backgroundcolor + 1);
    } else {
      setBackgroundcolor(0);
    }
  };

  //Logout

  const logout = (e) => {
    sessionStorage.clear();
    navigate("/loginregister");
    window.location.reload();
  };

  ////Class Name

  const getClassName = (color) => {
    switch (color) {
      case 0:
        return "zero";
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      default:
        return "";
    }
  };

  const [Hamburger, setHamburger] = useState(false);

  //////Toggle Bar Function

  const HamburgerHandler = () => {
    setHamburger((prev) => !prev);
  };

  ////////////

  const HamburgerOff = () => {
    setHamburger(false);
  };

  ////////////////Profile For Navbar

  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    if (role == 1) {
      axios
        .get(`${BASE_URI}/api/photographer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          setProfileData(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [role]);

  ////////////////Rejection Notification  For Navbar

  const [NotificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    if (role == 2) {
      axios
        .get(`${BASE_URI}/api/user/notification`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          const notificationData = data.data.data;
          setNotificationCount(notificationData.length);
          // console.log("navbar", notificationData.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [role]);
  return (
    <div>
      <div className="navbar-main">
        <div className="navbar-logo-sec">
          <img src="/title-logo.png" alt="" className="title-logo" />
          {/* <img src="/logo.png" alt="" className="title-logo-icon" /> */}
        </div>
        <div className="navbar-menu-sec">
          <div className="navbar-menu-items">
            {role == 1 ? (
              <>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/home"}
                >
                  Home
                </Link>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/previous-booking"}
                >
                  {" "}
                  Bookings
                </Link>{" "}
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/photographer-calendar"}
                >
                  {" "}
                  Calendar{" "}
                </Link>{" "}
              </>
            ) : (
              <>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/user/booking"}
                >
                  {" "}
                  Booking
                </Link>{" "}
              </>
            )}

            {token ? (
              <>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  onClick={logout}
                >
                  Logout{" "}
                </Link>
                {role == 1 ? (
                  <>
                    <Link
                      className="navbar-profile-sec"
                      to={"/photographer-profile"}
                    >
                      <img
                        src={
                          profileData.profile
                            // ? `/upload/${profileData.profile}`
                            ? `${profileData.profile}`
                            : "/userlogin.png"
                        }
                        alt=""
                        className="navbar-profile-img"
                      />
                      <div className="navbar-profile-border"></div>
                    </Link>
                  </>
                ) : (
                  <>
                    {role == 2 ? (
                      <>
                        {!NotificationCount == 0 ? (
                          <Link
                            className="navbar-notification-sec"
                            to={"/user/notification"}
                          >
                            <img
                              src={"/notification.png"}
                              alt=""
                              className="navbar-notification-img"
                            />
                            <>
                              <div className="navbar-notification-dot">
                                {NotificationCount}
                              </div>
                            </>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={"/loginregister"}
                >
                  Login{" "}
                </Link>
              </>
            )}
          </div>
        </div>
        {/* //Hamburger Secion// */}
        {/* <img
          src={Hamburger == false ? "/hamburger.png" : "/hamb-close.png"}
          onClick={HamburgerHandler}
          className="navbar-hamburger-icon"
          /> */}

        <div className="navbar-hamb-main" onClick={HamburgerHandler}>
          <div
            className={
              Hamburger == false ? "navbar-hamb-line" : "navbar-hamb-line-after"
            }
          ></div>
          <div
            className={
              Hamburger == false ? "navbar-hamb-line" : "navbar-hamb-line-after"
            }
          ></div>
          <div
            className={
              Hamburger == false ? "navbar-hamb-line" : "navbar-hamb-line-after"
            }
          ></div>
        </div>
        {Hamburger == true ? (
          <>
            <div className="navbar-hamburger-body">
              {role == 1 ? (
                <>
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/home"}
                    onClick={HamburgerOff}
                  >
                    Home
                  </Link>
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/previous-booking"}
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Bookings
                  </Link>{" "}
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/photographer-calendar"}
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Calendar
                  </Link>{" "}
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/photographer-profile"}
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Profile{" "}
                  </Link>{" "}
                </>
              ) : (
                <>
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/"}
                    onClick={HamburgerOff}
                  >
                    Home
                  </Link>
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/user/booking"}
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Booking
                  </Link>{" "}
                  {!NotificationCount == 0 ? (
                    <Link
                      className="navbar-hamb-notification-sec"
                      to={"/user/notification"}
                      onClick={HamburgerOff}
                    >
                      <img
                        src={"/notification.png"}
                        alt=""
                        className="navbar-notification-img"
                      />
                      <>
                        <div className="navbar-notification-dot">
                          {NotificationCount}
                        </div>
                      </>
                      <div className="navbar-notification-anime">
                        Notifications{" "}
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {token ? (
                <>
                  <Link
                    className="navbar-hamburger-menu"
                    onClick={() => {
                      logout(), HamburgerOff();
                    }}
                  >
                    Logout{" "}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="navbar-hamburger-menu"
                    to={"/loginregister"}
                    onClick={HamburgerOff}
                  >
                    Login{" "}
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
