import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { RectShape } from "react-placeholder/lib/placeholders";

import "../../../../App";

function PlaceholderOne() {
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
        type="rect"
        showLoadingAnimation={true}
        style={{ width: 200, height: 300, margin: ".5rem 0 1rem 0" }}
        color="grey"
      />
      <ReactPlaceholder
        type="rect"
        showLoadingAnimation={true}
        style={{
          width: 200,
          height: 300,
          margin: ".5rem 0 1rem 0",
          marginLeft: "10px"
        }}
        color="grey"
      />
      <ReactPlaceholder
        type="rect"
        showLoadingAnimation={true}
        style={{
          width: 200,
          height: 300,
          margin: ".5rem 0 1rem 0",
          marginLeft: "10px"
        }}
        color="grey"
      />
      <ReactPlaceholder
        type="rect"
        showLoadingAnimation={true}
        style={{
          width: 200,
          height: 300,
          margin: ".5rem 0 1rem 0",
          marginLeft: "10px"
        }}
        color="grey"
      />
      <ReactPlaceholder
        type="rect"
        showLoadingAnimation={true}
        style={{
          width: 200,
          height: 300,
          margin: ".5rem 0 1rem 0",
          marginLeft: "10px"
        }}
        color="grey"
      />
      <ReactPlaceholder
        type="rect"
        showLoadingAnimation={true}
        style={{
          width: 200,
          height: 300,
          margin: ".5rem 0 1rem 0",
          marginLeft: "10px"
        }}
        color="grey"
      />
    </div>
  );
}

export default PlaceholderOne;
