// components/custom07/custom07.js
Component({
  // 组件所在页面的生命周期
  pageLifetimes: {
    // 监听组件所在的页面展示(后台切前台)状态
    show () {
      console.log('组件所在的页面被展示')
    },
    // 监听组件所在的页面隐藏(前台切后台、点击 tabBar)状态
    hide () {
      console.log('组件所在的页面被隐藏')
    }
  }
})
