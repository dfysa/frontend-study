// pages/myCart/myCart.js
Page({
  data: {
    cart: [],  // 购物车的商品列表
    showCart: false,  // 是否显示购物车
  },

  // 添加商品到购物车的函数
  addToCart(event) {
    // 通过事件对象的 data-product 获取商品名称
    const product = event.currentTarget.dataset.product;  
    // 将新的商品添加到购物车数组中
    this.setData({
      cart: [...this.data.cart, product]  
    });
    // 显示提示信息，告知用户商品已添加
    wx.showToast({
      title: `${product} 已添加!`,
      icon: 'success'
    });
  },

  // 控制购物车的显示或隐藏
  toggleCart() {
    // 切换购物车显示状态（如果原来显示则隐藏，原来隐藏则显示）
    this.setData({
      showCart: !this.data.showCart
    });
  },

  // 删除购物车中的商品
  deleteItem(event) {
    // 通过 data-index 获取商品在购物车数组中的索引
    const index = event.currentTarget.dataset.index;  
    // 从购物车中删除指定的商品
    const cart = this.data.cart;
    cart.splice(index, 1);  // 删除指定索引的商品
    // 更新购物车数据
    this.setData({
      cart: cart  
    });
    // 显示提示信息，告知用户商品已被删除
    wx.showToast({
      title: '商品已删除!',
      icon: 'none'
    });
  },

  // 阻止事件冒泡的函数
  stopBubble(event) {
    // 这个函数不需要做任何操作，只需阻止冒泡行为即可
  }
});