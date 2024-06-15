import "./UserHome.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";

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
            <button className="userhome-intro-button">Book Now</button>
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
                {profile.map((data) => (
                  <div
                    className="userhome-photographers-profile-body"
                    key={data._id}
                    onClick={() => photographerProfile(data.login_id)}
                  >
                    <img
                      src={`/upload/${data.profile}`}
                      alt=""
                      className="photographer-profile"
                    />
                  </div>
                ))}
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
            <div className="userhome-gallery-colum">
              <img src="/3.jpg" alt="" className="userhome-gallery-img" />
              <img src="/12.jpg" alt="" className="userhome-gallery-img" />
              <img src="/4.webp" alt="" className="userhome-gallery-img" />
              <img src="/1.webp" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-colum">
              <img src="/5.webp" alt="" className="userhome-gallery-img" />
              <img src="/6.jpg" alt="" className="userhome-gallery-img" />
              <img src="/10.jpg" alt="" className="userhome-gallery-img" />
              <img src="/7.jpg" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-colum">
              <img src="/11.jpeg" alt="" className="userhome-gallery-img" />
              <img src="/9.jpg" alt="" className="userhome-gallery-img" />
              <img src="/7.jpg" alt="" className="userhome-gallery-img" />
              <img src="/13.jpg" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-colum">
              <img src="/10.jpg" alt="" className="userhome-gallery-img" />
              <img src="/8.jpeg" alt="" className="userhome-gallery-img" />
              <img src="/2.webp" alt="" className="userhome-gallery-img" />
              <img src="/4.webp" alt="" className="userhome-gallery-img" />
            </div>
            <div className="userhome-gallery-colum">
              <img src="/15.jpg" alt="" className="userhome-gallery-img" />
              <img src="/14.webp" alt="" className="userhome-gallery-img" />
              <img src="/13.jpg" alt="" className="userhome-gallery-img" />
              <img src="/1.webp" alt="" className="userhome-gallery-img" />
            </div>
          </div>
        </div>

        {/* ////////////Content section */}

        <div className="userhome-text-body">
          <div className="userhome-text-title">
            FrameFinder: Your Gateway to Exceptional Photography
          </div>
          In today's digital age, capturing life's special moments with
          high-quality photography is essential. FrameFinder is your ultimate
          solution for finding and booking top-tier photographers for any
          occasion. Our platform connects you with a curated selection of
          skilled photographers, making it easy to find the perfect professional
          to meet your unique needs. FrameFinder understands that every event is
          special and deserves to be immortalized through stunning visuals.
          Whether you're planning a wedding, celebrating a milestone, organizing
          a corporate event, or seeking a family portrait, our platform offers a
          seamless experience to ensure you get the best results. By browsing
          through diverse portfolios, you can explore various styles and
          specialties, ensuring you find a photographer whose vision aligns with
          yours. We pride ourselves on providing a user-friendly experience.
          With FrameFinder, comparing competitive rates and reading authentic
          reviews is just a few clicks away. Our detailed profiles for each
          photographer include their previous work, client testimonials, and
          pricing, giving you all the information you need to make an informed
          decision. This transparency helps you feel confident in your choice,
          knowing you are selecting a professional who will deliver exceptional
          results. Booking a photographer has never been simpler. Once you've
          found the right photographer, you can easily check their availability
          and secure your session directly through our platform. This
          streamlined process eliminates the hassle of back-and-forth
          communications, allowing you to focus on preparing for your event.
          FrameFinder is more than just a booking platform; it's a community of
          passionate photographers dedicated to turning your moments into
          timeless art. Trust FrameFinder to connect you with the perfect
          photographer who will capture the essence of your special occasions,
          ensuring your memories are beautifully preserved for years to come.
          Your perfect shot is just a booking away with FrameFinder.
        </div>
      </div>
    </div>
  );
};

export default UserHome;
