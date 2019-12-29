import React, { useEffect } from "react";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Dislikes() {
  useEffect(() => {
    document.title = "O'Films | Mes dislikes";
  });

  return (
    <>
      <Nav />
      <div className="dislikes">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "30px"
            }}
          >
            Mes dislikes
          </h2>
        </div>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Dislikes;
