import { REACT_ELEMENT, REACT_FORWARD_REF_TYPE } from "./constants";
import { wrapToVdom } from "./utils";
import { Component } from "./Component";

function createElement(type, config, children) {
  let ref;
  if (config) {
    ref = config.ref;
    delete config.ref;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else if (arguments.length === 3) {
    props.children = wrapToVdom(children);
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    props,
    ref,
  };
}

function createRef() {
  return { current: null };
}
function forwardRef(render) {
  console.log("object");
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
};

export default React;
