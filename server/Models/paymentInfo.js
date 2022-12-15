const mongoose = require("mongoose");

//Create a new Schema for payment information of users
const paymentSchema = new mongoose.Schema({
  card: {
    type: Object,
    holderName: {
      type: String,
    },
    expirationDate: {
      type: String,
    },
    cardNo: {
      type: String,
    },
    cvvCode: {
      type: String,
    },
  },
  upiId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

//Create new collection of payment information using the new schema
const newCollection = new mongoose.model("paymentCollection", paymentSchema);

module.exports = newCollection;
