Page({
  data: {
  // 存储⽤户输⼊的标题和内容
  title: '', // 初始化标题为空字符串
  content: '' // 初始化内容为空字符串
  },
  // 处理标题输⼊框的输⼊事件
  handleTitleInput(event) {
  // 使⽤ setData 更新标题的值，event.detail.value 包含⽤户输⼊的内容
  this.setData({ title: event.detail.value });
  },
  // 处理内容输⼊框的输⼊事件
  handleContentInput(event) {
  // 使⽤ setData 更新内容的值，event.detail.value 包含⽤户输⼊的内容
  this.setData({ content: event.detail.value });
  },
  // 保存备忘录的函数
  saveMemo() {
  // 从 data 中获取当前输⼊的标题和内容
  const { title, content } = this.data;
  // 检查⽤户是否输⼊了标题和内容
  if (title && content) {
  // 从本地存储获取现有的备忘录，如果没有则使⽤空数组作为默认值
  const memos = wx.getStorageSync('memos') || [];
  // 将新的备忘录添加到备忘录数组中
  memos.push({
  id: Date.now(), // 使⽤当前时间戳作为备忘录的唯⼀ ID
  title, // 标题
  content // 内容
  });
  // 将更新后的备忘录数组保存回本地存储
  wx.setStorageSync('memos', memos);
  // 使⽤ switchTab 导航回⾸⻚ (备忘录列表⻚⾯)
  wx.switchTab({ url: '/pages/index/index' });
  } else {
  // 如果标题或内容为空，显示提示消息
  wx.showToast({
  title: '请输⼊标题和内容', // 提示内容
  icon: 'none' // 不显示图标
  });
  }
}
});