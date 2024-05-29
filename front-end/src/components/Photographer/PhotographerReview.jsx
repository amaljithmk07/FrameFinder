import React, { useEffect, useState } from "react";
import "./PhotographerReview.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const PhotographerReview = () => {
  // getting profile id

  var { id } = useParams();

  ///for photographer profile
  const [photoprofile, setPhotoProfile] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/photographer/seperate-profile/${id}`)
      .then((data) => {
        // console.log(data.data.data);
        setPhotoProfile(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(photoprofile);
  return (
    <div>
      <div className="p-review-main-body">
        <div className="p-review-profile-body">
          <div className="p-review-profile-left">
            <img
              // src="/3.jpg"
              src={`/upload/${photoprofile.profile}`}
              alt=""
              className="p-review-profile-img-background"
            />
            <div className="p-review-profile-img-sec">
              <img
                // src="/3.jpg"
                src={`/upload/${photoprofile.profile}`}
                alt=""
                className="p-review-profile-img"
              />
            </div>
          </div>
          <div className="p-review-profile-right">
            <div className="p-review-profile-details">
              <div
                className="p-review-profile-data"
                style={{ fontSize: "4rem" }}
              >
                {photoprofile.name}
              </div>
              <div className="p-review-profile-data">{photoprofile.place}</div>
              <div className="p-review-profile-data">{photoprofile.email}</div>
              <div className="p-review-profile-data">Studio Name</div>
              <div className="p-review-profile-data">Social media Accounts</div>
            </div>
          </div>
        </div>

        {/* //////////////////////// */}

        <div className="p-review-gallery-body">
          <div className="p-review-gallery-img-body">
            <img src="/5.webp" alt="" className="p-review-gallery-img" />
          </div>
          <div className="p-review-gallery-img-body">
            <img src="/6.jpg" alt="" className="p-review-gallery-img" />
          </div>
          <div className="p-review-gallery-img-body">
            <img src="/10.jpg" alt="" className="p-review-gallery-img" />
          </div>
          <div className="p-review-gallery-img-body">
            <img src="/7.jpg" alt="" className="p-review-gallery-img" />
          </div>
        </div>

        {/* /////////////// */}

        <div className="p-review-text-body">
          <div className="p-review-text-title">Capturing Life's Moments: A Portfolio by {photoprofile.name}</div>
          Welcome to my photography portfolio, where each image tells a unique
          story. As a passionate photographer, I strive to capture the essence
          of every moment, transforming ordinary scenes into extraordinary
          memories. My work spans a diverse range of genres, including weddings,
          portraits, landscapes, and corporate events, each crafted with a
          commitment to excellence and a keen eye for detail.
          <div className="p-review-text-title">Weddings</div>
          Weddings are a celebration of love and unity. My wedding photography
          captures the joy, emotion, and intimate moments of your special day.
          Each shot is carefully composed to reflect the beauty and significance
          of your wedding, ensuring that your memories are preserved in stunning
          detail.
          <div className="p-review-text-title">Portraits</div>
          Portrait photography allows me to highlight the individuality and
          personality of my subjects. Whether it's a family portrait,
          professional headshot, or creative concept, my goal is to create
          images that resonate with authenticity and character. I work closely
          with my clients to bring out their best and create a comfortable
          environment for natural expressions.
          <div className="p-review-text-title">Landscapes</div>
          Nature's beauty is boundless, and my landscape photography aims to
          capture its grandeur and serenity. From majestic mountains to tranquil
          beaches, each photograph showcases the intricate details and vibrant
          colors of the natural world. These images are not just pictures but
          windows into the soul of our planet.
          <div className="p-review-text-title">Corporate Events</div>
          Professionalism and precision are key in corporate event photography.
          I document conferences, meetings, and company gatherings with a focus
          on capturing the energy and significance of each event. My photographs
          provide a visual narrative that supports your brand's story and
          achievements. Explore my portfolio and discover the artistry and
          passion that goes into every photograph. Each image is a testament to
          my dedication to capturing life's moments, big and small. Let's create
          beautiful memories together. Contact me to book a session or discuss
          your photography needs.
        </div>
      </div>
    </div>
  );
};

export default PhotographerReview;
