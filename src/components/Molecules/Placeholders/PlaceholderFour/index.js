import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";

import "../../../../App";

function PlaceholderFour() {
  return (
    <div
      className="my-awesome-placeholder"
      style={{
        display: "flex",
        flexWrap: "no-wrap",
        paddingTop: "25px"
      }}
    >
      <ReactPlaceholder
        type="text"
        rows={10}
        showLoadingAnimation={true}
        color="grey"
      />
    </div>
  );
}

export default PlaceholderFour;
