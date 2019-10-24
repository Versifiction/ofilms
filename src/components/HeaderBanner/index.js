import React, { useEffect } from "react";
import $ from "jquery";

import "../../App.css";
import AccueilBanner from "../../images/bg-header.jpg";

function HeaderBanner() {
  const style = {
    backgroundImage: "url(" + AccueilBanner + ")",
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "relative"
  };

  useEffect(() => {
    $(document).ready(function() {
      // Add smooth scrolling to all links
      $("a").on("click", function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $("html, body").animate(
            {
              scrollTop: $(hash).offset().top
            },
            800,
            function() {
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            }
          );
        } // End if
      });
    });
  }, []);

  return (
    <div className="accueil-banniere" style={style}>
      <h1 className="accueil-title">O'Films</h1>
      <p className="accueil-text">
        Les meilleurs films. Les meilleures séries.
      </p>
      <a href="/inscription" style={{ color: "#0cd0fc" }}>
        <button className="btn-large">
          S'inscrire
          <i className="material-icons right">send</i>
        </button>
      </a>
      <div className="bounce">
        <a href="#accueil-intro">
          <i
            className="fas fa-angle-double-down fa-2x"
            style={{ color: "white" }}
          ></i>
        </a>
      </div>
    </div>
  );
}

export default HeaderBanner;
