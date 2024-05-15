const express = require("express");
const Loginroutes = express.Router();
const LoginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

Loginroutes.post("/", async (req, res) => {
  try {
    const lower_email = req.body.email.toLowerCase();
    console.log(lower_email);
    if (lower_email && req.body.password) {
      const olduser = await LoginDB.findOne({ email: lower_email });
      if (!olduser) {
        return res.status(400).json({
          success: true,
          error: false,
          message: "User Doesn't exist",
        });
      }
      const passwordcorrect = await bcrypt.compare(
        req.body.password,
        olduser.password
      );
      if (!passwordcorrect) {
        return res.status(400).json({
          success: true,
          error: false,
          message: "Password doesnt match",
        });
      }
      const token = await jwt.sign(
        {
          userId: olduser._id,
          userEmail: olduser.email,
          userRole: olduser.role,
        },
        "this_should_be_secret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        success: true,
        error: false,
        message: "Login Successful",
        token: token,
        userId: olduser._id,
        userRole: olduser.role,
        userEmail: olduser.email,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Failed",
      errorMessage: err.message,
    });
  }
});
module.exports = Loginroutes;
