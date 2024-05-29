const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Userroutes = require("./routes/Userroutes");
const Registerroutes = require("./routes/Registerroutes");
const Loginroutes = require("./routes/Loginroutes");
const photographerroutes = require("./routes/Photographerroutes");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@cluster0.e23ik4t.mongodb.net/FrameFinder`,
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

server.use("/api/login",Loginroutes );
server.use("/api/register", Registerroutes);
server.use("/api/user", Userroutes);
server.use("/api/photographer",photographerroutes );

const port = 2222;
server.listen(port, () => {
  console.log(`Server started  on Port ${port}`);
});
