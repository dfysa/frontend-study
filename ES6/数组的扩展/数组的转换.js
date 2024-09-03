// from()   对象转数组
// 通过array.from把对象变成数组，不过是类数组
// let obj={
//     0:'a',
//     1:'b',
//     length:2 
// }

// let arrs=Array.from(obj)
// console.log(arrs);


// flat ：数组扁平化

// let arrs=[1,2,[3,4,[5]]]
// 括号后面的数字表示扁平化几维
// const abb=arrs.flat(1)
// console.log(abb);




// sort:排序
let arrs=[3,4,1,8,5]
let result=arrs.sort((e1,e2)=>{
    return e2-e1
})

console.log(result);
