// // app.js
// App({
//   onLaunch() {
//     // 展示本地存储能力
//     const logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })

// app.js
// App({
//   // onLaunch 是小程序的钩子函数，这个钩子函数在冷启动时肯定会执行到
//   // 当小程序冷启动时，会自动微信后台请求新版本的信息，如果有新版本，会立即进行下载
//   onLaunch () {
//     // 使用 wx.getUpdateManager 方法监听下载的状态
//     const updateManager = wx.getUpdateManager()
//     // 当下载完成新版本以后，会触发 onUpdateReady 回调函数
//     updateManager.onUpdateReady(function () {
//       // 在回调函数中给用户提示
//       wx.showModal({
//         title: '更新提示',
//         content: '新版本已经准备好，是否重启应用？',
//         success(res) {
//           if (res.confirm) {
//             // 强制当前小程序使用新版本并且会重启当前小程序
//             updateManager.applyUpdate()
//           }
//         }
//       })
//     })
//   }
// })

App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 监听小程序初始化
    console.log('onLaunch: 当小程序初始化完成时，会触发 onLaunch')
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // 监听小程序的显示
    console.log('onShow: 当小程序启动，或从后台进入前台显示')
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    // 监听小程序的隐藏
    console.log('onHide: 小程序从前台进入后台')
  },
 // 全局共享的数据
 globalData: {
  token: ''
},
// 全局共享的方法
setToken (token) {
  // 如果想获取 token，可以使用 this 的方式进行获取
  this.globalData.token = token
  // 在 App() 方法中如果想获取 App() 实例，可以通过 this 的方式进行获取
  // 不能通过 getApp() 方法获取
}

})