Page({
  
  data: {
    list: []
  },
  // 获取数据
  getPostInfo() {
    wx.request({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  }, 
  // 获取接口数据
  getData() {
    // 显示 loading 提示框
    wx.showLoading({
      // 用来显示提示的内容，提示的内容不会自动换行，如果提示的内容比较多，多出来的内容就会被隐藏
      title: '数据加载中...',
      // 是否展示透明蒙层，防止触摸穿透
      mask: true
    })
    // 如果需要发起网络请求，需要使用 wx.request API
    wx.request({
      // 接口地址，请请改成自己的 OSS 地址！！！
      url: 'https://my-bucket-621.oss-cn-beijing.aliyuncs.com/findBanner.json',
      // 请求方式
      method: 'GET',
      // 请求参数
      data: {},
      // 请求头
      header: {},
      // API 调用成功以后，执行的回调
      success: (res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.setData({
            list: res.data.data
          })
        }
      },
      // API 调用失败以后，执行的回调
      fail: (err) => {
        console.log(err)
      },
      // API 不管调用成功还是失败以后，执行的回调
      complete: (res) => {
        console.log(res)
        // 关掉 loading 提示框
        // hideLoading 和 showLoading 必须结合、配对使用才可以
        wx.hideLoading()
      }
    })
  },
// 删除商品，注意和其他方法之间的 , 
async delHandler () {
  // showModal 显示模态对话框
  const { confirm } = await wx.showModal({
    title: '提示',
    content: '是否删除该商品?'
  })
  if (confirm) {
    // showToast 消息提示框
    wx.showToast({
      title: '删除成功',
      icon: 'none',
      duration: 2000
    })
  } else {
    wx.showToast({
      title: '取消删除',
      icon: 'error',
      duration: 2000
    })
  }
},
  // 将数据存储到本地
  setStorage () {
    // ------------------- 同步 API -------------------
    // 第一个参数：本地存储中指定的 key
    // 第二个参数：需要存储的数据
    wx.setStorageSync('num', 1)
    // 在小程序中，如果存储的是对象类型数据，不需要使用 JSON.stringify 和 JSON.parse 进行转换
    // 直接进行存储和获取即可
    wx.setStorageSync('obj', { name: 'tom', age: 10 })
    // ------------------- 异步 API -------------------
    // wx.setStorage({
    //   key: 'num',
    //   data: 1
    // })
    // wx.setStorage({
    //   key: 'obj',
    //   data: { name: 'jerry', age: 18 }
    // })

  },
  // 获取本地存储的数据
  async getStorage () {
    // ------------------- 同步 API -------------------
    // 从本地存储的数据中获取指定 key 的数据、内容
    const num = wx.getStorageSync('num')
    const obj = wx.getStorageSync('obj')
    console.log(num)
    console.log(obj)
    // ------------------- 异步 API -------------------
    // const { data } = await wx.getStorage({
    //   key: 'obj'
    // })
    // console.log(data)
  },

  // 删除本地存储的数据
  removeStorage () {
    // ------------------- 同步 API -------------------
    // 从本地移除指定 key 的数据、内容
    wx.removeStorageSync('num')
    // ------------------- 异步 API -------------------
    // wx.removeStorage({
    //   key: 'num'
    // })
  },

  // 清空本地存储的全部数据
  clearStorage () {
    // ------------------- 同步 API -------------------
    wx.clearStorageSync() 
    // ------------------- 异步 API -------------------
    // wx.clearStorage()
  },




})