Page({
  // 清空所有备忘录的函数
  clearMemos() {
  // 使⽤ wx.removeStorageSync 删除本地存储中的 'memos' 键及其数据
  wx.removeStorageSync('memos');
  // 显示⼀个提示框，告诉⽤户备忘录已成功清空
  wx.showToast({
  title: '已清空备忘录', // 提示信息
  icon: 'success' // 显示成功图标
  });
  }
 });
 