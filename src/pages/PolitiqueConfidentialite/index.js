import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function PolitiqueConfidentialite() {
  useEffect(() => {
    document.title = "O'Films | Politique de confidentialité";
  });
  return (
    <>
      <Nav />
      <div className="container" style={{ textAlign: "justify" }}>
        <h2>Politique de confidentialité</h2>
        <p style={{ fontWeight: "bold" }}>
          Dernière mise à jour : 10 octobre 2019
        </p>
        <p>
          L'équipe du site O'FILMS est soucieuse de la protection des données
          personnelles. Elle s'engage à assurer le meilleur niveau de protection
          à vos données personnelles en conformité avec les réglementations
          européennes et françaises qui lui sont applicables en matière de
          protection des données personnelles. Pour toute information sur la
          protection des données personnelles, vous pouvez également consulter
          le site de la Commission Informatique et Liberté www.cnil.fr.
        </p>
        <p>
          Les données personnelles collectées sont les suivantes : civilité,
          nom, prénom, adresse email, département, ville, numéro de téléphone,
          pseudo, mot de passe. Ces données sont collectées et stockées à
          l'inscription, selon les champs remplis par l'utilisateur.
        </p>
        <p>
          Les données ainsi collectées sur le Site Internet sont exclusivement
          destinées à l'usage propre de O'FILMS. Elles peuvent être transmises
          aux autres sites de l'équipe O'FILMS agissant sous l'enseigne O'FILMS.
          Elles peuvent également être transmises aux personnes agissant sous
          l'autorité et sur les instructions de O'FILMS auxquelles O'FILMS fait
          appel.
        </p>
        <p>
          Aucune des données personnelles collectées à partir du Site Internet
          n'est communiquée ou cédée à des tiers à des fins commerciales.
        </p>
        <p>
          Pour toute question à propos de la confidentialité et de la protection
          de vos données, veuillez nous contacter par le formulaire de contact
          présent{" "}
          <a href="/contact" style={{ textDecoration: "underline" }}>
            ici
          </a>
          .
        </p>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default PolitiqueConfidentialite;
