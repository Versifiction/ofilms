import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { RectShape } from "react-placeholder/lib/placeholders";

import "../../../../App";

function PlaceholderThree() {
  return (
    <>
      <div className="my-awesome-placeholder row">
        <ReactPlaceholder
          type="text"
          rows={50}
          showLoadingAnimation={true}
          color="grey"
          style={{ marginTop: "90px" }}
        />
      </div>
      <div className="my-awesome-placeholder row">
        <div className="col s12 m4">
          <ReactPlaceholder
            type="rect"
            showLoadingAnimation={true}
            color="grey"
          />
        </div>
        <div className="col s12 m8">
          <div className="row">
            <div className="col s12 m4">
              <ReactPlaceholder
                type="rect"
                showLoadingAnimation={true}
                color="grey"
              />
            </div>
            <div className="col s12 m4">
              <ReactPlaceholder
                type="rect"
                showLoadingAnimation={true}
                color="grey"
              />
            </div>
            <div className="col s12 m4">
              <ReactPlaceholder
                type="rect"
                showLoadingAnimation={true}
                color="grey"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceholderThree;
