const mongoose = require("mongoose");
const Registerschema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login_DB",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("Register_DB", Registerschema);
module.exports = Data;
