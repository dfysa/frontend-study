// pages/product/list/list.js
Page({
  data: {
    products: []
  },

  onLoad: function() {
    // 模拟获取商品列表
    this.setData({
      products: [
        { id: 1, name: '商品A', price: 100 },
        { id: 2, name: '商品B', price: 200 },
        { id: 3, name: '商品C', price: 300 }
      ]
    });
  },

  // 点击商品跳转到详情页面
  viewProductDetail: function(event) {
    const productId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/detail/detail?id=${productId}`  // 跳转到商品详情页面
    });
  }
})