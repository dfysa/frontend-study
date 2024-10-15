//card.js
Page({
  data: {
    class1: 'z1', //默认正面在上面
    class2: 'z2'
  },
 
 
rotateFn: function(e) {
    let data = this.data;
    if (data.class1 == 'z1' && data.class2 == 'z2') {
      this.run('front', 'back', 'z2', 'z1');
    } else {
      this.run('back', 'front', 'z1', 'z2');
    }
  },
 
  run: function(a, b, c, d) {
    let that = this;
    that.setData({
      class1: a,
      class2: b,
    })
    setTimeout(function() {
      that.setData({
        class1: c,
        class2: d,
      })
    }, 1000);
  },
});