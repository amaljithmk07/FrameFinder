const express = require("express");
const Userroutes = express.Router();
const BookingDB = require("../models/Bookingschema");
const CheckAuth = require("../middleware/CheckAuth");
const mongoose = require("mongoose");

//////////Booking

Userroutes.post("/booking/:id", CheckAuth, async (req, res) => {
  console.log(req.body);
  const oldData = await BookingDB.findOne({
    login_id: req.userData.userId,
    photographers_id: req.params.id,
    email: req.body.email,
    phone: req.body.phone,
    $or: [{ status: "pending" }, { status: "accepted" }],
  });
  if (oldData) {
    return res.status(400).json({
      success: false,
      error: true,
      errorMessage: "You are already booked ",
    });
  }
  const Data = new BookingDB({
    login_id: req.userData.userId,
    photographers_id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    date: req.body.date,
    status: "pending",
  });
  Data.save()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        message: "failed",
        errorMessage: err.message,
      });
    });
});

///Rejected msg showing for notification

Userroutes.get("/notification", CheckAuth, async (req, res) => {
  const Data = await BookingDB.aggregate([
    {
      $lookup: {
        from: "photoregister_dbs",
        localField: "photographers_id",
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
        login_id: new mongoose.Types.ObjectId(req.userData.userId),
        status: "rejected",
      },
    },

    {
      $group: {
        _id: "$_id",
        login_id: {
          $first: "$login_id",
        },
        status: {
          $first: "$status",
        },
        photographer_name: {
          $first: "$results.name",
        },
        name: {
          $first: "$name",
        },
        date: {
          $first: "$date",
        },
        rejection_note: {
          $first: "$rejection_note",
        },
      },
    },
  ])
    .then((Data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Notification fetched success",
        data: Data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        message: "failed",
        errorMessage: err.message,
      });
    });
});

module.exports = Userroutes;
