import React, { useState } from "react";
// import { assign, interpret, Machine } from "xstate";
import "./Payment.less";

const Payment = props => {
  const [form, updateForm] = useState({
    name: "",
    card: "",
  });
  return (
    <div className="payment-page">
      <div>
        <div className="pill-container">
          {/* <div className="state-pill">current state: {machine.value}</div>*/}
        </div>

        <div className="form-container">
          <div className="form-header">
            <h2>State Machine Payment Form</h2>
          </div>

          {/* {machine.matches("error") ? (*/}
          {/*  <div className="alert error">*/}
          {/*    {machine.context.msg*/}
          {/*      ? machine.context.msg*/}
          {/*      : "Oh no! No error message."}*/}
          {/*  </div>*/}
          {/* ) : null}*/}

          <div className="form-body">
            <form
            // onSubmit={e => {
            //   e.preventDefault();
            //   send({ type: "SUBMIT", data: { ...form } });
            // }}
            >
              <div className="form-group">
                <label htmlFor="NameOnCard">Name on card</label>
                <input
                  id="NameOnCard"
                  className="form-control"
                  type="text"
                  maxLength="255"
                  value={form.name}
                  onChange={e => updateForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="CreditCardNumber">Card number</label>
                <input
                  id="CreditCardNumber"
                  className="null card-image form-control"
                  type="text"
                  value={form.card}
                  onChange={e => updateForm({ ...form, card: e.target.value })}
                />
              </div>
              <button
                id="PayButton"
                className="btn btn-block btn-success submit-button"
                type="submit"
              >
                <span className="submit-button-lock" />
                <span className="align-middle">Pay Now</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
