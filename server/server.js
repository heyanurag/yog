//Import all dependencies,frameworks,models,routes
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000 | process.env.PORT;
const userRoute = require("./Routes/userInfoRoute");
const paymentRoute = require("./Routes/paymentInfoRoute");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;

//Setup database
mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Database connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
  })
);
app.use(express.json());

//Implement routing
app.use(userRoute);
app.use(paymentRoute);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running!`);
});
