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
            <div className="userhome-intro-image-sec">
              <img src="2.webp" alt="" className="userhome-intro-body-img" />
            </div>
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
          </div>
        </div>


<div className="userhome-sub">
  
</div>



      </div>
    </div>
  );
};

export default UserHome;
