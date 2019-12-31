/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import "../../App.css";
import Nav from "../Nav";
import FloatingChat from "../FloatingChat";
import BandeauCookie from "../BandeauCookie";

function NoAccess(props) {
  return (
    <>
      <Nav />
      <div className="container">
        <h2>Pas d'accès</h2>
        {props.text === "isNotAdmin" ? (
          <p style={{ textAlign: "center" }}>
            Vous devez être admin pour accéder à ce contenu
          </p>
        ) : (
          <p style={{ textAlign: "center" }}>
            Vous devez être connecté pour voir cette page
          </p>
        )}
      </div>

      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default NoAccess;
