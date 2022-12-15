const express = require("express");
const router = express.Router();
const userCollection = require("../Models/userInfo");
const validator = require("email-validator");
//post route to verify and insert user data
router.post("/user", (req, res) => {
  //Destructure the contents of request body
  const { name, age, email, startDate, feesPaid, batchNumber } = req.body;

  //Check if all entities are present or not
  if (
    !name ||
    !age ||
    !email ||
    !startDate ||
    !feesPaid ||
    !batchNumber ||
    name == "" ||
    email == "" ||
    startDate == "NaN/undefinedundefined/" ||
    batchNumber == 0
  ) {
    res
      .status(400)
      .json({ message: "Information insufficient", message_id: "0" });
    return;
  } else {
    //Find current date
    var today = new Date();
    var day = String(today.getDate()).padStart(2, "0");
    var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var year = today.getFullYear();
    const currentDate = month + "/" + day + "/" + year; //month//day//year format

    //Perform validation check for age,email & date
    const isEmailValid = validator.validate(email);
    //You can start a batch from today's date only
    if (startDate < currentDate) {
      res.status(401).json({
        message: "Start date cannot be smaller than today's date",
        message_id: "InStDa",
      });
      return;
    }
    //If email and age both are invalid
    else if (isEmailValid == false && (age < 18 || age > 65)) {
      res.status(401).json({
        message: "Invalid email address and invalid age",
        message_id: "InEmInAg",
      });
      return;
    }
    //If only email is invalid
    else if (isEmailValid == false) {
      res
        .status(401)
        .json({ message: "Invalid email address", message_id: "InEm" });
      return;
    }
    //If only age is invalid
    else if (age < 18 || age > 65) {
      res
        .status(401)
        .json({ message: "Age must be between 18 & 65", message_id: "InAg" });
      return;
    }

    //Find whether the user has an active plan or not
    userCollection
      .findOne({ email: email })
      .then((savedUser) => {
        //If user already have an active plan
        if (savedUser) {
          //Get total days between start date and current date
          const userStartDate = String(savedUser.startDate);

          const Time_difference =
            Number(new Date(currentDate).getTime()) -
            Number(new Date(userStartDate).getTime());

          const Days_difference = Time_difference / (1000 * 60 * 60 * 24);

          //If one month is complete then update current date of existing user
          if (Days_difference > 30) {
            userCollection
              .updateOne({ email: email }, { $set: { startDate: currentDate } })
              .then((updatedUser) => {
                res.status(200).json({
                  message: "successfull",
                  data: updatedUser,
                  message_id: "1",
                });
                return;
              })
              .catch((err) => {
                console.log(`Error in updation of new start date is ${err}`);
                return;
              });
          }

          //Else if one month is not complete
          else {
            res.status(403).json({
              message: "User exist and plan is active",
              message_id: "2",
            });
            return;
          }
        }
        //Else store information of user
        else {
          //Make a new document with the user information
          const userData = new userCollection({
            name: name,
            age: age,
            email: email,
            startDate: startDate,
            feesPaid: feesPaid,
            batchNumber: batchNumber,
          });

          //Save the document to the database
          userData
            .save()
            .then((data) => {
              //If user stored successfully
              res
                .status(401)
                .json({ message: "successfull", data: data, message_id: "3" });
              return;
            })
            .catch((err) => {
              //If any error comes in storing
              console.log(`Error in inserting new user is ${err}`);
            });
        }
      })
      .catch((err) => {
        console.log(`Error in finding existing user is ${err}`);
      });
  }
});

module.exports = router;
