import React from "react";
import "./PhotoHome.css";
const PhotographerHome = () => {
  return (
    <div>
      <div className="p-home-main-body">
        <div className="p-home-intro-sec">
          <div className="p-home-intro-title">
            Join Our Network of Talented Photographers
            <p>Grow Your Photography Business with Frame Finder</p>
          </div>

          <div className="p-home-why-join-us-sec">
            <div className="p-home-why-join-us-title">Why Join Us?</div>
            <ul>
              <li>
                <strong>Expand Your Reach:</strong> Access a larger audience and
                increase your bookings by being part of our growing community.
              </li>
              <li>
                <strong>Showcase Your Work:</strong> Create a stunning profile
                with your best work to attract potential clients.
              </li>
              <li>
                <strong>Manage Bookings Easily:</strong> Our user-friendly
                platform allows you to manage your schedule, bookings, and
                client communications effortlessly.
              </li>
              <li>
                <strong>Secure Payments:</strong> Enjoy the convenience of
                secure and timely payments through our platform.
              </li>
            </ul>
          </div>

          <div className="p-home-how-it-works-sec">
            <div className="p-home-how-it-works-title">How It Works</div>
            <ol>
              <li>
                <div className="p-home-how-it-works-sub-title">
                  Sign Up and Create Your Profile
                </div>
                <p>
                  Fill out our simple registration form and create a
                  professional profile. Upload your portfolio, including
                  high-quality images that showcase your style and expertise.
                  Provide details about your services, rates, and availability.
                </p>
              </li>
              <li>
                <div className="p-home-how-it-works-sub-title">
                  Get Discovered by Clients
                </div>
                <p>
                  Our marketing efforts and search functionality make it easy
                  for clients to find photographers like you. Benefit from our
                  SEO and advertising campaigns designed to attract clients
                  looking for photography services.
                </p>
              </li>
              <li>
                <div className="p-home-how-it-works-sub-title">
                  Receive and Manage Bookings
                </div>
                <p>
                  Get notified of new booking requests and manage them through
                  your dashboard. Communicate with clients directly to discuss
                  details and finalize arrangements.
                </p>
              </li>
              <li>
                <div className="p-home-how-it-works-sub-title">
                  Deliver Exceptional Service and Get Paid
                </div>
                <p>
                  Provide outstanding service to your clients and build a strong
                  reputation through reviews. Receive secure payments directly
                  to your account after completing each job.
                </p>
              </li>
            </ol>
          </div>

          <div className="p-home-add-image-body">
            <h1>Showcase Your Best Photos</h1>
            <p>
              You can publish your best photos for users to view and book your
              services directly from the pictures you add.
            </p>

            <h2>How It Works</h2>
            <p>
              Upload your top-quality images to attract potential clients. Each
              photo can serve as a gateway for users to learn more about your
              services and make bookings.
            </p>

            <h2>Benefits</h2>
            <ul>
              <li>Increase visibility with a stunning portfolio.</li>
              <li>Convert photo views into service bookings.</li>
              <li>Build trust and showcase your expertise.</li>
            </ul>

            <h2>Get Started</h2>
            <ol>
              <li>Create an account or log in.</li>
              <li>Upload your best photos to your profile.</li>
              <li>Add details and links to your services.</li>
              <li>Publish your portfolio and start attracting clients!</li>
            </ol>

            <h2>Disclaimer</h2>
            <p>
              Please note that all photos uploaded must comply with our
              community guidelines. Any inappropriate or copyrighted content may
              be removed without notice. Users are responsible for ensuring they
              have the rights to share and publish the photos they upload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerHome;
