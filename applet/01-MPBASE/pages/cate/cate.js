// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 // 事件处理程序
 handler (event) {
  console.log('我是子绑定的事件 ~~~')
  console.log(event)
},



//  // 按钮触发的事件处理函数
//  btnHandler (event) {
//   // currentTarget 事件绑定者，也就是指：哪个组件绑定了当前事件处理函数
//   // target 事件触发者，也就是指：哪个组件触发了当前事件处理函数
//   // currentTarget 和 target 都是指按钮，因为是按钮绑定的事件处理函数，同时点击按钮触发事件处理函数
//   // 这时候通过谁来获取数据都可以
//   console.log(event.currentTarget.dataset.id)
//   console.log(event.target.dataset.name)
// },

// // view 绑定的事件处理函数
// parentHandler (event) {
//   // 点击蓝色区域(不点击按钮)
//   // currentTarget 事件绑定者：view
//   // target 事件触发者：view
//   // currentTarget 和 target 都是指 view，如果想获取 view 身上的数据，使用谁都可以
//   // 点击按钮(不点击蓝色区域)
//   // currentTarget 事件绑定者：view
//   // target 事件触发者：按钮
//   // 如果想获取 view 身上的数据，就必须使用 currentTarget 才可以
//   // 如果想获取的是事件触发者本身的数据，就需要使用 target
//   console.log(event)
//   // 在传递参数的时候，如果自定义属性是多个单词，单词与单词直接使用中划线 - 进行连接
//   // 在事件对象中会被转换为小托峰写法
//   console.log(event.currentTarget.dataset.parentId)
//   // 在传递参数的时候，如果自定义属性是多个单词，单词如果使用的是小托峰写法
//   // 在事件对象中会被转为全部小写的
//   console.log(event.currentTarget.dataset.parentname)
// },

  // 按钮绑定的事件处理函数
  btnHandler (event) {
    console.log(event.mark.id)
    console.log(event.mark.name)
  },

  // view 绑定的事件处理函数
  parentHandler (event) {
    // 先点击蓝色区域 (不点击按钮)
    // 通过事件对象获取的是 view 身上绑定的数据
    // 先点击按钮 (不点击蓝色区域)
    // 通过事件对象获取到的是 触发事件的节点 已经 父节点身上所有的 mark 数据
    console.log(event)
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})