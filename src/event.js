import { updateQueue } from "./Component";
/**
 * @param {*} dom dom对象
 * @param {*} eventType 时间类型 onclick onchange
 * @param {*} handler 处理的函数
 */
export const addEvent = (dom, eventType, handler) => {
  let store = dom.store || (dom.store = {});
  // 其实所有的时间处理函数还是存在各自dom上的
  store[eventType] = handler;
  // 上边的逻辑是绑定函数
  // ====
  // 下边的逻辑是时间委托后的调用，所以调用dispatchEvent的时候已经冒泡完了
  document[eventType] = dispatchEvent;
};
function createSyntheticEvent(nativeEvent) {
  const syntheticEvent = {};
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]; // TODO: 处理this？
  }
  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.isPropagationStopped = false;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent;
}
function dispatchEvent(event) {
  let { type: eventType, target } = event;
  eventType = `on${eventType}`;
  const syntheticEvent = createSyntheticEvent(event);
  updateQueue.isBatchingUpdate = true;
  while (target) {
    let { store } = target;
    const handler = store && store[eventType];
    handler && handler(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();
}

function stopPropagation() {
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}
