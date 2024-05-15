import "./UserHome.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserHome = () => {
  return (
    <div>
      <div className="userhome-main-body">
        {/* //carousel sec */}

        <div className="userhome-introduction-body">
          <div className="userhome-intro-left-body">
            {/* <div className="userhome-intro-image-sec">
              <img src="2.webp" alt="" className="userhome-intro-body-img" />
            </div> */}
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

        <div className="userhome-photographers-area">
          <div className="userhome-photographers-title">
            Featured Photographers
          </div>
          <div className="userhome-photographers-profile-sec">
            <div className="userhome-photographers-profile-body">
              <img src="2.webp" alt="" className="photographer-profile" />
            </div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
            <div className="userhome-photographers-profile-body"></div>
          </div>
        </div>

        {/* ///Gallery section */}
        <div className="userhome-gallery-sec">
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
      </div>
    </div>
  );
};

export default UserHome;
