import React, { useEffect, useState } from "react";
import "./PhotoProfileUpdate.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
const PhotoProfileUpdate = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const id = sessionStorage.getItem("userId");
  // show Loader
  const [showloader, setShowloader] = useState(false);

  ///for photographer profile
  const [photoprofile, setPhotoProfile] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/photographer/seperate-profile/${id}`)
      .then((data) => {
        setShowloader(false);

        console.log(data.data.data);
        setPhotoProfile(data.data.data[0]);
      })
      .catch((err) => {
        setShowloader(false);

        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="profile-update-main">
        <div className="profile-update-sub">
          <div className="profile-update-title">Profile Settings</div>
          <form action="" className="profile-update-form">
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoProfileUpdate;
