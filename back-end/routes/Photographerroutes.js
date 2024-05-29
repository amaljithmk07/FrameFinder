const express = require("express");
const mongoose = require("mongoose");
const photographerroutes = express.Router();
const PhotographersRegisterDB = require("../models/PhotoRegisterSchema");
const LoginDB = require("../models/Loginschema");

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

module.exports = photographerroutes;
