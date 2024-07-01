import React, { useState, useEffect } from "react";
import "./PhotoProfile.css";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
import { Link, useNavigate } from "react-router-dom";

const PhotoProfile = () => {
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

  ///delete uploaded images

  const imagedeleteHandler = (name) => {
    axios
      .get(`${BASE_URI}/api/photographer/delete-uploaded-image/${name}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);

        const UpdatedData = {
          ...photoprofile,
          image: photoprofile.image.filter((data) => data != name),
        };
        setPhotoProfile(UpdatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="p-profile-main-body">
        <div className="p-profile-body">
          <img
            src="/edit.png"
            to={"/photographer-profile-update"}
            className="p-profile-update-btn"
            onClick={() => navigate("/photographer-profile-update")}
          />
          <img
            src={`/upload/${photoprofile?.profile}`}
            alt=""
            className="p-profile-photo"
          />
          <div className="p-profile-data-sec">
            <div className="p-profile-data">{photoprofile.name}</div>
            <div className="p-profile-data">{photoprofile.login_id}</div>
            <div className="p-profile-data">{photoprofile.email}</div>
            <div className="p-profile-data">{photoprofile.phone}</div>
            <div className="p-profile-data">{photoprofile.date_of_birth}</div>
            <div className="p-profile-data">{photoprofile.place}</div>
          </div>
        </div>
        <div className="p-profile-gallery-body">
          <div className="p-profile-gallery-title">Through the Lens</div>
          <div className="p-profile-gallery-sec">
            {photoprofile.image?.map((data, index) => (
              <div className="p-profile-gallery-img-sec" key={index}>
                <img
                  src={`/upload/${data}`}
                  alt={`User Image ${index + 1}`}
                  className="p-profile-gallery-img"
                />
                <img
                  src="/delete.png"
                  className="p-profile-gallery-img-dlt"
                  onClick={() => imagedeleteHandler(data)}
                />
                <div className="p-profile-gallery-img-name">{data}</div>
              </div>
            ))}
          </div>
          <div className="p-profile-gallery-description">
            Your images will be displayed here. To add more photos and expand
            your gallery, click the link provided to upload new images and
            enrich your collection.
            <Link to={"/home"}>Click here </Link>for upload more photos
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoProfile;
