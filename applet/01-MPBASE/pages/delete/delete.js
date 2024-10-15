// js
Page({
  data: {
    message: 'Hello, World!',
    items: [{text: '项目1'}, {text: '项目2'}, {text: '项目3'}],
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    left: 0,
    index: -1
  },
  handleTouchStart: function(e) {
    this.setData({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      endX: e.touches[0].clientX,
      endY: e.touches[0].clientY,
      left: 0,
      index: e.currentTarget.dataset.index
    });
  },
  handleTouchMove: function(e) {
    let moveX = e.touches[0].clientX;
    let moveY = e.touches[0].clientY;
    let disX = moveX - this.data.startX;
    let disY = moveY - this.data.startY;
    if (Math.abs(disX) > Math.abs(disY)) { // 左右滑动
      this.setData({
        endX: moveX,
        endY: moveY,
        left: disX > 0 ? disX : 0 // 只允许右滑，不允许左滑出界
      });
    } else { // 上下滑动
      let maxDisplacement = 100; // 设置最大滑动距离
      let displacement = Math.min(maxDisplacement, Math.abs(disY)); // 限制滑动距离
      this.setData({
        startY: moveY, // 更新起始Y坐标
        top: disY > 0 ? -displacement : displacement // 根据滑动方向设置top值
      });
    }
  },
  handleTouchEnd: function(e) {
    if (this.data.left >= 50) { // 左滑超过50px，触发删除操作
      this.deleteItem();
    } else { // 小于50px，还原位置
      this.setData({
        left: 0,
        endX: this.data.startX,
        endY: this.data.startY
      });
    }
  },
  deleteItem: function() {
    let items = this.data.items;
    items.splice(this.data.index, 1); // 删除当前项
    this.setData({
      items: items,
      left: 0,
      endX: this.data.startX,
      endY: this.data.startY,
      index: -1 // 重置索引，避免误操作
    });
  }
});