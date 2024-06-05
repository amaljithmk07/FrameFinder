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

            {role == 1 ? (
              <>
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
                  onMouseEnter={backgroundChange}
                  to={""}
                >
                  {" "}
                  Previous Booking
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
                  onMouseEnter={backgroundChange}
                  to={""}
                >
                  {" "}
                  Profile{" "}
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
                  onMouseEnter={backgroundChange}
                  to={""}
                >
                  {" "}
                  Photo Gallery{" "}
                </Link>{" "}
              </>
            ) : (
              <>
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
                  onMouseEnter={backgroundChange}
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
                  onMouseEnter={backgroundChange}
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
                  onMouseEnter={backgroundChange}
                  onClick={logout}
                >
                  Logout{" "}
                </Link>
              </>
            ) : (
              <>
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
                  onMouseEnter={backgroundChange}
                  to={"/loginregister"}
                >
                  Login{" "}
                </Link>
              </>
            )}
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
