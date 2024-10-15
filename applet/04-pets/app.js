// app.js
App({
  onLaunch() {
  // 获取⽤户登录状态
  wx.getUserInfo({
  success: (res) => {
  this.globalData.userInfo = res.userInfo;
  }
  });
  // 检查更新
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
  if (res.hasUpdate) {
  updateManager.onUpdateReady(() => {
  wx.showModal({
  title: '更新提示',
  content: '新版本已经准备好，是否重启应⽤？',
  success: (res) => {
  if (res.confirm) {
  updateManager.applyUpdate();
  }
  }
  });
  });
  }
  });
  },
  globalData: {
  userInfo: null,
  favoritePets: [] // 保存⽤户收藏的宠物
  }
 });