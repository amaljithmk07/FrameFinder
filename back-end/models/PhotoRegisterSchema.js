const mongoose = require("mongoose");
const PhotoRegisterSchema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Login_DB",
  },
  profile: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  date_of_birth: {
    type: String,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
});
const data = mongoose.model("PhotoRegister_DB", PhotoRegisterSchema);
module.exports = data;
