import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PhotoBookingPreview.css";
import BASE_URI from "../Constant/Constant";
import axios from "axios";
import Loader from "../Loader/Loader";

const PhotoBookingPreview = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  // show Loader
  const [showloader, setShowloader] = useState(false);

  ////////Bookings State
  const [booking, setBooking] = useState([]);

  //////////Rejection Note display
  const [rejectionNoteBody, setRejectionnoteBody] = useState(false);

  useEffect(() => {
    setShowloader(true);
    axios
      // .post(`http://localhost:2222/api/user/booking/${id}`, formData, {
      .get(`${BASE_URI}/api/photographer/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setBooking(data.data.data);
        setShowloader(false);
      })
      .catch((err) => {
        setShowloader(false);
        console.log(err);
      });
  }, []);

  ////Accept the booking
  const acceptBooking = () => {
    axios
      .put(
        `${BASE_URI}/api/photographer/accept-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        const filterdata = booking.filter((data) => {
          return (data.status = "accepted");
        });
        setBooking(filterdata);
        setRejectionnoteBody(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////Rejection Note Handler

  const rejectionNoteHandler = () => {
    setRejectionnoteBody(true);
  };

  //////Rejection form data
  const [rejectionform, setRejectionform] = useState({});

  const rejectionNoteformHandler = (e) => {
    const { name, value } = e.target;
    setRejectionform({ ...rejectionform, [name]: value });
  };
  console.log(rejectionform);
  ////Reject the booking
  const rejectBooking = () => {
    axios
      .put(`${BASE_URI}/api/photographer/reject-booking/${id}`, rejectionform, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        const filterdata = booking.filter((data) => {
          return (data.status = "rejected");
        });
        setRejectionnoteBody(false);

        setBooking(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="p-booking-preview-main-body">
        {showloader == true ? (
          <Loader />
        ) : (
          <>
            <div className="p-booking-preview-sub-body">
              <img
                src="/hamb-close.png"
                onClick={() => navigate(-1)}
                className="p-booking-preview-back-btn"
              />
              {booking.map((data) => (
                <div className="p-booking-preview-form-body" key={data._id}>
                  <div className="p-booking-preview-data">
                    id :66546546544565465
                  </div>
                  <div className="p-booking-preview-data">
                    Name :{data.name}
                  </div>
                  <div className="p-booking-preview-data">
                    Email :{data.email}
                  </div>
                  <div className="p-booking-preview-data">
                    Date :{data.date}
                  </div>
                  <div
                    className="p-booking-preview-data"
                    style={
                      data.status == "accepted"
                        ? { color: "green" }
                        : data.status == "rejected"
                        ? { color: "red" }
                        : { color: "blue" }
                    }
                  >
                    Status :{data.status}
                  </div>
                  <div className="p-booking-preview-data">
                    Place :{data.address}
                  </div>
                  <div className="p-booking-preview-data">
                    State :{data.state}
                  </div>
                  <div className="p-booking-preview-data"> Phone :9652348</div>
                  <div className="p-booking-preview-data">
                    Type :wedding Photography
                  </div>
                  {/* <div className="p-booking-preview-data">
                    {" "}
                    Description :{" "}
                    {data.rejection_note ? data.rejection_note : ""}
                  </div> */}
                  <div className="p-booking-preview-data">
                    {" "}
                    <button
                      className="p-booking-preview-btn accept"
                      onClick={acceptBooking}
                      style={
                        data.status == "accepted"
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="p-booking-preview-btn reject"
                      onClick={rejectionNoteHandler}
                      style={
                        data.status == "rejected"
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}

              {rejectionNoteBody == true ? (
                <div className="p-booking-rejection-body">
                  <div className="p-booking-rejection-title">
                    Rejection Note
                  </div>
                  <textarea
                    onChange={rejectionNoteformHandler}
                    name="rejection_note"
                    id=""
                    className="p-booking-rejection-textarea"
                  ></textarea>
                  <button
                    onClick={rejectBooking}
                    className="p-booking-rejection-btn"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoBookingPreview;
