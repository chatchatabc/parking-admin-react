import React from "react";
import ReactDOM from "react-dom/client";
import RouteManager from "./application/RouteManager";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouteManager />
  </React.StrictMode>
);
