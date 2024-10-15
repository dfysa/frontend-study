// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// getApp() 方法用来获取全局唯一的 App() 实例
const appInstance = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  navigateTo() {
    // 保留当前页面，跳转到应用中其他页面，不能跳转到 tabBar 页面
    wx.navigateTo({
      url: '/pages/list/list?id=1&name=tom'
    })
  },
  redirectTo() {
    // 关闭(销毁)当前页面，跳转到应用中其他页面，不能跳转到 tabBar 页面
    wx.redirectTo({
      url: '/pages/list/list?id=1&name=tom'
    })
  },

  switchTab() {
    // 跳转到 tabBar 页面，不能跳转到 非 tabBar 页面，路径后面不能传递参数
    wx.switchTab({
      url: '/pages/cate/cate?id=1&name=tom'
    })
  },

  reLaunch() {
    // 关闭所有的页面，然后跳转到应用中某一个页面
    wx.reLaunch({
      url: '/pages/list/list?id=1&name=tom'
    })
  },
  login () {
    // 不要通过 app 实例调用钩子函数
    console.log(appInstance)
    appInstance.setToken('fghioiuytfghjkoiuytghjoiug')
  },
   // 点击按钮触发的事件处理函数
   handler () {
    wx.navigateTo({
      url: '/pages/list/list',
      events: {
        // key：被打开页面通过 eventChannel 发射的事件
        // value：回调函数
        // 为事件添加一个监听器，获取到被打开页面传递给当前页面的数据
        currentevent: (res) => {
          console.log(res)
        }
      },
      success (res) {
        // console.log(res)
        // 通过 success 回调函数的形参，可以获取 eventChannel 对象
        // eventChannel 对象给提供了 emit 方法，可以发射事件，同时携带参数
        res.eventChannel.emit('myevent', { name: 'tom' })
      }
    })
  },
  
})
