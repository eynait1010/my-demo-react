import { createDom } from "./react-dom";
/**
 * 类组件
 */
export class Component {
  // 用来标记类组件
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState) {
    this.updater.addState(partialState);
  }
  forceUpdate() {
    let newRenderVdom = this.render();
    compareTwoVdom(
      this.oldRenderVdom.dom.parentNode,
      this.oldRenderVdom,
      newRenderVdom
    );
    this.oldRenderVdom = newRenderVdom;
  }
}
function compareTwoVdom(parentDom, oldVDom, newVDom) {
  let oldDom = oldVDom.dom;
  let newDom = createDom(newVDom);
  parentDom.replaceChild(newDom, oldDom);
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingState = [];
  }
  addState(partialState) {
    this.pendingState.push(partialState);
    this.emitUpdate();
  }
  emitUpdate() {
    this.updateComponent();
  }
  updateComponent() {
    let { classInstance, pendingState } = this;
    if (pendingState.length) {
      shouldUpdate(classInstance, this.getState());
    }
  }
  getState() {
    let { classInstance, pendingState } = this;
    let { state } = classInstance;
    pendingState.forEach((partialState) => {
      if (typeof partialState === "function") {
        partialState = partialState(state);
      }
      state = { ...state, ...partialState };
    });
    pendingState.length = 0;
    return state;
  }
}
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}
