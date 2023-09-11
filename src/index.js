// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// import { Provider } from "react-redux";
// import store from "./stores";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import stores from "./stores";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = stores;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
reportWebVitals();
