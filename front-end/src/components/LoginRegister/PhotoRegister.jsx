import React, { useState } from "react";
import "./PhotoRegister.css";
import axios from "axios";

const PhotoRegister = () => {
  ////preview Photo
  const [profilepreview, setProfilepreview] = useState();
  /////////
  const FormPhotopreview = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setProfilepreview(URL.createObjectURL(e.target.files[0]));
  };

  ////Form Inputs

  const [formInputs, setForminputs] = useState({});

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setForminputs({ ...formInputs, [name]: value });
  };

  ///for photo
  const formPhotoHandler = (e) => {
    const { name } = e.target;
    setForminputs({ ...formInputs, [name]: e.target.files[0] });
  };

  /////////////form Submit

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formInputs);
    const formData = new FormData();
    formData.append("profile", formInputs.profile);
    formData.append("name", formInputs.name);
    formData.append("email", formInputs.email);
    formData.append("date_of_birth", formInputs.date_of_birth);
    formData.append("place", formInputs.place);
    formData.append("phone", formInputs.phone);
    formData.append("password", formInputs.password);
    axios
      .post(
        "http://localhost:2222/api/register/photographer-register",
        formData
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="photoregister-main-body">
        <div className="photoregister-sub-body">
          <form
            action=""
            className="photoregister-form-sec"
            encType="multipart/formData"
          >
            <input
              type="file"
              name="profile"
              hidden
              id="image"
              onChange={(e) => {
                FormPhotopreview(e);
                formPhotoHandler(e);
              }}
            />
            <label htmlFor="image">
              <img
                src={profilepreview ? profilepreview : "/profile-upload.jpg"}
                alt=""
                className="photoregister-image-sec"
              />
            </label>
            <input
              type="text"
              className="photoregister-input-sec"
              name="name"
              placeholder="Name"
              onChange={formInputHandler}
            />
            <input
              type="text"
              className="photoregister-input-sec"
              name="email"
              placeholder="Email"
              onChange={formInputHandler}
            />
            <input
              type="text"
              className="photoregister-input-sec"
              name="phone"
              placeholder="Phone"
              onChange={formInputHandler}
            />
            <input
              type="text"
              className="photoregister-input-sec"
              name="date_of_birth"
              placeholder="Date of birth"
              onChange={formInputHandler}
            />
            <input
              type="text"
              className="photoregister-input-sec"
              name="place"
              placeholder="Place"
              onChange={formInputHandler}
            />
            <input
              type="password"
              className="photoregister-input-sec"
              name="password"
              placeholder="Password"
              onChange={formInputHandler}
            />
            <button
              className="photoregister-submit-btn"
              onClick={formSubmitHandler}
            >
              <img src="/submit.png" className="photoregister-submit-img" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoRegister;
