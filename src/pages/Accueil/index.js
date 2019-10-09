import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import Nav from "../../components/Nav";
import HeaderBanner from "../../components/HeaderBanner";
import FloatingChat from "../../components/FloatingChat";
import AccueilIntro from "../../components/AccueilIntro";
import AccueilParallax from "../../components/AccueilParallax";
import AccueilActions from "../../components/AccueilActions";

function Accueil() {
  useEffect(() => {
    document.title = "O'Films | Accueil";
  });

  return (
    <div className="App">
      <Nav />
      <HeaderBanner />
      <FloatingChat />
      <AccueilIntro />
      <AccueilParallax />
      <AccueilActions />
    </div>
  );
}

export default Accueil;
