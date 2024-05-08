import React, { forwardRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [backgroundcolor, setBackgroundcolor] = useState(0);

  const backChange = () => {
    if (backgroundcolor <= 2) {
      setBackgroundcolor(backgroundcolor + 1);
    } else {
      setBackgroundcolor(0);
    }
  };
  return (
    <div>
      <div className="navbar-main">
        <div className="navbar-logo-sec">
          <img src="/title-logo.png" alt="" className="title-logo" />
          {/* <img src="/logo.png" alt="" className="title-logo-icon" /> */}
        </div>
        <div className="navbar-menu-sec">
          <ul className="navbar-menu-items">
            {/* <Link className="navbar-menu-data">Home</Link> */}
            <Link
              className={
                backgroundcolor == 0
                  ? "zero"
                  : backgroundcolor == 1
                  ? "one"
                  : backgroundcolor == 2
                  ? "two"
                  : backgroundcolor == 3
                  ? "three"
                  : ""
              }
              onMouseEnter={backChange}
              to={"/"}
            >
              Home
            </Link>
            <Link
              className={
                backgroundcolor == 0
                  ? "zero"
                  : backgroundcolor == 1
                  ? "one"
                  : backgroundcolor == 2
                  ? "two"
                  : backgroundcolor == 3
                  ? "three"
                  : ""
              }
              onMouseEnter={backChange}
              to={"/user/booking"}

            >
              {" "}
              Booking
            </Link>{" "}
            <Link
              className={
                backgroundcolor == 0
                  ? "zero"
                  : backgroundcolor == 1
                  ? "one"
                  : backgroundcolor == 2
                  ? "two"
                  : backgroundcolor == 3
                  ? "three"
                  : ""
              }
              onMouseEnter={backChange}
            >
              {" "}
              Review
            </Link>{" "}
            <Link
              className={
                backgroundcolor == 0
                  ? "zero"
                  : backgroundcolor == 1
                  ? "one"
                  : backgroundcolor == 2
                  ? "two"
                  : backgroundcolor == 3
                  ? "three"
                  : ""
              }
              onMouseEnter={backChange}
            >
              Profile
            </Link>
            <Link
              className={
                backgroundcolor == 0
                  ? "zero"
                  : backgroundcolor == 1
                  ? "one"
                  : backgroundcolor == 2
                  ? "two"
                  : backgroundcolor == 3
                  ? "three"
                  : ""
              }
              onMouseEnter={backChange}
              to={'/login'}
            >
              Login{" "}
            </Link>
          </ul>
        </div>
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
