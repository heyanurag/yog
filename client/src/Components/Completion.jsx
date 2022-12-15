import "./Completion.css";
import React from "react";
import paymentComplete from "./../paymentComplete.PNG";

function Completion() {
  //After completion of payment just return to homepage
  const ReturnToHome = () => {
    window.location.reload();
  };

  return (
    <div className="completionContainer">
      <img src={paymentComplete} />
      <h>Payment Complete</h>
      <div className="details">
        <h>Name :{String(localStorage.getItem("name"))} </h>
        <h>Age : {String(localStorage.getItem("age"))} years </h>
        <h>Start Date : {String(localStorage.getItem("startDate"))} </h>
        <h>Batch : {String(localStorage.getItem("batchNumber"))} </h>
        <h>Fees Paid : 500 Rs. </h>
      </div>
      <button type="button" onClick={ReturnToHome}>
        Return to home <i class="fas fa-home"></i>
      </button>
    </div>
  );
}

export default Completion;
