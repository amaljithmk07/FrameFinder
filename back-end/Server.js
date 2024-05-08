const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@framefinder.4d0lbay.mongodb.net/Frame Finder`,
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

const port = 2222;

server.listen(port, () => {
  console.log(`Server started  on Port ${port}`);
});
