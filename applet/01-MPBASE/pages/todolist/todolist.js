Page({
  data: {
    newTask: '',  // 用于绑定输入框的双向数据
    tasks: []     // 待办事项的数组
  },

  // 处理输入框的输入
  handleInput(event) {
    this.setData({
      newTask: event.detail.value  // 获取输入的内容并更新到 newTask
    });
  },

  // 添加任务到待办列表
  addTask() {
    // 检查输入框是否为空
    if (!this.data.newTask.trim()) {
      wx.showToast({
        title: '请输入任务',
        icon: 'none'
      });
      return;
    }

    // 将新任务添加到任务数组中
    const newTask = { name: this.data.newTask };
    this.setData({
      tasks: [...this.data.tasks, newTask],  // 更新任务列表
      newTask: ''  // 清空输入框
    });
  },

  // 删除任务
  deleteTask(event) {
    const index = event.currentTarget.dataset.index;  // 获取待办任务的索引
    const tasks = this.data.tasks;  // 获取当前的任务列表
    tasks.splice(index, 1);  // 删除指定任务
    this.setData({
      tasks  // 更新任务列表
    });
  }
});