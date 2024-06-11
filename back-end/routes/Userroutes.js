const express = require("express");
const Userroutes = express.Router();
const BookingDB = require("../models/Bookingschema");
const CheckAuth = require("../middleware/CheckAuth");

Userroutes.post("/booking/:id", CheckAuth, async (req, res) => {
  console.log(req.body);
  const Data = new BookingDB({
    login_id: req.userData.userId,
    photographers_id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
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
        errorMessage: err.message,
      });
    });
});

module.exports = Userroutes;
