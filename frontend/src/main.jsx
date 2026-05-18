// ============================================
// Entry Point for React Application
// ============================================
// This file renders our root App component into the DOM.
// The <React.StrictMode> wrapper helps catch common mistakes.
// ============================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
