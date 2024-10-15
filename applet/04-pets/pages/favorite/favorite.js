// pages/favorite/favorite.js
Page({
  data: {
  favoritePets: [] // 存储收藏的宠物
  },
  // ⻚⾯显示时获取全局的收藏宠物数据
  onShow() {
  const app = getApp();
  this.setData({ favoritePets: app.globalData.favoritePets });
  },
  // 跳转到领养申请⻚⾯
  goToApply() {
  wx.navigateTo({
  url: '/pages/apply/apply'
  });
  }
 });
 