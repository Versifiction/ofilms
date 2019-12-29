import React from "react";

import "../../../App.css";

function Spinner() {
  return (
    <div
      className="spinner-container"
      style={{ display: "flex", justifyContent: "center", flex: "1" }}
    >
      <div className="preloader-wrapper active">
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
