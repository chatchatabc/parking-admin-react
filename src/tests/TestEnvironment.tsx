import React from "react";
import { Provider } from "react-redux";
import GraphqlManager from "../application/GraphqlManager";
import store from "../application/redux/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function TestEnvironment({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GraphqlManager>
        <BrowserRouter>
          <Routes>
            <Route path="" element={children} />
          </Routes>
        </BrowserRouter>
      </GraphqlManager>
    </Provider>
  );
}

export default TestEnvironment;
