import React, { useState } from "react";
import "./PhotoRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import BASE_URI from "../Constant/Constant";

const PhotoRegister = () => {
  const navigate = useNavigate();
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
      .post(`${BASE_URI}/api/register/photographer-register`, formData)
      .then((data) => {
        toast.success("Register Successful");

        console.log(data);
        navigate("/loginregister");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Toaster />
      <div className="photoregister-main-body">
        <div className="photoregister-form-description">
          <div className="photoregister-form-description-title">
            Photographers Registration Form
          </div>
          <div>
            Welcome to Frame Finder, the ultimate platform for showcasing your
            photographic talent and connecting with clients who appreciate your
            unique perspective. Join our vibrant community of photographers
            today by completing the registration form below.
          </div>

          <div className="photoregister-form-description-title">
            Why Register?
          </div>
          <ul>
            <li>
              Showcase Your Portfolio: Create a stunning profile to display your
              best work and attract potential clients.
            </li>
            <li>
              Connect with Clients: Reach a broader audience and find exciting
              opportunities for commissioned projects.
            </li>
            <li>
              Access Exclusive Features: Enjoy tools designed to enhance your
              workflow, manage bookings, and more.
            </li>
            <li>
              Join a Community: Network with fellow photographers, share
              insights, and collaborate on creative projects.
            </li>
          </ul>

          <div className="photoregister-form-description-title">
            Registration Details:
          </div>
          <ul>
            <li>
              Full Name: Your real name as it will appear on your profile.
            </li>
            <li>
              Username: A unique identifier for your profile on Frame Finder.
            </li>
            <li>
              Email Address: A valid email for communication and account
              verification.
            </li>
            <li>Password: Ensure it's strong and secure.</li>
            <li>
              Portfolio Link: A link to your existing portfolio (optional).
            </li>
            <li>
              Specialty: Choose your photography specialty (e.g., portrait,
              landscape, events).
            </li>
            <li>Location: Where you are based and available to work.</li>
            <li>Bio: A brief introduction about you and your work.</li>
            <li>
              Profile Picture: Upload a professional photo to personalize your
              profile.
            </li>
          </ul>

          <div className="photoregister-form-description-title">
            Get Started:
          </div>
          <div>
            Fill out the form with accurate and detailed information to ensure
            your profile stands out. Once submitted, our team will review your
            registration and you will be notified via email upon approval.
          </div>

          <div className="photoregister-form-description-title">
            Join Frame Finder today and take the next step in your photography
            career!
          </div>
        </div>

        {/* ////////// */}
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

        <div className="photoregister-disclaimer-sec">
          <div className="photoregister-form-description-title">Disclaimer</div>
          <div>
            By registering, you agree to abide by our terms and conditions and
            privacy policy. Frame Finder is committed to protecting your privacy
            and ensuring the security of your personal information. Any misuse
            of the platform may result in the suspension or termination of your
            account. Frame Finder reserves the right to review and approve all
            profiles and may request additional information if needed. For more
            details, please refer to our full{" "}
            <a href="">Terms and Conditions</a> and{" "}
            <a href="">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoRegister;
