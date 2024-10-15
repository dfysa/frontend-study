Page({
  data: {
  // ⽤于存储备忘录列表的数据，初始化为空数组
  memos: []
  },
  // ⽣命周期函数：当⻚⾯⾸次加载时会调⽤该函数
  onLoad() {
  // 调⽤加载备忘录数据的函数，将数据从本地存储中读取并显示
  this.loadMemos();
  },
  // ⽣命周期函数：当⻚⾯每次显示时（包括从其他⻚⾯返回时）都会调⽤该函数
  onShow() {
  // 再次调⽤加载备忘录数据的函数，确保⻚⾯显示的备忘录是最新的
  this.loadMemos();
  },
  // 加载备忘录数据的函数，从本地存储中读取保存的备忘录
  loadMemos() {
  // 使⽤ wx.getStorageSync 从本地存储中获取 'memos' 数据
  // 如果本地存储中没有数据，则使⽤空数组作为默认值
  const memos = wx.getStorageSync('memos') || [];
 
  // 使⽤ setData 函数更新⻚⾯的数据，将获取到的备忘录数据展示到⻚⾯上
  this.setData({ memos });
  }
 });
 