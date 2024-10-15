// pages/user/user/user.js
Page({
  data: {
    username: '未登录',
    userInfo: null
  },

  onLoad: function() {
    // 在此处可以调用后端API获取用户信息
    this.setData({
      username: '张三',
      userInfo: {
        age: 28,
        email: 'zhangsan@example.com'
      }
    });
  },

  // 模拟用户点击“退出登录”功能
  logout: function() {
    this.setData({
      username: '未登录',
      userInfo: null
    });
    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    });
  }
})