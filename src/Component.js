/**
 * 类组件
 */
export class Component {
  // 用来标记类组件
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
}
