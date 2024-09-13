// 定义⼀个带有默认泛型类型的函数
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
// 使⽤泛型函数
let stringArray = createArray(3, "Hello"); // 推断 T 为 string
let numberArray = createArray<number>(3, 42); // 显式指定 T 为 number
console.log(stringArray); // 输出: ["Hello", "Hello", "Hello"]
console.log(numberArray); // 输出: [42, 42, 42]
