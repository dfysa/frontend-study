// 定义⼀个泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
  constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFn;
  }
}
// 使⽤泛型类
let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 10)); // 输出: 15
let myGenericString = new GenericNumber<string>("", (x, y) => x + y);
console.log(myGenericString.add("Hello, ", "World!")); // 输出: Hello, World!;
