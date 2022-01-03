import { REACT_ELEMENT } from "./constants";
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

const React = {
  createElement,
  Component,
  createRef,
};

export default React;
