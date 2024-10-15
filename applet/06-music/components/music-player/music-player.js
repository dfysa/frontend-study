// components/music-player/music-player.js
// 获取背景⾳频管理器实例，允许对⾳频的播放进⾏控制。
const backgroundAudioManager = wx.getBackgroundAudioManager();
Component({
 // 定义组件的属性
 properties: {
 // 接收当前⾳乐对象，包含歌曲的相关信息
 currentMusic: Object
 },
 // 定义组件的初始数据
 data: {
 // 控制播放状态的布尔值，默认为 false（未播放）
 isPlaying: false,
 currentIndex: 0, // 初始化为第一首歌曲
 musicList: [], // 初始化为空数组
 num:1
 },
 // 定义组件的⽅法
 methods: {
 // 切换播放/暂停的⽅法

togglePlay() {
  // 如果当前正在播放音乐
  if (this.data.isPlaying) {
    // 暂停背景音乐
    backgroundAudioManager.pause();
    // 更新播放状态为 false（未播放）
    this.setData({ isPlaying: false });
  } else {
    // 检查 currentMusic.url 是否存在
    if (!this.properties.currentMusic.url) {
      console.log('Invalid URL for backgroundAudioManager.src');
      return;
    }
    // 设置背景音频的标题为当前音乐的名称
    backgroundAudioManager.title = this.properties.currentMusic.name;
    // 设置背景音频的歌手为当前音乐的艺术家
    backgroundAudioManager.singer = this.properties.currentMusic.artist;
    // 设置背景音频的播放源为当前音乐的 URL
    backgroundAudioManager.src = this.properties.currentMusic.url;
    // 开始播放背景音频
    backgroundAudioManager.play();
    // 更新播放状态为 true（正在播放）
    this.setData({ isPlaying: true });
  }
},
 // 停⽌播放⾳乐的⽅法
 stopMusic() {
 // 停⽌背景⾳频播放
 backgroundAudioManager.stop();
 // 更新播放状态为 false（未播放）
 this.setData({ isPlaying: false });
 },
  // 切换到上一首音乐
  previousMusic() {
 
    this.setData({ num:1 });
    // 如果需要将数据传递给父组件，需要使用 triggerEvent 发射自定义事件，第二个参数是携带的参数
    this.triggerEvent('myevent', this.data.num)
  },
  
  // 切换到下一首音乐
  nextMusic() {
    this.setData({ num:2 });
    // 如果需要将数据传递给父组件，需要使用 triggerEvent 发射自定义事件，第二个参数是携带的参数
    this.triggerEvent('myevent', this.data.num)
  },
  // sendData() {
  //   this.setData({ num:1 });
  //   // 如果需要将数据传递给父组件，需要使用 triggerEvent 发射自定义事件，第二个参数是携带的参数
  //   this.triggerEvent('myevent', this.data.num)
  // },
  
  // 更新当前播放的音乐信息
  updateCurrentMusic() {
    const currentMusic = this.data.musicList[this.data.currentIndex];
    this.setData({
      currentMusic: currentMusic,
    });
  },
},

});

