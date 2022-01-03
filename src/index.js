import React from "./react";
import ReactDOM from "./react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { count: 0, name: "count" };
    this.inputRef = React.createRef();
  }

  render() {
    const { color } = this.props;
    return (
      <span style={{ color, margin: "10px" }}>
        <input style={{ height: "22px", margin: "4px" }} ref={this.inputRef} />
        <span
          onClick={() => {
            this.inputRef.current.focus();
          }}
        >
          test
        </span>
      </span>
    );
  }
}

let element = (
  <h2
    className="bg"
    style={{ color: "khaki" }}
    onClick={() => {
      console.log("h2 click");
    }}
  >
    demo
    <ClassComponent color="cadetblue" />
  </h2>
);
console.log(element); // "bisque" "cadetblue"
ReactDOM.render(element, document.getElementById("root"));
