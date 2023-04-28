import React from "react";
import ReactDOM from "react-dom/client";
import RouteManager from "./application/RouteManager";
import store from "./application/redux/store";
import { Provider } from "react-redux";
import ReactQuery from "./application/components/ReactQuery";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactQuery>
        <RouteManager />
      </ReactQuery>
    </Provider>
  </React.StrictMode>
);
