import React, { useEffect, useState } from "react";
import "./UserBooking.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserBooking = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  ///////////////////
  var [formData, setFormdata] = useState({}); //Booking form input data handler

  ////if the user doesnt logged in then the form get stored

  var SavedFormData = sessionStorage.getItem("SavedFormData");

  /////stored form data gets reset on a state
  if (SavedFormData) {
    var [formData, setFormdata] = useState(JSON.parse(SavedFormData)); //Booking form input data handler
  }
  ///form Input handler
  const formHandler = (e) => {
    const { name, value } = e.target;

    setFormdata({ ...formData, [name]: value });
  };
  console.log(formData);

  ///fom submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (token != null) {
      axios
        .post(`http://localhost:2222/api/user/booking`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      sessionStorage.setItem("SavedFormData", JSON.stringify(formData));
      navigate("/loginregister");
    }
  };

  return (
    <div className="userbooking-main-body">
      <Toaster />
      <div className="userbooking-image-body">
        <div className="userbooking-text-body">
          <div className="userbooking-text-wrap">
            <div className="userbooking-text-quote">Capture</div>
            <div className="userbooking-text-quote">your ideal wedding</div>
            <div className="userbooking-text-quote">moments today.</div>
          </div>

          <button className="userbooking-text-body-button">Book Now</button>
        </div>{" "}
      </div>{" "}
      {/* //Select-categories */}
      <div className="userbooking-categories-sec">
        {/* ////Categories card body */}
        <div className="userbooking-categories-title">Top Notch categories</div>

        <div className="userbooking-categories-card-sec">
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/traditional-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Traditional Wedding Photography
              </div>{" "}
              This style typically involves posed portraits of the couple,
              family, and wedding party, often in a formal setting.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/fineart-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Fine Art Wedding Photography{" "}
              </div>{" "}
              This style emphasizes creative and artistic compositions, often
              using dramatic lighting and unique angles to capture romantic and
              visually stunning images.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/photojournalist-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Photojournalistic Wedding Photography
              </div>{" "}
              Also known as documentary or reportage style, this approach
              focuses on candid and spontaneous moments throughout the wedding
              day, capturing the events as they naturally unfold.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/fashion-wedding.webp"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Fashion Wedding Photography{" "}
              </div>{" "}
              Inspired by fashion photography, this style prioritizes stylish
              and glamorous shots, often incorporating high-fashion poses and
              editorial techniques.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/destination-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Destination Wedding Photography{" "}
              </div>{" "}
              Specifically tailored for weddings held in exotic or picturesque
              locations, this style highlights the beauty of the surroundings
              while documenting the wedding festivities.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/vintage-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Vintage Wedding Photography{" "}
              </div>{" "}
              Drawing inspiration from the past, this style aims to evoke a
              nostalgic and timeless feel through the use of vintage cameras,
              filters, and editing techniques.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/natural-light-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Natural Light Wedding Photography
              </div>{" "}
              This style relies primarily on natural light to create soft,
              ethereal images, avoiding the use of artificial lighting whenever
              possible for a more authentic and romantic look.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/drone-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Drone Wedding Photography
              </div>{" "}
              Utilizing drones, this style captures breathtaking aerial shots of
              the wedding venue, ceremony, and surrounding landscapes, providing
              a unique perspective of the event.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/black-and-white-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Black and White Wedding Photography
              </div>{" "}
              Stripping away color, this style focuses on the raw emotion and
              timeless beauty of black and white imagery, often adding a sense
              of elegance and sophistication to the photos.
            </div>
          </div>
          {/* ////////////////////// */}
          <div className="userbooking-categories-card-body">
            <div className="userbooking-categories-card-img-sec">
              <img
                src="/cinematic-wedding.jpg"
                alt=""
                className="userbooking-categories-card-img"
              />
            </div>
            <div className="userbooking-categories-card-content-sec">
              <div className="userbooking-categories-card-content-title">
                Cinematic Wedding Photography
              </div>{" "}
              Inspired by cinematic storytelling, this style combines still
              photography with cinematic techniques such as creative framing,
              dynamic angles, and post-production effects to create a cinematic
              narrative of the wedding day.
            </div>
          </div>
        </div>
      </div>
      {/* //Booking section */}
      <div className="userbooking-booking-sec">
        <div className="userbooking-booking-background">
          <img
            src="/capture.png"
            alt=""
            className="userbooking-background-text"
          />{" "}
          <img src="/your.png" alt="" className="userbooking-background-text" />{" "}
          <img
            src="/moments.png"
            alt=""
            className="userbooking-background-text"
          />{" "}
        </div>

        {/* Booking Form Section */}

        <div className="userbooking-booking-area">
          <form action="" className="userbooking-booking-form">
            {/* <div className="userbooking-form-heading"> </div> */}
            {/* <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">Name</div>{" "}
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formHandler}
              value={SavedFormData ? formData.name : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">Email</div>{" "}
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={formHandler}
              value={SavedFormData ? formData.email : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">Phone</div>{" "}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={formHandler}
              value={SavedFormData ? formData.phone : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">Address</div>{" "}
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={formHandler}
              value={SavedFormData ? formData.address : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">City</div>{" "}
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={formHandler}
              value={SavedFormData ? formData.city : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">State</div>{" "}
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={formHandler}
              value={SavedFormData ? formData.state : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div>
            <div className="userbooking-inputfield-sec"> */}
            <div className="userbooking-input-text">Pincode</div>{" "}
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={formHandler}
              value={SavedFormData ? formData.pincode : null}
              className="userbooking-inputfield"
            />{" "}
            {/* </div> */}
            <button onClick={submitHandler} className="userbooking-form-btn">
              <img src="/submit.png" className="userbooking-form-btn-img" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
