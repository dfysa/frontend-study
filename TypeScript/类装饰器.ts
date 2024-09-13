function LogClass(constructor: Function) {
  console.log(`Class ${constructor.name} is being created`);
}
@LogClass
class MyClass {}
// 输出: Class MyClass is being created
