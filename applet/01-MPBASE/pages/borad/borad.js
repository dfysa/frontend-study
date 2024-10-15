// js
Page({
  data: {
    isMenuVisible: false
  },
  showMenu: function() {
    this.setData({
      isMenuVisible: true
    });
    setTimeout(() => {
      this.setData({
        isMenuVisible: false
      });
    }, 1000);
  }
});