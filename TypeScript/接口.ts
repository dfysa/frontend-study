interface StudentType {
  id: number;
  name: string;
  desc?: string;
}
const student: StudentType = {
  id: 1,
  name: "⼩明",
  desc: "三好学⽣",
};

// const student: StudentType = {
//  name: '⼩明',
// } // 错误：缺少 id 属性

// const student: StudentType = {
//  id: 1,
//  name: '⼩明',
//  age: 18
// } // 错误：age 不在接⼝类型 StudentType 中


interface BaseType {
  value: number;
  label: string;
}
interface ListType {
  tag: string;
  list: BaseType[];
}
const citys: ListType = {
  tag: "⾼校",
  list: [
    {
      value: 1,
      label: "清华⼤学",
    },
    {
      value: 2,
      label: "北京⼤学",
    },
  ],
};
console.log(citys);


