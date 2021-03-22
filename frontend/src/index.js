import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { ToastContainer, Zoom } from "react-toastify";
ReactDOM.render(
  <Provider store={store}>
    <ToastContainer position="bottom-center" transition={Zoom} />
    <App />
  </Provider>,
  document.getElementById("root")
);
