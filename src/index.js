import React from "./react";
import ReactDOM from "./react-dom";
function FunctionComponent(props) {
  const { color } = props;
  return <span style={{ color, margin: "10px" }}>test</span>;
}
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { count: 0, name: "count" };
  }
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state);
  };
  render() {
    const { color } = this.props;
    return (
      <span style={{ color, margin: "10px" }} onClick={this.handleClick}>
        {this.state.count}
      </span>
    );
  }
}

let element = (
  <h2 className="bg" style={{ color: "khaki" }}>
    demo
    <FunctionComponent color="bisque" />
    <ClassComponent color="cadetblue" />
  </h2>
);
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
