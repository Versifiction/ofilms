import React from "react";

import "../../../App.css";

function MustBeConnected() {
  return (
    <div style={{ display: "flex", justifyContent: "center", flex: "1" }}>
      <p>Vous devez être connecté pour avoir accès à cette page</p>
    </div>
  );
}

export default MustBeConnected;
