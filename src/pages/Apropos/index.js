import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Apropos() {
  useEffect(() => {
    document.title = "O'Films | À propos";
  });
  return (
    <>
      <Nav />
      <h2>À propos</h2>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Apropos;
