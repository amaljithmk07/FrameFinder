const express = require("express");
const Userroutes = express.Router();
const BookingDB = require("../models/Bookingschema");

Userroutes.post("/booking", async (req, res) => {
  console.log(req.body);
  const Data = new BookingDB({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
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
        errorMessage: err,
      });
    });
});

module.exports = Userroutes;
