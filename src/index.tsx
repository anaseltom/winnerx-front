import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  // const { publishableKey } = await axios
  //   // .get("https://stripe-api.tividad.com/config")
  //   // .post("https://ecommerce-api.tividad.com/api/v1/stripe/config")
  //   .get("https://api-stripe-apple-pay.tividad.com/config")
  //   .then((r) => r.data);

  // const stripePromise = await loadStripe(publishableKey);

  ReactDOM.render(
    <React.StrictMode>
      {/* <Elements stripe={stripePromise}> */}
      <App />
      {/* </Elements> */}
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
