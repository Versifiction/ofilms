import React from "react";

import "../../App.css";

function AccueilActions() {
  return (
    <div className="accueil-actions">
      <div className="container">
        <h3>Que peut-on faire ?</h3>
        <div className="row">
          <div className="col s12 m4">
            <div>
              <i
                className="material-icons medium"
                style={{ color: "#0CD0FC", marginBottom: "20px" }}
              >
                visibility
              </i>
            </div>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center"
              }}
            >
              Consulter des fiches de films, de séries, d'acteurs...
            </p>
          </div>
          <div className="col s12 m4">
            <div>
              <i
                className="material-icons medium"
                style={{ color: "#0CD0FC", marginBottom: "20px" }}
              >
                edit
              </i>
            </div>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center"
              }}
            >
              Rédiger des avis, liker des films/séries et créer des listes...
            </p>
          </div>
          <div className="col s12 m4">
            <div>
              <i
                className="material-icons medium"
                style={{ color: "#0CD0FC", marginBottom: "20px" }}
              >
                chat
              </i>
            </div>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center"
              }}
            >
              Ecrire dans le chat et échanger sur le forum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccueilActions;
