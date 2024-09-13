function LogExecutionTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Executing ${propertyKey}...`);
    return originalMethod.apply(this, args);
  };
}
class MyService {
  @LogExecutionTime
  doSomething() {
    console.log("Doing something");
  }
}
const service = new MyService();
service.doSomething();
// 输出:
// Executing doSomething...
// Doing something
