// index.js
// 获取子组件实例
// import childComponent from '../../components/music-player/music-player.js';


 



Page({
  data: {
  // ⾳乐列表，包含每⾸歌的 id、名称、艺术家、播放链接和封⾯图⽚
  musicList: [
  { id: 1, name: '伝承の丘', artist: '秋山裕和', url: 'https://my-bucket-621.oss-cn-beijing.aliyuncs.com/%E4%BC%9D%E6%89%BF%E3%81%AE%E4%B8%98.mp3' , cover: '/assets/images/cover1.jpg'},
  { id: 2, name: '人是_', artist: '周深', url: 'https://my-bucket-621.oss-cn-beijing.aliyuncs.com/%E4%BA%BA%E6%98%AF_.mp3' ,cover: '/assets/images/cover2.jpg'},
  { id: 3, name: 'うれし、たのし', artist: 'コーコーヤ', url: 'https://my-bucket-621.oss-cn-beijing.aliyuncs.com/%E3%81%86%E3%82%8C%E3%81%97%E3%80%81%E3%81%9F%E3%81%AE%E3%81%97%EF%BC%88%E9%AB%98%E5%85%B4%EF%BC%8C%E5%BF%AB%E4%B9%90%EF%BC%89.mp3',cover: '/assets/images/cover3.jpg'
 }
  ],
  currentIndex: 0,
  // 当前选中的⾳乐信息
  currentMusic: {},
  num:'',
  },
  onLoad: function () {
    // 获取子组件实例
    this.musicPlayer = this.selectComponent('.music-player');
  },

  getData (event) {
    // 可以通过事件对象.detail 获取子组件传递给父组件的数据
    console.log(event)
    this.setData({
      num: event.detail
    })
  },
  // 播放⾳乐时触发的函数
  onPlayMusic(e) {
  // 获取触发事件的⾳乐 ID
  const musicId = e.detail.musicId;
  // 在⾳乐列表中查找对应的⾳乐项
  const music = this.data.musicList.find(item => item.id === musicId);
  // 更新当前播放的⾳乐信息
  this.setData({
  currentMusic: music
  });
  },
  switchMusic(event) {
    console.log(event)
   

    let newIndex = this.data.currentIndex;
    if (event.detail=1) {
      newIndex--;
      if (newIndex < 0) {
        newIndex = this.data.musicList.length - 1; // 如果已经是第一首，则切换到最后一首
      }
    } else if (event.detail=2) {
      newIndex++;
      if (newIndex >= this.data.musicList.length) {
        newIndex = 0; // 如果已经是最后一首，则切换到第一首
      }
    }
    this.setData({
      currentIndex: newIndex,
      isPlaying: true // 将 isPlaying 设置为 true
    });
    this.updateCurrentMusic();
    this.musicPlayer.stopMusic();
  },
  updateCurrentMusic() {
    const currentMusic = this.data.musicList[this.data.currentIndex];
    this.setData({
      currentMusic: currentMusic,
    });
  },
  
 

 });
 