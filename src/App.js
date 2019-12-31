import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import store from "./store";
import Router from "./Router";

function App() {
  useEffect(() => {
    const sidenav = document.getElementsByClassName("sidenav-overlay")[0];
    if (sidenav) {
      document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    }

    // console.log("env ", process.env.REACT_APP_ENV);
    console.log("env ", process.env.NODE_ENV);
    console.log("app url ", process.env.REACT_APP_SERVER_PORT);
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
