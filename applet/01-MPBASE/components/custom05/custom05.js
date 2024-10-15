// components/custom05/custom05.js
Component({
  // 组件的初始数据
  data: {
    num: 666
  },
  properties: {
    name: {
      type: String,
      value: '匿名'
    },
    age: {
      type: Number,
      value: 0
    }
  },
  methods: {
    // 将数据传递给父组件
    sendData() {
      // 如果需要将数据传递给父组件，需要使用 triggerEvent 发射自定义事件，第二个参数是携带的参数
      this.triggerEvent('myevent', this.data.num)
    }
  }
})
