import React from "./react";
import ReactDOM from "./react-dom";

const TextInput = React.forwardRef((props, ref) => <input ref={ref} />);
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  getFocus = () => {
    this.inputRef.current.focus();
  };
  render() {
    return (
      <div>
        <TextInput ref={this.inputRef} />
        <span onClick={this.getFocus}>获得焦点</span>
      </div>
    );
  }
}
let element = (
  <div className="bg" style={{ color: "bisque" }}>
    <ClassComponent />
  </div>
);
console.log(element); // "bisque" "cadetblue"
ReactDOM.render(element, document.getElementById("root"));
