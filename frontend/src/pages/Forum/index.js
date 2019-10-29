import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import BandeauCookie from "../../components/BandeauCookie";

function Forum() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
  });

  return (
    <>
      <Nav />
      <h2>Forum</h2>
      <BandeauCookie />
    </>
  );
}

export default Forum;
