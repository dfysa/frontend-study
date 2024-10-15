// pages/list/list.js
Page({
    
  // 生命周期函数--监听页面加载
  // onLoad: function (options) {
  //   console.log('页面加载完毕');
  //   // 通过 this.getOpenerEventChannel() 可以获取 EventChannel 对象
  //   const EventChannel = this.getOpenerEventChannel()
  //   // 通过 EventChannel 提供的 on 方法监听页面发射的自定义事件
  //   EventChannel.on('myevent', (res) => {
  //     console.log(res)
  //   })
  //   // 通过 EventChannel 提供的 emit 方法也可以向上一级页面传递数据
  //   // 需要使用 emit 定义自定义事件，携带需要传递的数据
  //   EventChannel.emit('currentevent', { age: 10 })
  // },

  onLoad () {
    // 通过 this.getOpenerEventChannel() 可以获取 EventChannel 对象
    const EventChannel = this.getOpenerEventChannel()
    // 通过 EventChannel 提供的 on 方法监听页面发射的自定义事件
    EventChannel.on('myevent', (res) => {
      console.log(res)
    })
    // 通过 EventChannel 提供的 emit 方法也可以向上一级页面传递数据
    // 需要使用 emit 定义自定义事件，携带需要传递的数据
    EventChannel.emit('currentevent', { age: 10 })
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    console.log('监听页面显示，此时页面处于显示状态')
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    console.log('页面初次渲染已经完成')
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {
    console.log('当前页面处于隐藏状态')
  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {
    console.log('页面卸载时触发')
  },

  navigateBack() {
    // 关闭当前页面，返回上一页或者返回多级页面
    // 默认返回上一页
    wx.navigateBack({
      delta: 1
    })
  },
  // onLoad(options) {
  //   console.log(options)
  // }
})
