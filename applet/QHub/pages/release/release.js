Page({
  data: {
    title: '',
    content: ''
  },

  // 处理标题输入
  onTitleInput(event) {
    this.setData({
      title: event.detail.value
    });
  },

  // 处理内容输入
  onContentInput(event) {
    this.setData({
      content: event.detail.value
    });
  },

  // 提交问题
  async handleSubmit() {
    const { title, content } = this.data;

    if (!title.trim()) {
      wx.showToast({
        title: '标题不能为空！',
        icon: 'none'
      });
      return;
    }

    if (!content.trim()) {
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none'
      });
      return;
    }

    try {
      const token = wx.getStorageSync('token');
      const url = 'http://localhost:8080/api/v1/questions/add'; // API 地址

      const response = await new Promise((resolve, reject) => {
        wx.request({
          url: url,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${token}`
          },
          data: {
            title: title,
            content: content
          },
          success: resolve,
          fail: reject
        });
      });

      // 包装返回数据
      const data = {
        code: response.data.code,
        msg: response.data.msg,
        data: response.data.data
      };

      if (data.code === 200) {
        wx.showToast({
          title: '问题发布成功！',
          icon: 'success'
        });
        this.setData({ title: '', content: '' }); // 清空输入框


 // 延迟一秒后跳转到首页
 setTimeout(() => {
      // 跳转到首页
      wx.reLaunch({
        url: '/pages/index/index' // 替换为你的首页路径
      });
}, 1000); // 1000毫秒 = 1秒


      } else {
        wx.showToast({
          title: `发布失败：${data.msg}`,
          icon: 'none'
        });
      }
    } catch (error) {
      wx.showToast({
        title: '请求出错，请重试！',
        icon: 'none'
      });
      console.error(error);
    }
  }
});
