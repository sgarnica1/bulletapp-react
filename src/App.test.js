import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
    div
  );
});
