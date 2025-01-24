import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoReducer from "./reducers/reducer";
import App from "./components/App";
import "./index.css";
import "../src/components/App.css";

const store = createStore(todoReducer);

// Use createRoot from "react-dom/client"
const root = createRoot(document.getElementById("root"));

// Render the app inside the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
