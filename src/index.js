import React from "./react";
import ReactDOM from "./react-dom";
function FunctionComponent(props) {
  const { color } = props;
  return <span style={{ color, margin: "10px" }}>test</span>;
}
class ClassComponent extends React.Component {
  render() {
    const { color } = this.props;
    return <span style={{ color, margin: "10px" }}>text</span>;
  }
}

let element = (
  <h2 className="bg" style={{ color: "khaki" }}>
    demo
    <FunctionComponent color="bisque" />
    <ClassComponent color="cadetblue" />
  </h2>
);

ReactDOM.render(element, document.getElementById("root"));
