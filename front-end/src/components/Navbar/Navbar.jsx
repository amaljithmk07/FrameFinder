import React, { forwardRef, useState } from "react";
import "./Navbar.css";
import { Link, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  return (
    <div>
      <div className="navbar-main">
        <div className="navbar-logo-sec">
          <img src="/title-logo.png" alt="" className="title-logo" />
          {/* <img src="/logo.png" alt="" className="title-logo-icon" /> */}
        </div>
        <div className="navbar-menu-sec">
          <ul className="navbar-menu-items">
            <Link className="navbar-menu-data">Home</Link>
            <Link className="navbar-menu-data"> History</Link>{" "}
            <Link className="navbar-menu-data"> Review</Link>{" "}
            <Link className="navbar-menu-data">Profile</Link>
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
