const mongoose = require("mongoose");
const CalenderSchema = new mongoose.Schema({
  photographer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login_DB",
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});
const data = mongoose.model("Calender_DB", CalenderSchema);
module.exports = data;
