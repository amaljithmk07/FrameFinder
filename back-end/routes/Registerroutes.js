const express = require("express");
const Registerroutes = express.Router();
const RegisterDB = require("../models/Registerschema");
const PhotographersRegisterDB = require("../models/PhotoRegisterSchema");
const LoginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");
const multer = require("multer");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "FrameFinder",
  },
});
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../front-end/public/upload");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

Registerroutes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const lower_email = req.body.email.toLowerCase();
    const oldemail = await LoginDB.findOne({ email: lower_email });
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
      email: lower_email,
      password: hashedpassword,
      role: 2,
    };
    const log_result = await LoginDB(log).save();
    const register = {
      login_id: log_result._id,
      name: req.body.name,
      phone: req.body.phone,
    };
    const register_result = await RegisterDB(register).save();

    if (log_result && register_result) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "register successful",
        data: register_result,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "register failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network failed",
      errorMessage: err.message,
    });
  }
});

// -------------Photographers register route-----------------------

Registerroutes.post(
  "/photographer-register",
  upload.single("profile"),
  async (req, res) => {
    try {
      console.log(req.body);
      const lower_email = req.body.email.toLowerCase();
      const oldemail = await LoginDB.findOne({ email: lower_email });
      if (oldemail) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "User already exist",
        });
      }

      const oldphone = await PhotographersRegisterDB.findOne({
        phone: req.body.phone,
      });
      if (oldphone) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Phone Number already exist",
        });
      }

      const hashedpassword = await bcrypt.hash(req.body.password, 12);

      const log = {
        email: lower_email,
        password: hashedpassword,
        role: 1,
      };
      const log_result = await LoginDB(log).save();
      const register = {
        login_id: log_result._id,
        // profile: req.file.filename,
        profile: req.file ? req.file.path : null,

        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        place: req.body.place,
        phone: req.body.phone,
      };
      const register_result = await PhotographersRegisterDB(register).save();

      if (log_result && register_result) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "register successful",
          data: register_result,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: true,
          message: "register failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Network failed",
        errorMessage: err.message,
      });
    }
  }
);

module.exports = Registerroutes;
