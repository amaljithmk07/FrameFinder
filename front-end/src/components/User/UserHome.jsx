import "./UserHome.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
import Nodata from "../Nodata/Nodata";

const UserHome = () => {
  // show Loader
  const [showloader, setShowloader] = useState(false);

  const navigate = useNavigate();

  //use effect for photographers profile

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    setShowloader(true);

    axios
      // .get("http://localhost:2222/api/photographer/all-profile")
      .get(`${BASE_URI}/api/photographer/all-profile`)
      .then((data) => {
        console.log(data.data.data);
        setProfile(data.data.data);
        setShowloader(false);
      })
      .catch((err) => {
        setShowloader(false);
        console.log(err);
      });
  }, []);

  ///////////Photographer Profile review

  const photographerProfile = (id) => {
    navigate(`/photographer-review/${id}`);
  };

  //////////////////////////////////////////


  //////Scrolling Section
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    console.log(direction);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="userhome-main-body">
        {/* //introduction sec */}

        <div className="userhome-introduction-body">
          <div className="userhome-intro-left-body">
            <img src="/img-frame2.png" className="userhome-intro-image-sec" />
            <img src="7.jpg" alt="" className="userhome-intro-body-img" />
          </div>

          <div className="userhome-intro-right-body">
            <div className="userhome-intro-title">
              Discover Your <br /> Perfect Wedding Photographer
            </div>
            <p className="userhome-intro-paragraph">
              Welcome to Frame Finder, your premier destination for selecting
              exceptional photographers to capture your most cherished memories.
              At Frame Finder, we specialize in delivering premium services and
              ensuring unique results for your wedding photography needs. Trust
              us to help you find the perfect photographer who will beautifully
              encapsulate your special moments, ensuring they are preserved for
              a lifetime of enjoyment.
            </p>
            <button
              className="userhome-intro-button"
              onClick={() => navigate("/user/booking")}
            >
              Book Now
              <div className="userhome-intro-back-btn"></div>
            </button>
          </div>
        </div>
        {/* //////////////// */}
        <div className="userhome-photographers-area">
          <div className="userhome-photographers-title">
            Featured Photographers
          </div>
          <div className="userhome-photographers-description">
            Meet some of the exceptional photographers in our Frame Finder
            community. These talented individuals have been selected for their
            outstanding work, creativity, and dedication to their craft.
            Discover their unique styles, explore their portfolios, and get
            inspired by their stunning photography.
          </div>
          <div className="userhome-photographers-title">Why Featured?</div>

          <div className="userhome-photographers-description">
            <ul>
              <li>
                Exceptional Talent: Our featured photographers have demonstrated
                exceptional skill and artistic vision in their work.
              </li>
              <li>
                Diverse Styles: From portrait and landscape to event and fine
                art photography, explore a variety of genres and styles.
              </li>
              <li>
                Inspiring Portfolios: Get inspired by the creativity and
                dedication showcased in their portfolios.
              </li>
              <li>
                Professional Excellence: These photographers have earned
                recognition for their professionalism and quality of service.
              </li>
            </ul>
          </div>

          <div
            className={
              showloader == true
                ? "userhome-photographers-loader-sec"
                : "userhome-photographers-profile-sec"
            }
          >
            {showloader == true ? (
              <Loader />
            ) : (
              <>
                {profile.length !== 0 ? (
                  <>
                    <img
                      src="/arrow.png"
                      className="left-arrow"
                      onClick={() => scroll("left")}
                    />
                    <div
                      className="userhome-photographers-profile-scroll-body"
                      ref={scrollContainerRef}
                    >
                      {profile.map((data) => (
                        <>
                          <div
                            className="userhome-photographers-profile-main-body"
                            key={data._id}
                          >
                            <img
                              src={`${data.profile}`}
                              // src={`/upload/${data.profile}`}
                              alt=""
                              className="userhome-photographer-profile"
                            />
                            {data.name}
                            <div className="userhome-photographers-profile-body-bottom">
                              <button
                                className="userhome-photographers-profile-btn"
                                onClick={() =>
                                  photographerProfile(data.login_id)
                                }
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    <img
                      src="/arrow.png"
                      className="right-arrow"
                      onClick={() => scroll("right")}
                    />

                    {/* {profile.map((data) => (
                        <>
                          <div
                            className="userhome-photographers-profile-main-body"
                            key={data._id}
                          >
                            <img
                              src={`${data.profile}`}
                              // src={`/upload/${data.profile}`}
                              alt=""
                              className="userhome-photographer-profile"
                            />
                            {data.name}
                            <div className="userhome-photographers-profile-body-bottom">
                              <button
                                className="userhome-photographers-profile-btn"
                                onClick={() =>
                                  photographerProfile(data.login_id)
                                }
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </>
                      ))} */}
                  </>
                ) : (
                  <>
                    <Nodata />
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* ///Gallery section */}
        <div className="userhome-gallery-sec">
          <div className="userhome-gallery-title-description-sec">
            <div className=" userhome-gallery-title">Timeless Snapshots</div>
            <div>
              Welcome to our "Timeless Snapshots" gallery, a curated collection
              of photographs that capture the essence of unforgettable moments.
              Each image in this gallery is a window into a unique story, a
              fleeting moment preserved forever in time. From candid portraits
              to breathtaking landscapes, these photographs transcend the
              ordinary, offering a glimpse into the beauty and diversity of
              life's most precious memories.
            </div>

            <div className="userhome-gallery-title">Explore the Gallery:</div>
            <ul>
              <li>
                <b> Moments of Joy </b>:Delight in the smiles, laughter, and joy
                captured in these heartwarming images.
              </li>
              <li>
                <b>Scenic Wonders </b>: Travel through stunning landscapes and
                scenic vistas that showcase the beauty of our world.
              </li>
              <li>
                <b>Candid Expressions </b>: Experience the raw and genuine
                emotions in candid shots that tell authentic stories.
              </li>
              <li>
                <b>Cultural Richness </b>: Discover the diverse cultures and
                traditions through vibrant and dynamic photographs.
              </li>
              <li>
                <b>Everyday Magic </b>: Appreciate the simple yet profound
                moments that often go unnoticed in our daily lives.
              </li>
            </ul>
          </div>

          {/* ///////// */}
          <div className="userhome-gallery">
            <div className="userhome-gallery-column">
              <img src="/3.jpg" alt="" className="userhome-gallery-img" />
              <img src="/12.jpg" alt="" className="userhome-gallery-img" />
              <img src="/4.webp" alt="" className="userhome-gallery-img" />
              <img src="/1.webp" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-column">
              <img src="/5.webp" alt="" className="userhome-gallery-img" />
              <img src="/6.jpg" alt="" className="userhome-gallery-img" />
              <img src="/10.jpg" alt="" className="userhome-gallery-img" />
              <img src="/7.jpg" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-column">
              <img src="/11.jpeg" alt="" className="userhome-gallery-img" />
              <img src="/9.jpg" alt="" className="userhome-gallery-img" />
              <img src="/7.jpg" alt="" className="userhome-gallery-img" />
              <img src="/13.jpg" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-column">
              <img src="/10.jpg" alt="" className="userhome-gallery-img" />
              <img src="/8.jpeg" alt="" className="userhome-gallery-img" />
              <img src="/2.webp" alt="" className="userhome-gallery-img" />
              <img src="/4.webp" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-column">
              <img src="/15.jpg" alt="" className="userhome-gallery-img" />
              <img src="/14.webp" alt="" className="userhome-gallery-img" />
              <img src="/13.jpg" alt="" className="userhome-gallery-img" />
              <img src="/1.webp" alt="" className="userhome-gallery-img" />
            </div>
          </div>
        </div>

        {/* ////////////Content section */}

        <div className="userhome-text-body">
          <div className="userhome-text-main-title">
            Discover Exceptional Photography with FrameFinder
          </div>

          <div>
            <div className="userhome-text-title">
              Your Ultimate Photography Solution
            </div>
            <p>
              FrameFinder connects you with top-tier photographers for any
              occasion, ensuring your special moments are immortalized with
              stunning visuals.
            </p>
          </div>

          <div>
            <div className="userhome-text-title">
              Diverse Portfolio and Styles
            </div>
            <p>
              Browse through a curated selection of skilled photographers,
              exploring various styles and specialties to find one that aligns
              with your vision.
            </p>
          </div>

          <div>
            <div className="userhome-text-title">User-Friendly Experience</div>
            <p>
              Easily compare rates, read authentic reviews, and view detailed
              profiles, including previous work and client testimonials, to make
              an informed decision.
            </p>
          </div>

          <div>
            <div className="userhome-text-title">Seamless Booking Process</div>
            <p>
              Check availability and secure your session directly through our
              platform, eliminating the hassle of back-and-forth communications.
            </p>
          </div>

          <div>
            <div className="userhome-text-title">
              A Community of Passionate Photographers
            </div>
            <p>
              Trust FrameFinder to connect you with dedicated professionals who
              will turn your moments into timeless art, preserving your memories
              beautifully. Your perfect shot is just a booking away.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
