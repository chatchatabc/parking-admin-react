import React from "react";
import ReactDOM from "react-dom/client";
import RouteManager from "./application/RouteManager";
import store from "./application/redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteManager />
    </Provider>
  </React.StrictMode>
);
