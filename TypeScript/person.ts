interface Person {
  firstName: string;
  lastName: string;
  age: number;
  greet: () => string;
}

function createPerson(
  firstName: string,
  lastName: string,
  age: number
): Person {
  return {
    firstName,
    lastName,
    age,
    greet: function () {
      return `Hello, my name is ${this.firstName} ${this.lastName} a
nd I am ${this.age} years old.`;
    },
  };
}


const person: Person = createPerson("John", "Doe", 30); 

// VSCode 会在这⾥提供智能提示，如显示 person 对象的属性和⽅法。
console.log(person.greet())
// 如果你尝试访问不存在的属性或⽅法，VSCode 会⽴即显示错误提示。
// console.log(person.address) // 这⾏代码会在 VSCode 中显示错误提示。