import React, { useState } from "react";
import { assign, Machine } from "xstate";
import { useMachine } from "../../utils/state-machine";
import "./Payment.less";

// Paste this in https://xstate.js.org/viz/ for state chart visualization.

// const stateMachine = Machine({
//   id: 'Payment state machine',
//   initial: "idle",
//   states: {
//     idle: {
//       on: {
//         SUBMIT: {
//           target: "loading",
//         },
//       },
//     },
//     loading: {
//       on: {
//         RESOLVE: {
//           target: "success",
//         },
//         REJECT: {
//           target: "error",
//         }
//       }
//     },
//     error: {
//       on: {
//         SUBMIT: {
//           target: "loading",
//         },
//       },
//     },
//     success: {
//       type: "final",
//     },
//   },
// });

const stateMachine = Machine({
  initial: "idle",
  context: {
    msg: "",
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: "loading",
            cond: (ctx, event) => event.data.name !== "" && event.data.card !== "",
          },
          {
            target: "error",
            actions: assign({ msg: "Please enter name and card details" }),
          },
        ],
      },
    },
    loading: {
      invoke: {
        id: "doPayment",
        src: () => fakePayment(),
        onDone: {
          target: "success",
          actions: assign({ msg: (ctx, event) => event.data }),
        },
        onError: {
          target: "error",
          actions: assign({ msg: (ctx, event) => event.data }),
        },
      },
    },
    error: {
      on: {
        SUBMIT: {
          target: "loading",
          cond: (ctx, event) => event.data.name !== "" && event.data.card !== "",
        },
      },
    },
    success: {
      type: "final",
    },
  },
});

function fakePayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dice = Math.floor(Math.random() * 2);

      if (dice === 0) return resolve("Payment succeeded.");

      return reject("Payment failed.");
    }, 1000);
  });
}

const Payment = () => {
  const [machine, send] = useMachine(stateMachine);

  const [form, updateForm] = useState({
    name: "",
    card: "",
  });

  return (
    <div className="payment-page">
      <div>
        <div className="pill-container">
          <div className="state-pill">current state: {machine.value}</div>
        </div>

        <div className="form-container">
          <div className="form-header">
            <h2>State Machine Payment Form</h2>
          </div>

          {machine.matches("error") ? (
            <div className="alert error">
              {machine.context.msg ? machine.context.msg : "Unknown error"}
            </div>
          ) : null}

          <div className="form-body">
            <form
              onSubmit={e => {
                e.preventDefault();
                send({ type: "SUBMIT", data: { ...form } });
              }}
            >
              <div className="form-group">
                <label>Name on card</label>
                <input
                  className="form-control"
                  type="text"
                  maxLength="255"
                  value={form.name}
                  onChange={e => updateForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Card number</label>
                <input
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
