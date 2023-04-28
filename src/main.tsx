import React from "react";
import ReactDOM from "react-dom/client";
import RouteManager from "./application/RouteManager";
import store from "./application/redux/store";
import { Provider } from "react-redux";
import GraphqlManager from "./application/GraphqlManager";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GraphqlManager>
        <RouteManager />
      </GraphqlManager>
    </Provider>
  </React.StrictMode>
);
