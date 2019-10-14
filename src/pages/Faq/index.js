import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";
import BandeauCookie from "../../components/BandeauCookie";

function Faq() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    for (
      let i = 0;
      i < document.getElementsByClassName("collapsible-body").length;
      i++
    ) {
      document.getElementsByClassName("collapsible-body")[i].style.color =
        "white";
    }
  });

  return (
    <>
      <Nav />
      <div className="container">
        <h2>FAQ</h2>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Comment
              s'inscrit-on ?
            </div>
            <div className="collapsible-body">
              <span>
                Pour s'inscrire, il suffit de se rendre{" "}
                <a href="/inscription">ici</a>, et de remplir le formulaire
                d'inscription.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Le site
              est-il gratuit ?
            </div>
            <div className="collapsible-body">
              <span>
                Toutes les fonctionnalités présentes sur le site sont
                effectivement gratuites, cependant certaines nécessitent d'avoir
                un compte et être connecté.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Comment
              puis-je contacter les administrateurs et/ou les modérateurs du
              site ?
            </div>
            <div className="collapsible-body">
              <span>
                Vous pouvez contacter les administrateurs et/ou les modérateurs
                du site en soumettant votre message ainsi que son objet,{" "}
                <a href="/contact">ici</a>.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Pourquoi
              mon compte a été suspendu ?
            </div>
            <div className="collapsible-body">
              <span>
                Tout compte ne respectant pas les règles élémentaires de
                savoir-vivre peut se voir suspendu.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Pourquoi
              un des messages que j'ai écrit dans le chat a été masqué ?
            </div>
            <div className="collapsible-body">
              <span>
                Tout message ne respectant pas les règles élémentaires de
                savoir-vivre peut se voir masqué.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons colored">question_answer</i>Comment
              puis-je devenir modérateur ou administrateur ?
            </div>
            <div className="collapsible-body">
              <span>Pour le moment, aucun recrutement n'est prévu.</span>
            </div>
          </li>
        </ul>
      </div>
      <BandeauCookie />
    </>
  );
}

export default Faq;
