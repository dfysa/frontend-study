// pages/cart/cart.js
Page({
  // 页面的初始数据
  data: {
    num: 1,
    id: 1,
    isChecked: false,
    school: '南京工业职业技术大学',
    numList: [1, 2, 3],
    bookList: [
      { id: 1, name: 'Vue 从入门到精通', price: 66 },
      { id: 2, name: 'JavaScript 最佳实践', price: 77 },
      { id: 3, name: '微信小程序开发实战', price: 88 }
    ],
    obj: {
      name: 'tom'
    },
    userInfo: {
      name: 'Tom',
      age: 10,
      gender: '男'
    },
    fruitList: ['苹果', '香蕉', '橘子'],
    animal:{
      name:'',
      avatar:'/assets/dog.jpg'
    }
  },
  updateNum() {
    this.setData({
      // key 是需要修改的数据,value 是最新值
      num: this.data.num + 1
    })
  },
  updateUserInfo() {
    // const newUserInfo = {
    //   // ES6 的展开运算符
    //   ...this.data.userInfo,
    //   name: 'zhangsan',
    //   age: 30
    // }
    // this.setData({
    //   userInfo: newUserInfo
    //   // 'userInfo.name': 'Jerry',
    //   // 'userInfo.age': 100,
    //   // 'userInfo.gender': '女'
    // })


//     // 将 userInfo 从 data 中进行解构
// const { userInfo } = this.data
// // 产生一份新数据
// const newUserInfo = {
//   ...userInfo,
//   name: 'Jerry',
//   age: 20
// }
// // 修改对象中的多个属性
// this.setData({
//   userInfo: newUserInfo
// })

// // 使用 Object.assign 方法将多个对象合并为一个对象
// const userInfo = Object.assign(
//   this.data.userInfo, 
//   { name: 'Jerry' },
//   { age: 20 }
// )

// // 修改对象中的多个属性
// this.setData({
//   userInfo
// })


   // 使用展开运算符拷贝一份数据，产生一个新对象
const newUser = { ...this.data.userInfo }
// 使用 delete 删除新对象中的属性
delete newUser.age

this.setData({
  // 将新的对象进行赋值
  userInfo: newUser
})
  },
  concatList(){
   // 使用 concat 方法来合并数组
// const newList = this.data.fruitList.concat('西瓜')
// // 使用 setData 进行赋值
// this.setData({
//   fruitList: newList
// })

//   // 使用数组的 push 方法来添加元素
// this.data.fruitList.push('西瓜')

// // 使用 setData 进行赋值
// this.setData({
//   fruitList: this.data.fruitList
// })
  
//   // 使用 ES6 的展开运算符先复制数组，然后进行合并
// const newList = [...this.data.fruitList, '西瓜']

// // 使用 setData 进行赋值
// this.setData({
//   fruitList: newList
// })


//修改数组中某个元素的值：利用索引的方式进行修改，但必须使用 wx:for 来进行渲染数组，否则会出现错误
// this.setData({
//   'fruitList[2]': '西瓜' 
// })

// 使用数组的 filter 方法来删除元素
const newList = this.data.fruitList.filter(item => item !== '香蕉')

// 使用 setData 进行赋值
this.setData({
  fruitList: newList
})

  }
})