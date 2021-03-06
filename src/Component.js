import { createDom, findDOM } from "./react-dom";
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
    let oldRenderVdom = this.oldRenderVdom; //获取老的虚拟DOM
    let oldDOM = findDOM(oldRenderVdom); //获取老的真实DOM
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}
function compareTwoVdom(parentDom, oldVDom, newVDom) {
  let oldDom = findDOM(oldVDom);
  let newDom = createDom(newVDom);
  parentDom.replaceChild(newDom, oldDom);
}
export const updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    for (var updater of updateQueue.updaters) {
      updater.updateComponent();
    }
  },
};
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
    if (updateQueue.isBatchingUpdate) {
      // 这里是把要更新的组件收集起来，所以updaters是个Set
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }
  /**
   * 到这个函数，就会去掉函数更新视图了，虽然有可能通过shouldComponentUpdate阻止
   */
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
/**
 *
 * @param {*} classInstance
 * @param {*} nextState
 */
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}
