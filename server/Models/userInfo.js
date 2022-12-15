const mongoose = require("mongoose");

//Create a new Schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: Number,
    required: true,
  },
  feesPaid: {
    type: Number,
    required: true,
  },
});

//Create new collection of users using the new schema
const newCollection = new mongoose.model("userCollection", userSchema);

module.exports = newCollection;
