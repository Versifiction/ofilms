import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Contact() {
  return (
    <>
      <Nav />
      <h2>Contact</h2>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Contact;
