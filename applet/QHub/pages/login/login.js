Page({
  data: {
    form: {
      username: "12",
      password: "123123"
    }
  },

  // 登录逻辑
  async login() {
    const { username, password } = this.data.form;

    try {
      wx.request({
        url: 'http://localhost:8080/api/v1/user/login',
        method: 'POST',
        data: { username, password },
        header: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          console.log('响应数据:', res);

          if (res.statusCode === 200 && res.data.code === 200) {
            const { token, user } = res.data.data; // 获取 Token 和用户信息

            // 将 Token 和用户信息存储到 localStorage
            wx.setStorageSync('token', token);
            wx.setStorageSync('user', user);

            // 登录成功后跳转
            wx.redirectTo({ url: '/pages/userInfo/userInfo' });
          } else {
            const errorMsg = res.data && res.data.msg ? res.data.msg : '登录失败，请重试';
            console.error(errorMsg);
          }
        },
        fail: (err) => {
          console.error("请求失败", err);
        }
      });
    } catch (error) {
      console.error("登录失败", error);
    }
  },

  // 处理输入框变化
  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  }
});
