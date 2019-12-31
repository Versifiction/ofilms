import React, { useEffect } from "react";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Listes() {
  useEffect(() => {
    document.title = "O'Films | Mes listes";
  });

  return (
    <>
      <Nav />
      <div className="listes">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "30px"
            }}
          >
            Mes listes
          </h2>
        </div>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Listes;
