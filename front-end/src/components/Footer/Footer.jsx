import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="footer-main-body">

        <img
          src="/footer-background.jpg"
          alt=""
          className="footer-background"
        />

          <div className="footer-sub-body">
            <div className="footer-logo-sec">

            <img src="/title-logo.png" alt="" className="footer-title-logo" />
            </div>
            <div className="footer-content-sec">
              <div className="footer-content">
                <div className="footer-content-title">Quick Links</div>
                <div>Home</div>
                <div>About Us</div>
                <div>Services</div>
                <div>Gallery</div>
                <div>Pricing</div>
                <div>Blog</div>
                <div>FAQs</div>
                <div>Contact Us</div>
              </div>
              <div className="footer-content">
                <div className="footer-content-title">Contact Information</div>
                <p>
                  Address: 123 FrameFinder Lane, PhotoCity, <br /> PC 12345
                </p>
                <p>Phone: +1 (123) 456-7890</p>
                <p>Email: support@framefinder.com</p>
              </div>
              <div className="footer-content">
                <div className="footer-content-title">Follow Us</div>
                <div className="footer-icon-data">
                  <img
                    src="/twitter-icon.png"
                    alt=""
                    className="footer-social-media-logo"
                  />{" "}
                  Twitter
                </div>
                <div className="footer-icon-data">
                  {" "}
                  <img
                    src="/facebook-icon.png"
                    alt=""
                    className="footer-social-media-logo"
                  />
                  Facebook
                </div>
                <div className="footer-icon-data">
                  {" "}
                  <img
                    src="/instagram-icon.png"
                    alt=""
                    className="footer-social-media-logo"
                  />
                  Instagram
                </div>
                <div className="footer-icon-data">
                  {" "}
                  <img
                    src="/youtube-icon.png"
                    alt=""
                    className="footer-social-media-logo"
                  />
                  Youtube
                </div>
              </div>
            </div>
          </div>
        <div class="footer-bottom">
          <p>&copy; 2024 FrameFinder. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
