import React, { forwardRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const role = sessionStorage.getItem("userRole");

  const [backgroundcolor, setBackgroundcolor] = useState(0);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

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

  return (
    <div>
      <div className="navbar-main">
        <div className="navbar-logo-sec">
          <img src="/title-logo.png" alt="" className="title-logo" />
          {/* <img src="/logo.png" alt="" className="title-logo-icon" /> */}
        </div>
        <div className="navbar-menu-sec">
          <div className="navbar-menu-items">
            {/* <Link className="navbar-menu-data">Home</Link> */}

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
                  Previous Booking
                </Link>{" "}
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={""}
                >
                  {" "}
                  Photo Gallery{" "}
                </Link>{" "}
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                  to={""}
                >
                  {" "}
                  Profile{" "}
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
                <Link
                  className={getClassName(backgroundcolor)}
                  onMouseEnter={backgroundChange}
                >
                  {" "}
                  Explore{" "}
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
        <label htmlFor="hamb" className="hamb-main">
          <input type="checkbox" id="hamb" onClick={HamburgerHandler} />
          <div className="hamb-line"></div>
          <div className="hamb-line"></div>
          <div className="hamb-line"></div>
        </label>
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
                    Previous Booking
                  </Link>{" "}
                  <Link
                    className="navbar-hamburger-menu"
                    to={""}
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Photo Gallery{" "}
                  </Link>{" "}
                  <Link
                    className="navbar-hamburger-menu"
                    to={""}
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
                  <Link
                    className="navbar-hamburger-menu"
                    onClick={HamburgerOff}
                  >
                    {" "}
                    Explore{" "}
                  </Link>{" "}
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

// activeClass="active"
// to="contact-sec"
// spy={true}
// smooth={true}
// offset={-70}
// duration={500}
