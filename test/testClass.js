class A {
  static attrA = "a";
  constructor(props) {
    this.props = props;
  }
}
class B extends A {
  attrb = "b";
}
let b = new B("something");
console.log("b", b.attrA);
console.log("a", B.attrA);
console.log(b);
