import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from "./constants";
import { addEvent } from "./event";
function render(vdom, container) {
  mount(vdom, container);
}
function mount(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
}
/**
 * 真实dom
 * @param {*} vdom 虚拟dom
 */
export function createDom(vdom) {
  const { type, props, ref } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if (type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vdom);
  } else if (type.isReactComponent) {
    // 类组件一定要先于函数式组件处理，因为类也是函数
    return mountClassComponent(vdom);
  } else if (typeof type === "function") {
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }
  updateProps(dom, {}, props);
  if (props.children?.type) {
    mount(props.children, dom);
  } else if (Array.isArray(props.children)) {
    props.children.forEach((item) => {
      mount(item, dom);
    });
  }
  vdom.dom = dom;
  ref && (ref.current = dom);
  return dom;
}
function mountFunctionComponent(vdom) {
  let { type: functionComponent, props } = vdom;
  let renderVdom = functionComponent(props); //获取组件将要渲染的虚拟DOM
  vdom.oldRenderVdom = renderVdom;
  if (!renderVdom) return null;
  return createDom(renderVdom);
}
function mountClassComponent(vdom) {
  const { type, props } = vdom;
  let classInstance = new type(props);
  let renderVdom = classInstance.render();
  vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom;
  let dom = createDom(renderVdom);
  return dom;
}
function mountForwardComponent(vdom) {
  let { type, props, ref } = vdom;
  let renderVDom = type.render(props, ref);
  return createDom(renderVDom);
}

/**
 * 挂载虚拟dom属性到真实dom上
 * @param {*} dom
 * @param {*} oldProps
 * @param {*} newProps
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
    // 这个地方不用对className做特殊的处理，因为本来dom属行也是className
    if (key === "children") {
      continue;
    } else if (key === "style") {
      let styleObj = newProps[key];
      // 降低心智
      for (let attrName in styleObj) {
        dom.style[attrName] = styleObj[attrName];
      }
    } else if (/^on[A-Z].*/.test(key)) {
      addEvent(dom, key.toLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}
export function findDOM(vdom) {
  if (!vdom) return null;
  if (vdom.dom) {
    return vdom.dom;
  } else {
    return findDOM(vdom.oldRenderVdom);
  }
}
const ReactDom = {
  render,
};
export default ReactDom;
