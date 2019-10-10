import React from "react";
import Cookies from "universal-cookie";

import "../../App.css";

function BandeauCookie() {
  const cookies = new Cookies();
  function closeBandeauCookie() {
    document.getElementsByClassName("bandeau-cookie")[0].style.display = "none";
    cookies.set("consentement-utilisateur-cookies-ofilms", true, {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
  }
  return (
    <>
      {!cookies.get("consentement-utilisateur-cookies-ofilms") && (
        <div
          className="bandeau-cookie"
          style={{
            backgroundColor: "black",
            width: "100%",
            padding: "10px"
          }}
        >
          <div
            style={{
              position: "relative"
            }}
          >
            <div className="container">
              {" "}
              <p>
                En poursuivant votre navigation, vous acceptez l’utilisation de
                cookies afin d’améliorer votre expérience, les performances du
                site et vous proposer des offres ciblées et adaptées à vos
                centres d’intérêts. pour en savoir plus et paramétrer les
                cookies, cliquez{" "}
                <a
                  href="/politique-confidentialite"
                  style={{ textDecoration: "underline" }}
                >
                  ici
                </a>
                .
              </p>
              <button
                className="btn waves-effect waves-light"
                style={{ marginTop: "inherit" }}
                onClick={closeBandeauCookie}
              >
                J'accepte
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BandeauCookie;
