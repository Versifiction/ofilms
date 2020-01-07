import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import store from "./store";
import Router from "./Router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.REACT_APP_CLIENT_PORT}>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
