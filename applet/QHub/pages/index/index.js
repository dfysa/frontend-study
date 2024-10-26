Page({
  data: {
    questions: [], // 问题数据
    isLoggedIn: false,
    currentPage: 1, // 当前页码，从1开始
    pageSize: 5, // 每页显示条数
    totalQuestions: 0, // 总问题数
    showEditor: false, // 控制编辑器显示
    selectedQuestionId: null, // 当前问题 ID
    editorMode: 'question', // 编辑器模式
    title:''
  },

  onLoad() {
   
    this.checkLoginStatus();
 
  },

  onShow() {
    this.fetchQuestions(); // 页面显示时获取数据
  },


  // 检查用户登录状态
  checkLoginStatus() {
    const token = wx.getStorageSync('token'); // 假设您将登录状态保存在本地存储中
    if (token) {
      this.setData({ isLoggedIn: true });
    } else {
      this.setData({ isLoggedIn: false });
    }
  },
 // 获取问题数据
  // 获取问题数据
  async fetchQuestions() {
    const { currentPage, pageSize, title } = this.data;

    try {
      let url = 'http://localhost:8080/api/v1/questions/getall';
      let data = {
        page: currentPage - 1, // 将小程序的页码转换为接口的 0 开始页码
        size: pageSize,
      };

      // 根据是否有 title 设置请求参数
      if (title.trim()) {
        data.title = title.trim();
      }

      wx.request({
        url: url,
        method: 'GET',
        data: data,
        success: (res) => {
          this.handleFetchResponse(res);
        },
        fail: (err) => {
          this.handleFetchError(err);
        },
      });
    } catch (error) {
      this.handleFetchError(error);
    }
  },

 // 处理请求响应
 handleFetchResponse(res) {
  console.log('请求成功:', res); // 输出整个响应对象
  if (res.statusCode === 200 && res.data && res.data.data.records) {
    const questions = res.data.data.records || [];

    // 格式化时间
    questions.forEach(item => {
      item.formattedTime = this.formatTime(item.createTime); // 添加 formattedTime 字段
    });

    this.setData({
      questions: questions,
      totalQuestions: res.data.data.total || 0, // 设置总问题数
    });
  } else {
    console.log('响应不符合预期:', res);
  }
},

// 处理请求错误
handleFetchError(err) {
  console.error('请求失败:', err); // 输出错误信息
  wx.showToast({
    title: '数据加载失败',
    icon: 'none',
  });
},


  // 处理搜索输入
  onSearchInput(event) {
    this.setData({ title: event.detail.value }); // 更新搜索关键词
  },

  // 处理搜索按钮点击事件
// 处理搜索按钮点击事件
handleSearch() {
  if (this.data.title.trim() === '') {
    this.setData({ currentPage: 1 }); // 重置为第一页
    this.fetchQuestions(); // 获取所有问题
  } else {
    this.setData({ currentPage: 1 }); // 重置为第一页
    this.fetchQuestions(); // 重新获取问题数据
  }
},
  // 登录处理
  // 登录处理函数
  handleLogin: function() {
    wx.login({
      success: (res) => {
        console.log(res);
        if (res.code) {
          // 这里可以发送code到自己的服务器进行验证
          wx.request({
            url: 'https://your-server.com/onLogin', // 替换为你的服务器地址
            data: {
              code: res.code
            },
            method: 'POST',
            header: { 'content-type': 'application/json' },
            success: (data) => {
              // 登录成功后的处理
              console.log(data);
              this.setData({ isLoggedIn: true }); // 更新登录状态
            },
            fail: (error) => {
              console.error('登录失败', error);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      },
      fail: () => {
        console.log("启用wx.login函数，失败！");
      },
      complete: () => {
        console.log("已启用wx.login函数");
      }
    });
  },
   // 登录函数
   login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送 res.code 到后端换取用户信息
          wx.request({
            url: 'http://your-backend-url.com/api/login', // 后端登录接口
            method: 'POST',
            data: { code: res.code },
            success: (response) => {
              if (response.data.success) {
                wx.setStorageSync('token', response.data.token); // 保存 token
                this.setData({ isLoggedIn: true });
                this.fetchQuestions(); // 登录成功后获取问题列表
              } else {
                wx.showToast({ title: '登录失败', icon: 'none' });
              }
            },
            fail: () => {
              wx.showToast({ title: '请求失败', icon: 'none' });
            },
          });
        } else {
          wx.showToast({ title: '获取用户登录状态失败', icon: 'none' });
        }
      },
    });
  },

  // 分页功能
  prevPage() {
    if (this.data.currentPage > 1) {
      this.setData({ currentPage: this.data.currentPage - 1 });
      this.fetchQuestions(); // 刷新问题列表
    }
  },

  nextPage() {
    const maxPage = Math.ceil(this.data.totalQuestions / this.data.pageSize); // 使用总问题数计算最大页码
    if (this.data.currentPage < maxPage) {
      this.setData({ currentPage: this.data.currentPage + 1 });
      this.fetchQuestions(); // 刷新问题列表
    }
  },

  // 跳转到问题详情页
  emitDetail(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}` // 跳转到详情页
    });
  },

  // 准备发布问题
  prepareEditor(mode, questionId = null) {
    this.setData({
      editorMode: mode,
      selectedQuestionId: questionId,
      showEditor: true,
    });
  },

  // 发布成功后的处理
  handleSubmit() {
    this.setData({ showEditor: false });
    this.fetchQuestions(); // 刷新问题列表
  },

  // 时间格式化函数
  formatTime(time) {
    const now = new Date();
    const postTime = new Date(time);
    const diff = Math.floor((now - postTime) / 1000); // 获取时间差（单位为秒）

    if (diff < 60) {
      return '刚刚发布'; // 少于60秒
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}分钟前`; // 少于1小时
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}小时前`; // 少于1天
    } else {
      const days = Math.floor(diff / 86400);
      return `${days}天前`; // 大于1天
    }
  }
});
