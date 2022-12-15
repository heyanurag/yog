import "./Payment.css";
import React, { useState } from "react";

function Payment() {
  const [mode, setMode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardName, setCardName] = useState("");
  const [expDate, setExpCard] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [IFSCCode, setIfscCode] = useState("");

  //Implement the CompletePayment function as provided
  const CompletePayment = () => {
    //Store the data on database by calling the REST API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/payment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: mode,
        card: {
          holderName: cardName,
          expirationDate: expDate,
          cardNo: accountNo,
          cvvCode: IFSCCode,
        },
        upiId: upiId,
        email: localStorage.getItem("email"),
      }),
    })
      .then((response) => response.json())
      //Response from the REST API
      .then((responseData) => {
        const message_id = responseData.message_id;
        //If data is updated or stored successfully
        if (message_id == 1 || message_id == 3) {
          document.querySelector(".paymentContainer").style.display = "none";
          document.querySelector(".completionContainer").style.display = "flex";
        }
        //Else create mock up box for any other response
        else {
          const message = responseData.message;
          window.alert(message);
        }
      })
      .catch((err) => {
        console.log(`Error in accessing the server is ${err}`);
      });
  };

  return (
    <div className="paymentContainer">
      <h className="amountDisclaimer">Net amount to be paid: 500 (in Rupess)</h>
      <h className="optionsHeader">Choose Payment mode:</h>
      <div>
        <div className="cardDiv">
          <div className="optionDiv">
            <input
              type="radio"
              id="card"
              name="optionNo"
              value={mode}
              onChange={(e) => setMode("card")}
            />
            <label for="card">Debit/ATM Card</label>
          </div>
          <div className="cardDetailsDiv">
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Card holder's name"
            />
            <input
              type="text"
              id="expDate"
              name="expDate"
              value={expDate}
              onChange={(e) => setExpCard(e.target.value)}
              placeholder="Expiration date"
            />
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              placeholder="Card Number"
            />
            <input
              type="password"
              id="IFSCCode"
              name="IFSCCode"
              value={IFSCCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="CVV Code"
            />
          </div>
        </div>
        <div className="upiDiv">
          <div className="optionDiv">
            <input
              type="radio"
              id="UPI"
              name="optionNo"
              value={mode}
              onChange={(e) => setMode("upi")}
            />
            <label for="UPI">UPI</label>
          </div>
          <input
            type="text"
            id="UPI_ID"
            name="upi_id"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="UPI Id"
          />
        </div>
        <button className="toCompletion" onClick={CompletePayment}>
          Complete Payment <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      {/*<Loader
                    className="loader"
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
            />*/}
    </div>
  );
}

export default Payment;
