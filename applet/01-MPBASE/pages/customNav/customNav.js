// pages/customNav/customNav.js
Page({
  data: {
    statusBarHeight: 20,  // 状态栏高度
    navbarHeight: 60,     // 自定义导航栏高度
    title: '自定义导航栏'  // 导航栏标题
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      navbarHeight: systemInfo.statusBarHeight + 44  // 44 是导航栏的固定高度
    });
  },

  // 返回按钮的点击事件
  onBack() {
    wx.navigateBack();
  }
});