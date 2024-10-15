// pages/order/list/list.js
Page({
  data: {
    orders: []
  },

  onLoad: function() {
    // 模拟获取订单列表
    this.setData({
      orders: [
        { id: 101, product: '商品A', amount: 1, total: 100, status: '已支付' },
        { id: 102, product: '商品B', amount: 2, total: 400, status: '未支付' }
      ]
    });
  },

  // 点击订单查看详情
  viewOrderDetail: function(event) {
    const orderId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/detail/detail?id=${orderId}`  // 跳转到订单详情页面
    });
  }
})