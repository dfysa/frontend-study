Page({
  data: {
  photos: [], // 存放照⽚列表
  currentPhoto: '', // 当前选择的照⽚
  description: '', // 照⽚的⽂字描述
  photoDiary: [] // 照⽚⽇记数组，包含照⽚和描述
  },
  // 拍照或从相册中选择照⽚
  choosePhoto() {
  const that = this;
  wx.chooseImage({
  count: 1, // 最多选择1张图⽚
  sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
  sourceType: ['album', 'camera'], // 可以从相册或相机中选择
  success(res) {
  const tempFilePath = res.tempFilePaths[0]; // 获取图⽚路径
  that.setData({
  currentPhoto: tempFilePath // 更新当前照⽚
  });
  }
  });
  },
  // 预览照⽚
  previewPhoto(e) {
  const current = e.currentTarget.dataset.src; // 获取点击的照⽚路径
  wx.previewImage({
  current: current, // 当前预览的图⽚
  urls: this.data.photos // 可预览的图⽚数组
  });
  },
  // 处理⽂字描述的输⼊
  inputDescription(e) {
  this.setData({
  description: e.detail.value // 更新照⽚的⽂字描述
  });
  },
  // 保存⽇记
  saveDiary() {
  const { currentPhoto, description, photoDiary } = this.data;
  // 确保照⽚和描述都有输⼊
  if (currentPhoto && description) {
  const newDiary = {
  photo: currentPhoto, // 当前照⽚
  description: description, // 当前描述
  date: new Date().toLocaleString() // 保存当前⽇期和时间
};
// 将新的⽇记项加⼊数组
photoDiary.push(newDiary);
// 将照⽚⽇记存⼊本地存储
wx.setStorageSync('photoDiary', photoDiary);
// 更新⻚⾯数据，清空当前照⽚和描述
this.setData({
photoDiary: photoDiary,
currentPhoto: '',
description: ''
});
// 弹出保存成功的提示
wx.showToast({
title: '保存成功',
icon: 'success',
duration: 2000
});
} else {
// 如果未输⼊照⽚或描述，提示⽤户
wx.showToast({
title: '请上传照⽚并添加描述',
icon: 'none',
duration: 2000
});
}
},
// 分享功能
onShareAppMessage() {
return {
title: '我的照⽚⽇记', // 分享时显示的标题
path: '/pages/index/index' // 分享⻚⾯的路径
};
},
// ⻚⾯加载时，读取本地存储的照⽚⽇记
onLoad() {
const storedDiary = wx.getStorageSync('photoDiary') || []; // 读取本地存储
this.setData({
photoDiary: storedDiary // 将本地存储的数据设置到⻚⾯
});
}
});
