import React, { useEffect, useState } from "react";
import "./UserPhotoBooking.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
const UserPhotoBooking = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // getting profile id

  var { id } = useParams();

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ///for photographer profile
  const [photoprofile, setPhotoProfile] = useState({});

  useEffect(() => {
    setShowloader(true);
    axios
      // .get(`http://localhost:2222/api/photographer/seperate-profile/${id}`)
      .get(`${BASE_URI}/api/photographer/seperate-profile/${id}`)
      .then((data) => {
        setShowloader(false);

        // console.log(data.data.data);
        setPhotoProfile(data.data.data[0]);
      })
      .catch((err) => {
        setShowloader(false);

        console.log(err);
      });
  }, []);

  /////////image slice
  const limitedimage = photoprofile.image ? photoprofile.image.slice(0, 4) : "";
  console.log(limitedimage);

  //Booking form input data handler
  var [formData, setFormdata] = useState({});

  ////if the user doesnt logged in, then the form get stored
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

  ///form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (token != null) {
      setShowloader(true);

      axios
        // .post(`http://localhost:2222/api/user/booking/${id}`, formData, {
        .post(`${BASE_URI}/api/user/booking/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
          toast.success("Booking Successful");
          sessionStorage.removeItem("SavedFormData");
          sessionStorage.removeItem("photographerId");
          setShowloader(false);
        })
        .catch((err) => {
          setShowloader(false);
          toast.error(err.response.data.errorMessage);

          console.log(err);
        });
    } else {
      toast.error("You need to login first");
      sessionStorage.setItem("SavedFormData", JSON.stringify(formData));
      sessionStorage.setItem("photographerId", id);
      navigate("/loginregister");
    }
  };
  return (
    <div>
      <Toaster />
      {showloader == true ? (
        <Loader />
      ) : (
        <>
          <div className="u-photo-booking-main-body">
            <div className="u-photo-booking-profile-body">
              <div className="u-photo-booking-profile-left">
                <div
                  // src="/3.jpg"
                  // src={`/upload/${photoprofile.profile}`}
                  alt=""
                  className="u-photo-booking-profile-img-background"
                />
                <div className="u-photo-booking-profile-img-sec">
                  <img
                    // src="/3.jpg"
                    src={`/upload/${photoprofile.profile}`}
                    alt=""
                    className="u-photo-booking-profile-img"
                  />
                </div>
              </div>
              <div className="u-photo-booking-profile-right">
                <div className="u-photo-booking-profile-details">
                  <div className="u-photo-booking-profile-data">
                    {photoprofile.name}
                  </div>
                  <div className="u-photo-booking-profile-data">
                    {photoprofile.place}
                  </div>
                  <div className="u-photo-booking-profile-data">
                    {photoprofile.email}
                  </div>
                  <div className="u-photo-booking-profile-data">
                    Studio Name
                  </div>
                  <div className="u-photo-booking-profile-data">
                    Social media Accounts
                  </div>
                </div>
              </div>
            </div>

            {/* //////////////////////// */}

            <div className="u-photo-booking-gallery-body">
              {limitedimage.length !== 0 ? (
                <>
                  {limitedimage.map((data, index) => (
                    <div
                      className="u-photo-booking-gallery-img-body"
                      key={index}
                    >
                      <img
                        src={`/upload/${data}`}
                        alt=""
                        className="u-photo-booking-gallery-img"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="u-photo-booking-gallery-img-body">
                    <img
                      src="/5.webp"
                      alt=""
                      className="u-photo-booking-gallery-img"
                    />
                  </div>
                  <div className="u-photo-booking-gallery-img-body">
                    <img
                      src="/6.jpg"
                      alt=""
                      className="u-photo-booking-gallery-img"
                    />
                  </div>
                  <div className="u-photo-booking-gallery-img-body">
                    <img
                      src="/10.jpg"
                      alt=""
                      className="u-photo-booking-gallery-img"
                    />
                  </div>
                  <div className="u-photo-booking-gallery-img-body">
                    <img
                      src="/7.jpg"
                      alt=""
                      className="u-photo-booking-gallery-img"
                    />
                  </div>
                </>
              )}
            </div>

            {/* /////////////// */}

            <div className="u-photo-booking-text-body">
              <div className="u-photo-booking-text-title">
                Capturing Life's Moments: A Portfolio by {photoprofile.name}
              </div>
              Welcome to my photography portfolio, where each image tells a
              unique story. As a passionate photographer, I strive to capture
              the essence of every moment, transforming ordinary scenes into
              extraordinary memories. My work spans a diverse range of genres,
              including weddings, portraits, landscapes, and corporate events,
              each crafted with a commitment to excellence and a keen eye for
              detail.
              <div className="u-photo-booking-text-title">Weddings</div>
              Weddings are a celebration of love and unity. My wedding
              photography captures the joy, emotion, and intimate moments of
              your special day. Each shot is carefully composed to reflect the
              beauty and significance of your wedding, ensuring that your
              memories are preserved in stunning detail.
              <div className="u-photo-booking-text-title">Portraits</div>
              Portrait photography allows me to highlight the individuality and
              personality of my subjects. Whether it's a family portrait,
              professional headshot, or creative concept, my goal is to create
              images that resonate with authenticity and character. I work
              closely with my clients to bring out their best and create a
              comfortable environment for natural expressions.
              <div className="u-photo-booking-text-title">Landscapes</div>
              Nature's beauty is boundless, and my landscape photography aims to
              capture its grandeur and serenity. From majestic mountains to
              tranquil beaches, each photograph showcases the intricate details
              and vibrant colors of the natural world. These images are not just
              pictures but windows into the soul of our planet.
              <div className="u-photo-booking-text-title">Corporate Events</div>
              Professionalism and precision are key in corporate event
              photography. I document conferences, meetings, and company
              gatherings with a focus on capturing the energy and significance
              of each event. My photographs provide a visual narrative that
              supports your brand's story and achievements. Explore my portfolio
              and discover the artistry and passion that goes into every
              photograph. Each image is a testament to my dedication to
              capturing life's moments, big and small. Let's create beautiful
              memories together. Contact me to book a session or discuss your
              photography needs.
            </div>

            {/* //Booking section */}
            <div className="u-photo-booking-booking-sec">
              <div className="u-photo-booking-booking-background">
                <img
                  src="/capture.png"
                  alt=""
                  className="u-photo-booking-background-text"
                />{" "}
                <img
                  src="/your.png"
                  alt=""
                  className="u-photo-booking-background-text"
                />{" "}
                <img
                  src="/moments.png"
                  alt=""
                  className="u-photo-booking-background-text"
                />{" "}
              </div>

              {/* Booking Form Section */}

              <div className="u-photo-booking-booking-area">
                <form action="" className="u-photo-booking-booking-form">
                  <div className="u-photo-booking-input-text">Name</div>{" "}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={formHandler}
                    value={SavedFormData ? formData.name : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">Email</div>{" "}
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={formHandler}
                    value={SavedFormData ? formData.email : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">Phone</div>{" "}
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={formHandler}
                    value={SavedFormData ? formData.phone : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">Address</div>{" "}
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={formHandler}
                    value={SavedFormData ? formData.address : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">City</div>{" "}
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={formHandler}
                    value={SavedFormData ? formData.city : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">State</div>{" "}
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    onChange={formHandler}
                    value={SavedFormData ? formData.state : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div>
            <div className="u-photo-booking-inputfield-sec"> */}
                  <div className="u-photo-booking-input-text">Pincode</div>{" "}
                  <input
                    type="date"
                    name="date"
                    placeholder="Session Date"
                    onChange={formHandler}
                    value={SavedFormData ? formData.pincode : null}
                    className="u-photo-booking-inputfield"
                  />{" "}
                  {/* </div> */}
                  <button
                    onClick={submitHandler}
                    className="u-photo-booking-form-btn"
                  >

                    <img
                      src="/submit.png"
                      className="u-photo-booking-form-btn-img"
                    />

                    <div className="u-photo-booking-form-btn-back"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPhotoBooking;
