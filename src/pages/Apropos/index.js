import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import BandeauCookie from "../../components/BandeauCookie";

function Apropos() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    document.title = "O'Films | A propos";
  });
  return (
    <>
      <Nav />
      <h2>A propos</h2>
      <BandeauCookie />
    </>
  );
}

export default Apropos;
