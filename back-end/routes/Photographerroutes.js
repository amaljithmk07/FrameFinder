const express = require("express");
const mongoose = require("mongoose");
const photographerroutes = express.Router();
const PhotographersRegisterDB = require("../models/PhotoRegisterSchema");
const LoginDB = require("../models/Loginschema");
const BookingDB = require("../models/Bookingschema");
const CalenderDB = require("../models/CalenderSchema");
const checkAuth = require("../middleware/CheckAuth");

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
          },
        },
      ],
    ]);
    console.log(Data);
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
      // $or: [{ status: "rejected" }, { status: "pending" }],
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
    const Booking = await BookingDB.updateOne({
      _id: req.params.id,
      status: "accepted",
    });
    const savedBooking = await BookingDB.findOne({
      _id: req.params.id,
    });

    const Calender = {
      photographer_id: req.userData.userId,
      booking_id: savedBooking._id,
      date: savedBooking.date,
    };
    const CalenderData = await CalenderDB(Calender).save();

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
    const Booking = await BookingDB.updateOne({
      _id: req.params.id,
      status: "rejected",
    });
    const Calender = await CalenderDB.deleteOne({
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

///////Accepted Bookings

photographerroutes.get("/accepted-bookings", checkAuth, async (req, res) => {
  try {
    const Booking = await BookingDB.find({
      status: "accepted",
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
module.exports = photographerroutes;
