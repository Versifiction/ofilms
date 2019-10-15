import React from "react";

import "../../App.css";
import AccueilBanner from "../../images/bg-header.jpg";

function HeaderBanner() {
  const style = {
    backgroundImage: "url(" + AccueilBanner + ")",
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "relative"
  };

  return (
    <div className="accueil-banniere" style={style}>
      <h1 className="accueil-title">O'Films</h1>
      <p className="accueil-text">
        Les meilleurs films. Les meilleures séries.
      </p>
      <a href="/inscription" style={{ color: "#0cd0fc" }}>
        <button className="btn-large waves-effect waves-light">
          S'inscrire
          <i className="material-icons right">send</i>
        </button>
      </a>
      <div className="bounce">
        <i
          className="fas fa-angle-double-down fa-2x"
          style={{ color: "white" }}
        ></i>
      </div>
    </div>
  );
}

export default HeaderBanner;
