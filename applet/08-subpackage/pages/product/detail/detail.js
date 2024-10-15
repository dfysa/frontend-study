// pages/product/detail/detail.js
Page({
  data: {
    productId: null,
    productDetail: null
  },

  onLoad: function(options) {
    const id = options.id;  // 获取传递过来的商品ID
    this.setData({
      productId: id,
      productDetail: this.getProductDetailById(id)  // 模拟获取商品详情
    });
  },

  // 模拟根据ID获取商品详情的方法
  getProductDetailById: function(id) {
    const productDetails = {
      1: { name: '商品A', price: 100, description: '这是商品A的描述' },
      2: { name: '商品B', price: 200, description: '这是商品B的描述' },
      3: { name: '商品C', price: 300, description: '这是商品C的描述' }
    };
    return productDetails[id] || null;
  }
})