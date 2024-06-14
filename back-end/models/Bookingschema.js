const mongoose = require("mongoose");
const Bookingschema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login_DB",
    required: true,
  },
  photographers_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login_DB",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "",
    required: true,
  },
});
const Data = mongoose.model("Booking_DB", Bookingschema);
module.exports = Data;
