import { REACT_ELEMENT } from "./constants";
function createElement(type, config, children) {
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2);
  } else if (arguments.length === 3) {
    props.children = children;
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    props,
  };
}

const React = {
  createElement,
};

export default React;
