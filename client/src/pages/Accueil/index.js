import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import Nav from "../../components/Nav";
import HeaderBanner from "../../components/HeaderBanner";
import AccueilIntro from "../../components/AccueilIntro";
import AccueilParallax from "../../components/AccueilParallax";
import AccueilActions from "../../components/AccueilActions";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Accueil() {
  useEffect(() => {
    document.title = "O'Films | Accueil";
  });

  return (
    <div className="App">
      <Nav />
      <HeaderBanner />
      <AccueilIntro />
      <AccueilParallax />
      <AccueilActions />
      <FloatingChat />
      <BandeauCookie />
    </div>
  );
}

export default Accueil;
