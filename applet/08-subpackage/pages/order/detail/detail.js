// pages/order/detail/detail.js
Page({
  data: {
    orderId: null,
    orderDetail: null
  },

  onLoad: function(options) {
    const id = options.id;  // 获取传递过来的订单ID
    this.setData({
      orderId: id,
      orderDetail: this.getOrderDetailById(id)  // 模拟获取订单详情
    });
  },

  // 模拟根据ID获取订单详情的方法
  getOrderDetailById: function(id) {
    const orderDetails = {
      101: { product: '商品A', amount: 1, total: 100, status: '已支付', address: '上海市' },
      102: { product: '商品B', amount: 2, total: 400, status: '未支付', address: '北京市' }
    };
    return orderDetails[id] || null;
  },

  // 模拟支付功能
  payOrder: function() {
    wx.showToast({
      title: '支付成功',
      icon: 'success'
    });
    this.setData({
      'orderDetail.status': '已支付'
    });
  }
})