const mongoose = require("mongoose");
const CalendarSchema = new mongoose.Schema({
  photographer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login_DB",
    require: true,
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking_DB",
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});
const data = mongoose.model("Calender_DB", CalendarSchema);
module.exports = data;
