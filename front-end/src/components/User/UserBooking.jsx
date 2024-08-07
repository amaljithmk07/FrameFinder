import React, { useEffect, useRef, useState } from "react";
import "./UserBooking.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
import Nodata from "../Nodata/Nodata";

const UserBooking = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // show Loader
  const [showloader, setShowloader] = useState(false);

  //use effect for photographers profile

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    setShowloader(true);
    axios
      // .get("http://localhost:2222/api/photographer/all-profile")
      .get(`${BASE_URI}/api/photographer/all-profile`)
      .then((data) => {
        console.log(data.data.data);
        setShowloader(false);

        setProfile(data.data.data);
      })
      .catch((err) => {
        setShowloader(false);

        console.log(err);
      });
  }, []);

  ///////////
  const photographerProfile = (id) => {
    navigate(`/photographer-review/${id}`);
  };
  /////////////

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
    <div className="userbooking-main-body">
      <Toaster />
      <div className="userbooking-image-body">
        <div className="userbooking-text-body">
          <div className="userbooking-text-wrap">
            <div className="userbooking-text-quote">Capture</div>
            <div className="userbooking-text-quote">your ideal wedding</div>
            <div className="userbooking-text-quote">moments today.</div>
          </div>
          <button
            className="userbooking-text-body-button"
            onClick={() =>
              document
                .getElementById("photographer-area")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Now
          </button>
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
      <div className="userbooking-photographer-sec" id="photographer-area">
        <div className="userbooking-photographer-title">
          Book Your Ideal Photographer
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
                              onClick={() => photographerProfile(data.login_id)}
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
                    <div
                      className="userhome-photographers-profile-main-body"
                      key={data._id}
                    >
                      <img
                        // src={`/upload/${data.profile}`}
                        src={`${data.profile}`}
                        alt=""
                        className="userhome-photographer-profile"
                      />
                      {data.name}
                      <div className="userhome-photographers-profile-body-bottom">
                        <button
                          className="userhome-photographers-profile-btn"
                          onClick={() => photographerProfile(data.login_id)}
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
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
        <div className="userhome-photographers-profile-text">
          Discover and book the perfect photographer for your needs. Browse our
          curated list of professional photographers, visit their websites to
          review their stunning photo collections, and book directly through
          their site for a seamless experience.
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
