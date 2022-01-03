import React from "./react";
import ReactDOM from "./react-dom";

class ClassComponent2 extends React.Component {
  render() {
    return <div>Three:{this.props.number}</div>;
  }
}
function Func1(props) {
  return <ClassComponent2 {...props} />;
}
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    setTimeout(() => {
      this.setState({ number: 1 });
    }, 1000);
  }
  render() {
    return <Func1 number={this.state.number} />;
  }
}
let element = (
  <div className="bg" style={{ color: "bisque" }}>
    <ClassComponent />
  </div>
);
console.log(element); // "bisque" "cadetblue"
ReactDOM.render(element, document.getElementById("root"));
