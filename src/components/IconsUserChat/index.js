import React from "react";

import "../../App.css";

function IconsUserChat(props) {
  return (
    <span>
      {props.isFounder ? (
        <i
          className="fas fa-crown"
          title="Fondateur"
          style={{ marginRight: "2px", color: "gold" }}
        ></i>
      ) : (
        ""
      )}
      {props.isAdmin ? (
        <i
          className="fas fa-id-badge"
          title="Admin"
          style={{ marginRight: "2px", color: "red" }}
        ></i>
      ) : (
        ""
      )}
      {props.isModerator ? (
        <i
          className="fab fa-monero"
          title="Modérateur"
          style={{ marginRight: "2px", color: "green" }}
        ></i>
      ) : (
        ""
      )}
      {props.isVerified ? (
        <i
          className="fas fa-check-circle"
          title="Vérifié"
          style={{ marginRight: "2px", color: "#0CD0FC" }}
        ></i>
      ) : (
        ""
      )}
    </span>
  );
}

export default IconsUserChat;
