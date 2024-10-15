Page({
  data: {
    startPoint: {}, // 开始触摸点的坐标
    isDrawing: false, // 是否正在绘制
    context: null // canvas上下文
  },

  onLoad: function () {
    const context = wx.createCanvasContext('myCanvas');
    this.setData({ context });
  },

  touchStart: function (e) {
    const { x, y } = e.touches[0];
    this.setData({ startPoint: { x, y }, isDrawing: true });
  },

  touchMove: function (e) {
    if (!this.data.isDrawing) return;
    const { x, y } = e.touches[0];
    const { startPoint, context } = this.data;
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.draw(true);
    this.setData({ startPoint: { x, y } });
  },

  touchEnd: function () {
    this.setData({ isDrawing: false });
  }
});