import jwtUtil from '../../utils/jwtUtil';

Page({
  data: {
    isLoggedIn: false,  // 是否登录
    userInfo: null,
    password: '',
    newPassword: '',
    confirmPassword: '',
    newAccountname: '',
    avatarUrl: '',
    showAvatarDialog: false,
    showPasswordDialog: false,
    showNewPasswordDialog: false,
    showEditAccountnameDialog: false,
  },

  onLoad() {
    const token = wx.getStorageSync('token');
    this.setData({ isLoggedIn: !!token });
    if (token) {
      this.fetchUserInfo();
    }
  },

  // 通用请求函数
  request(url, method, data) {
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data,
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            wx.showToast({ title: res.data.msg, icon: 'error' });
            reject(res.data);
          }
        },
        fail: (err) => {
          wx.showToast({ title: '请求失败', icon: 'error' });
          reject(err);
        },
      });
    });
  },

  fetchUserInfo() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'error' });
      return;
    }
    const userId = jwtUtil.extractUserId(token);
    this.request(`http://localhost:8080/api/v1/user/${userId}`, 'GET')
      .then((data) => {
        this.setData({ userInfo: data.data });
      });
  },

  editAvatar() {
    this.setData({ showAvatarDialog: true });
  },

  submitAvatar() {
    const token = wx.getStorageSync('token');
    const userId = jwtUtil.extractUserId(token);
    const avatarLink = this.data.avatarUrl;

    this.request(`http://localhost:8080/api/v1/user/update-avatar?userId=${userId}&avatarUrl=${encodeURIComponent(avatarLink)}`, 'POST')
      .then(() => {
        wx.showToast({ title: '头像修改成功', icon: 'success' });
        this.setData({
          'userInfo.avatar': avatarLink,
          showAvatarDialog: false,
        });
        this.fetchUserInfo(); // 刷新用户信息
      });
  },

  openPasswordDialog() {
    this.setData({ showPasswordDialog: true });
  },

  validatePassword() {
    const { password } = this.data;

    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'error' });
      return;
    }

    this.request('http://localhost:8080/api/v1/user/validate-password', 'POST', { password })
      .then(() => {
        wx.showToast({ title: '密码验证成功', icon: 'success' });
        this.setData({ showPasswordDialog: false, showNewPasswordDialog: true });
      });
  },

  logout() {
    wx.removeStorageSync('token');
    wx.showToast({ title: '已退出登录', icon: 'success' });
    wx.redirectTo({ url: '/pages/login/login' });
  },

  editAccountname() {
    this.setData({ newAccountname: this.data.userInfo.accountname, showEditAccountnameDialog: true });
  },

  submitAccountname() {
    const { newAccountname } = this.data;

    if (!newAccountname) {
      wx.showToast({ title: '昵称不能为空', icon: 'error' });
      return;
    }

    this.request('http://localhost:8080/api/v1/user/update', 'POST', { accountname: newAccountname })
      .then(() => {
        wx.showToast({ title: '昵称修改成功', icon: 'success' });
        this.setData({
          'userInfo.accountname': newAccountname,
          showEditAccountnameDialog: false,
        });
      });
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',  // 假设登录页路径为 /pages/login/login
    });
  },
});
