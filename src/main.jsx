import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
