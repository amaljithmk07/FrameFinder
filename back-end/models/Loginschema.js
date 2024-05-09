const mongoose = require("mongoose");
const Loginschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("Login_DB", Loginschema);
module.exports = Data;
