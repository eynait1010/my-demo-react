import { REACT_TEXT } from "./constants";
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
  const { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if (type.isReactComponent) {
    // 懒得拆开 之后需要再拆吧
    // 类组件一定要先于函数式组件处理，因为类也是函数
    return mountClassComponent(vdom);
  } else if (typeof type === "function") {
    return createDom(type(props));
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
  return dom;
}
function mountClassComponent(vdom) {
  const { type, props } = vdom;
  let classInstance = new type(props);
  let renderVdom = classInstance.render();
  vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom;
  let dom = createDom(renderVdom);
  return dom;
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
      dom[key.toLowerCase()] = newProps[key];
    } else {
      dom[key] = newProps[key];
    }
  }
}
const ReactDom = {
  render,
};
export default ReactDom;
