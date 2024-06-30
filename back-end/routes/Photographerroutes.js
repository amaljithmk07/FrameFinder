const express = require("express");
const mongoose = require("mongoose");
const photographerroutes = express.Router();
const PhotographersRegisterDB = require("../models/PhotoRegisterSchema");
const LoginDB = require("../models/Loginschema");
const BookingDB = require("../models/Bookingschema");
const CalendarDB = require("../models/CalendarSchema");
const checkAuth = require("../middleware/CheckAuth");
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../front-end/public/upload");
  },
  //   filename: (req, file, cb) => {
  // cb(null, file.originalname);
  //   },
  // });
  filename: (req, file, cb) => {
    // cb(null, Date.now() + path.extname(file.originalname));
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

///////////All Profile
photographerroutes.get("/all-profile", async (req, res) => {
  try {
    const allProfile = await PhotographersRegisterDB.find();
    if (allProfile) {
      return res.status(200).json({
        success: false,
        error: true,
        message: "All photographers profile ",
        data: allProfile,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////////  Individual Profile
photographerroutes.get("/seperate-profile/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const Data = await LoginDB.aggregate([
      [
        {
          $lookup: {
            from: "photoregister_dbs",
            localField: "_id",
            foreignField: "login_id",
            as: "results",
          },
        },
        {
          $unwind: {
            path: "$results",
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $group: {
            _id: "$_id",
            login_id: {
              $first: "$results.login_id",
            },
            email: {
              $first: "$email",
            },
            profile: {
              $first: "$results.profile",
            },
            name: {
              $first: "$results.name",
            },
            phone: {
              $first: "$results.phone",
            },
            date_of_birth: {
              $first: "$results.date_of_birth",
            },
            place: {
              $first: "$results.place",
            },
            image: {
              $first: "$results.image",
            },
          },
        },
      ],
    ]);
    console.log("Data", Data);
    if (Data) {
      return res.status(200).json({
        success: false,
        error: true,
        message: "All photographers profile ",
        data: Data,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////////Previous pending Booking
photographerroutes.get("/previous-booking", checkAuth, async (req, res) => {
  try {
    console.log(req.userData.userId);
    const allBooking = await BookingDB.find({
      photographers_id: req.userData.userId,
      $or: [{ status: "rejected" }, { status: "pending" }],
    });
    if (allBooking) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Booking list fetched ",
        data: allBooking,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Selected Booking details

photographerroutes.get("/booking/:id", checkAuth, async (req, res) => {
  try {
    const Booking = await BookingDB.find({
      _id: req.params.id,
    });
    if (Booking) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Successful",
        data: Booking,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Accepting Booking

photographerroutes.put("/accept-booking/:id", checkAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const Booking = await BookingDB.updateOne(
      {
        photographers_id: req.userData.userId,
        _id: req.params.id,
      },
      {
        $set: { status: "accepted", rejection_note: "" },
      }
    );
    const savedBooking = await BookingDB.findOne({
      _id: req.params.id,
    });

    const Calender = {
      photographer_id: req.userData.userId,
      booking_id: savedBooking._id,
      date: savedBooking.date,
    };
    const CalenderData = await CalendarDB(Calender).save();

    if (Booking && CalenderData) {
      return res.status(200).json({
        success: true,
        error: false,
        message: " Bookings accepted ",
        data: Booking,
        Calender,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Rejecting Booking

photographerroutes.put("/reject-booking/:id", checkAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const Booking = await BookingDB.updateOne(
      {
        photographers_id: req.userData.userId,
        _id: req.params.id,
      },
      {
        $set: { status: "rejected", rejection_note: req.body.rejection_note },
      }
    );
    const Calender = await CalendarDB.deleteOne({
      booking_id: req.params.id,
      photographer_id: req.userData.userId,
    });
    console.log(Booking);
    if (Booking && Calender) {
      return res.status(200).json({
        success: true,
        error: false,
        message: " Bookings Rejected ",
        data: Booking,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Accepted Bookings Lists

photographerroutes.get("/accepted-bookings", checkAuth, async (req, res) => {
  try {
    const Booking = await BookingDB.find({
      status: "accepted",
      photographers_id: req.userData.userId,
    });
    if (Booking) {
      return res.status(200).json({
        success: true,
        error: false,
        message: " Bookings Fetched successful ",
        data: Booking,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Calendar Setup

photographerroutes.get("/calendar", checkAuth, async (req, res) => {
  try {
    const calendarData = await CalendarDB.aggregate([
      {
        $lookup: {
          from: "booking_dbs",
          localField: "booking_id",
          foreignField: "_id",
          as: "results",
        },
      },
      {
        $unwind: {
          path: "$results",
        },
      },
      {
        $match: {
          photographer_id: new mongoose.Types.ObjectId(req.userData.userId),
        },
      },
      {
        $group: {
          _id: "$_id",
          photographer_id: {
            $first: "$photographer_id",
          },
          name: {
            $first: "$results.name",
          },
          date: {
            $first: "$date",
          },
          email: {
            $first: "$results.email",
          },
          phone: {
            $first: "$results.phone",
          },
          address: {
            $first: "$results.address",
          },
          city: {
            $first: "$results.city",
          },
          state: {
            $first: "$results.state",
          },
        },
      },
    ]);

    if (calendarData) {
      return res.status(200).json({
        success: true,
        error: false,
        message: " Data Fetched successful ",
        data: calendarData,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Photographer Profile

photographerroutes.get("/profile", checkAuth, async (req, res) => {
  try {
    const profile = await PhotographersRegisterDB.findOne({
      login_id: req.userData.userId,
    });
    if (profile) {
      return res.status(200).json({
        success: true,
        error: false,
        message: " Profile Fetched successful ",
        data: profile,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "404 error",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errorMessage: err.message,
    });
  }
});

///////Photographer Images Upload

photographerroutes.post(
  "/upload-images",
  upload.array("image", 10),
  checkAuth,
  async (req, res) => {
    console.log(req.files);
    try {
      const photographer = await PhotographersRegisterDB.findOne({
        login_id: req.userData.userId,
      });

      const existingImages = photographer.image || [];
      const imageUpload = await req.files.map((file) => file.originalname);

      const newUploadedImage = existingImages.concat(imageUpload);
      console.log(newUploadedImage);
      photographer.image = newUploadedImage;
      await photographer.save();

      if (newUploadedImage) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "Image Upload successful ",
          data: newUploadedImage,
        });
      } else
        (err) => {
          return res.status(400).json({
            success: false,
            error: true,
            message: "404 error",
            errorMessage: err.message,
          });
        };
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Network Error",
        errorMessage: err.message,
      });
    }
  }
);

module.exports = photographerroutes;
