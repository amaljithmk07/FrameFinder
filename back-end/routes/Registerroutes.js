const express = require("express");
const Registerroutes = express.Router();
const RegisterDB = require("../models/Registerschema");
const LoginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");

Registerroutes.post("/", async (req, res) => {
  const email = req.body.email;

  const oldemail = await LoginDB.find({ email: email });
  if (oldemail) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "User already exist",
    });
  }

  const oldphone = await RegisterDB.findOne({ phone: req.body.phone });
  if (oldphone) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Phone Number already exist",
    });
  }

  const hashedpassword = await bcrypt.hash(req.body.password, 12);

  const log = {
    email: req.body.email,
    password: hashedpassword,
    role: 2,
  };
  const log_result = await LoginDB(log).save();
  const register = {
    login_id:log_result._id,
    name: req.body.name,
    phone: req.body.name,
  };
  const register_result = await RegisterDB(register).save();


  if(log_result&&register_result){
    return res.status(200).json({
        success: true,
        error: false,
        message: "register successful",
        data: reg_result,
      });



  }
});

module.exports = Registerroutes;
