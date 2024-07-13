const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Userroutes = require("./routes/Userroutes");
const Registerroutes = require("./routes/Registerroutes");
const Loginroutes = require("./routes/Loginroutes");
const photographerroutes = require("./routes/Photographerroutes");
require("dotenv").config();

mongoose
  .connect(

    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database  Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/login", Loginroutes);
server.use("/api/register", Registerroutes);
server.use("/api/user", Userroutes);
server.use("/api/photographer", photographerroutes);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server started  on Port ${port}`);
});
