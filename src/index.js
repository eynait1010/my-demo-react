import React from "./react";
import ReactDOM from "./react-dom";

let element = (
  <h2 className="bg" style={{ color: "khaki" }}>
    demo
    <span style={{ color: "bisque", margin: "10px" }}>test</span>
    text
  </h2>
);

ReactDOM.render(element, document.getElementById("root"));
