// components/music-list/music-list.js
Component({
  // 定义组件的属性
  properties: {
  // 定义属性 musicList，⽤于接收从⽗组件传递的⾳乐列表数据。它的类型是 Array。
  musicList: Array
  },
  // 定义组件的⽅法
  methods: {
  // ⾃定义⽅法 playMusic，当⽤户点击某个⾳乐项时会触发这个⽅法
  playMusic(e) {
  // 获取点击的⾳乐项的 ID
  // e.currentTarget.dataset.id 是通过 data-id="{{item.id}}" 传递过来的⾳乐 ID
  const musicId = e.currentTarget.dataset.id;
  // 触发⽗组件的⾃定义事件 onPlay
  // this.triggerEvent ⽅法⽤于通知⽗组件事件发⽣，并传递相关数据
  // 第⼀个参数 'onPlay' 是事件名称，⽗组件将监听这个事件
  // 第⼆个参数 { musicId } 是传递给⽗组件的事件参数，即⾳乐 ID
  this.triggerEvent('onPlay', { musicId });
  }
  }
 });