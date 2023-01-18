import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import "./index.css";

const DEV_URL = "http://localhost:4000";
const PROD_URL = "https://habito-api.onrender.com";
const API_ROOT = process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;
axios.defaults.baseURL = API_ROOT;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
