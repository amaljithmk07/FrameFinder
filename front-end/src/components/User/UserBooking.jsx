import React, { useState } from "react";
import "./UserBooking.css";
import axios from "axios";

const UserBooking = () => {
  const [formData, setFormdata] = useState({});

  //////////////

  const formHandler = (e) => {
    const { name, value } = e.target;

    setFormdata({ ...formData, [name]: value });
  };
  console.log(formData);

  ////////////

  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:2222/api/user/booking`, formData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="userbooking-main-body">
      <div className="userbooking-image-body">
        <div className="userbooking-text-body">
          Capture your ideal wedding moments today.
        </div>
      </div>{" "}
      <div className="userbooking-booking-sec">
        <div className="userbooking-booking-area">
          <form action="" className="userbooking-booking-form">
            <div>
              {" "}
              name <input type="text" name="name" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              email
              <input type="text" name="email" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              phone
              <input type="text" name="phone" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              address{" "}
              <input type="text" name="address" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              city <input type="text" name="city" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              state <input
                type="text"
                name="state"
                onChange={formHandler}
              />{" "}
            </div>
            <div>
              {" "}
              pincode
              <input type="text" name="pincode" onChange={formHandler} />{" "}
            </div>
            <div>
              {" "}
              date <input type="text" name="date" onChange={formHandler} />{" "}
            </div>
            <button onClick={submitHandler}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
