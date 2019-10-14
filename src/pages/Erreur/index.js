import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import AccueilBanner from "../../images/404.jpg";
import BandeauCookie from "../../components/BandeauCookie";

function Erreur() {
  const style = {
    backgroundImage: "url(" + AccueilBanner + ")",
    backgroundPosition: "center",
    backgroundSize: "100%",
    width: "100%",
    height: "100vh"
  };

  useEffect(() => {
    document.title = "O'Films | 404";
  });

  return (
    <>
      <div className="erreur-banniere" style={style}>
        <div className="container">
          <div className="erreur-content">
            <p className="erreur-title">
              <span>Oops...</span>
              <br />
              On dirait que vous vous êtes trompé de salle !
            </p>
            <Link href="/" to="/">
              Retourner à l'accueil
            </Link>
          </div>
        </div>
      </div>
      <BandeauCookie />
    </>
  );
}

export default Erreur;
