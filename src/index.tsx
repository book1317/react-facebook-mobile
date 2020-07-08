import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import Store from "./store/Store";
//basename={window.location.pathname || ""}
ReactDOM.render(
  <BrowserRouter>
    <Provider {...Store}>
      <Suspense fallback={<div>Loading....</div>}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
