import React from "./react";
import ReactDOM from "react-dom";

let element = (
  <h2 className="bg" style={{ color: "khaki" }}>
    demo txt
  </h2>
);

console.log(element);
ReactDOM.render(element, document.getElementById("root"));
