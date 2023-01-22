import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DashboardProvider } from "./contexts/DashboardContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

// CSS FOR DEPLOYMENT, SCSS FOR DEVELOPMENT
import "./sass/main.css";
// import "./sass/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
