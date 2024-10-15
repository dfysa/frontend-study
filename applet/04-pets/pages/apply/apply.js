// pages/apply/apply.js
Page({
  data: {
  name: '', // ⽤户姓名
  contact: '' // ⽤户联系⽅式
  },
  // 表单输⼊处理
  handleInput(event) {
  const { field } = event.currentTarget.dataset;
  this.setData({
  [field]: event.detail.value
  });
  },
  // 提交领养申请
  submitApplication() {
  if (this.data.name && this.data.contact) {
  wx.showToast({
  title: '领养申请已提交',
  icon: 'success'
  });
  } else {
  wx.showToast({
  title: '请填写完整信息',
  icon: 'none'
  });
  }
  }
 });
 