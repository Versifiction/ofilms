import React from "react";
import imageParallax from "../../images/movies-parallax.jpg";
import "../../App.css";

function AccueilParallax() {
  return (
    <div className="accueil-parallax">
      <div class="parallax-container">
        <div className="container" style={{ padding: "80px" }}>
          <p
            style={{
              color: "white",
              fontSize: "60px",
              textShadow: "4px 2px 5px black",
              textAlign: "center",
              marginBottom: "50px",
              textTransform: "uppercase"
            }}
          >
            Et, c'est aussi :{" "}
          </p>
          <div className="row">
            <div className="col s12 m4">
              <p
                style={{
                  color: "#0CD0FC",
                  fontSize: "50px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                490 531
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "37px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                films
              </p>
            </div>
            <div className="col s12 m4">
              <p
                style={{
                  color: "#0CD0FC",
                  fontSize: "50px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                85 573
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "37px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                séries
              </p>
            </div>
            <div className="col s12 m4">
              <p
                style={{
                  color: "#0CD0FC",
                  fontSize: "50px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                1 476 323
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "37px",
                  textShadow: "4px 2px 5px black",
                  textAlign: "center"
                }}
              >
                personnalités
              </p>
            </div>
          </div>
        </div>
        <p
          style={{
            color: "white",
            fontSize: "20px",
            textShadow: "4px 2px 5px black",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            bottom: "0",
            transform: "translate(-50%, -50%"
          }}
        >
          source : https://www.themoviedb.org/about (au 7 octobre 2019)
        </p>
        <div class="parallax" style={{ opacity: "0.5" }}>
          <img src={imageParallax} alt="Mosaïque de films" />
        </div>
      </div>
    </div>
  );
}

export default AccueilParallax;
