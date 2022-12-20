import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DashboardProvider } from "./contexts/DashboardContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
