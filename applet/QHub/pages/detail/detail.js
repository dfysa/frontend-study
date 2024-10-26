import jwtUtil from '../../utils/jwtUtil';

Page({
  data: {
    id: null,
    question: null,
    showEditor: false,
    isEditing: false,
    showOptions: false,
    formattedTime: '',
    mainAnswers: [],
    userId: null,
    isOwner: false,
    editContent: '',
    answerContent: '',  // 新增这一行
    parentId: null,  // 新增字段，用于区分回复对象
  },
  
  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
    
    }
    this.fetchQuestionDetail(options.id);
    this.getUserIdFromToken();
  },

  fetchQuestionDetail(id) {
    try {
      wx.request({
        url: `http://localhost:8080/api/v1/questions/${id}`,
        method: 'GET',
        success: (response) => {
          if (response.data.data) {
            const question = response.data.data;
            const formattedTime = this.formatTime(question.createTime);
            
            // console.log("Question Data:", JSON.stringify(question, null, 2));
            // console.log("Question Answers:", JSON.stringify(question.answers, null, 2));
  
            const mainAnswers = question.answers.filter(answer => !answer.deleteFlag);
            this.setData({ 
              question, 
              formattedTime, 
              mainAnswers, 
              isOwner: this.data.userId === question.userId 
            });
          }
        },
        fail: (error) => {
          console.error("获取问题详情失败:", error);
        },
      });
    } catch (error) {
      console.error('请求失败:', error);
    }
  },
  handleInput(event) {
    this.setData({
        answerContent: event.detail.value  // 获取输入的内容并更新到 answerContent
    });
},
  formatTime(time) {
    const now = new Date();
    const postTime = new Date(time);
    const diff = Math.floor((now - postTime) / 1000);
    if (diff < 60) return '刚刚发布';
    else if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    else if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    return `${Math.floor(diff / 86400)}天前`;
  },

  getUserIdFromToken() {
    const token = wx.getStorageSync('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.setData({ userId: payload.id });
    }
  },


  // 切换编辑器，设置 parentId
  toggleEditor(event) {
    const parentId = event ? event.currentTarget.dataset.parentId : null;
    this.setData({ 
      showEditor: !this.data.showEditor, 
      parentId 
    });
  },


 // 提交回答
 submitAnswer(event) {
  const token = wx.getStorageSync('token');
  const answerContent = this.data.answerContent; // 获取 textarea 输入内容
  const { question, parentId } = this.data;
console.log(answerContent);
console.log(this.data)
  wx.request({
      url: 'http://localhost:8080/api/v1/answers/add',
      header: { Authorization: `Bearer ${token}` },
      method: 'POST',
      data: {
          answerContent,
          relatedQuestionId: question.id,
          parentId: parentId || null  // 若为问题的直接回复则传 null
      },
      success: () => {
          this.setData({ showEditor: false });
          this.fetchQuestionDetail(question.id);
      },
      fail: (error) => {
          console.error("提交答案失败:", error);
      },
  });
},




  // 点赞功能
  toggleLike(event) {
    const { targetId, type } = event.currentTarget.dataset; // 获取 targetId 和 type

    if (!targetId) {
      console.error("Error: targetId is undefined");
      return;
    }

    const token = wx.getStorageSync('token');
    
  // 检查 token 是否存在
  if (!token) {
    wx.showToast({
      title: '请先登录',
      icon: 'none',
    });
    return;
  }

    wx.request({
      url: `http://localhost:8080/api/v1/likes/toggle?targetId=${targetId}&type=${type}`, // 拼接参数到 URL
      method: 'POST',
      header: { Authorization: `Bearer ${token}` },
      success: () => {
        // 点赞成功后，刷新问题详情
        this.fetchQuestionDetail(this.data.question.id);
      },
      fail: (error) => {
        console.error("点赞失败:", error);
      },
    });
  },

  toggleOptions() {
    this.setData({ showOptions: !this.data.showOptions });
  },

  editQuestion() {
    this.setData({
      isEditing: true,
      editContent: this.data.question.content,
    });
  },

  handleInput1(event) {
    this.setData({ editContent: event.detail.value });
  },

  submitEdit() {
    const { question, editContent } = this.data;
    wx.request({
      url: `https://localhost:8080/api/v1/questions/edit/${question.id}`,
      method: 'PUT',
      data: {
        content: editContent,
        title: question.title,
      },
      success: () => {
        this.setData({ isEditing: false });
        this.fetchQuestionDetail(question.id);
      },
      fail: (error) => {
        console.error("编辑问题失败:", error);
      },
    });
  },

  cancelEdit() {
    this.setData({ isEditing: false });
  },

  deleteQuestion() {
    const token = wx.getStorageSync('token');
    const { question } = this.data;
    console.log(question.id)
    wx.request({
      url: `http://localhost:8080/api/v1/questions/delete/${question.id}`,
      header: { Authorization: `Bearer ${token}` },
      method: 'PUT',
      success: () => {
        wx.navigateBack();
      },
      fail: (error) => {
        console.error("删除问题失败:", error);
      },
    });
  },
});
