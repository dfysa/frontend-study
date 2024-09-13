// 定义⼀个泛型函数，T 是泛型参数
function identity<T>(arg: T): T {
  return arg;
}
// 使⽤泛型函数
let output1 = identity<string>("Hello TypeScript!"); // 明确指定 T 为 string;
let output2 = identity<number>(42); // 明确指定 T 为 number
console.log(output1); // 输出: Hello TypeScript!
console.log(output2); // 输出: 42
