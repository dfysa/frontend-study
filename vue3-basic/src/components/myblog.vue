<template>
  <div class="page">
    <el-header class="header">
      <div class="header-left">
        <el-input v-model="searchQuery" placeholder="搜索文章..." class="search-input" />
      </div>
      <div class="header-right">
        <el-menu class="menu" mode="horizontal">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">日志</el-menu-item>
          <el-menu-item index="3">友情链接</el-menu-item>
          <el-menu-item index="4" style="width: 100px;">关于我</el-menu-item>
 

        </el-menu>
      </div>
    </el-header>

    <el-container class="main-container">
      <el-aside class="left-panel" width="250px">
        <div class="profile">
          <div class="profile-header">
            <img src="../image/avatar.jpg" alt="头像" class="avatar" />
          </div>
          <p class="quote">{{ quote }}</p>
        </div>
        <el-menu class="links">
          <el-menu-item index="1">小站首页</el-menu-item>
          <el-menu-item index="2">个人日志</el-menu-item>
          <el-menu-item index="3">友情链接</el-menu-item>
          <el-menu-item index="4">关于自己</el-menu-item>
        </el-menu>
        <div class="site-info">
          <h4>站点信息</h4>
          <p>文章数: {{ articleCount }}</p>
          <p>最近动态: {{ recentUpdates }}</p>
          <p>上线时间: {{ launchDate }}</p>
        </div>
      </el-aside>

      <el-main class="content-panel">
        <el-carousel class="carousel" autoplay>
          <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
            <img :src="getURL(item.image)" alt="轮播图" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>

        <div class="articles">
          <el-card v-for="(article, index) in articles" :key="index" class="article-card">
            <img :src="getURL(article.image)" alt="文章图片" class="article-image" />
            <p class="article-title">{{ article.title }}</p>
          </el-card>
        </div>
      </el-main>

      <el-aside class="right-panel" width="250px">
        <div class="announcement">
          <h4>公告栏</h4>
          <p>{{ announcement }}</p>
        </div>
<div class="music-player">
 
    <div class="player-controls">
      <audio ref="audio" :src="getMUSIC(currentSong.url)" @ended="nextSong"></audio>

      <div class="song-info">
        <h2>{{ currentSong.title }}</h2>
        <p>{{ currentSong.artist }}</p>
      </div>

      <div class="controls">
        <button @click="play" class="control-button">▶</button>
        <button @click="pause" class="control-button">❚❚</button>

        <div class="custom-select">
          <select v-model="currentSong" @change="changeSong" class="song-select">
            <option v-for="song in songs" :key="song.id" :value="song">{{ song.title }}</option>
          </select>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
  </div>
        <el-button class="back-to-top" @click="scrollToTop">回到顶部</el-button>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const getURL = (url: string) => {
  return new URL(`../image/${url}`, import.meta.url).href;
};
const getMUSIC = (url: string) => {
  return new URL(`../music/${url}`, import.meta.url).href;
};
const searchQuery = ref('');
const avatarUrl = ref('path/to/avatar.jpg'); // 替换为实际头像路径
const quote = ref('朝夕夜帷，勿忘优，勿忘歌，勿忘喜');
const carouselItems = ref([
  { image: 'swiper-1.jpg' },
  { image: 'swiper-2.jpg' },
  { image: 'swiper-4.jpg' },
]);
const articles = ref([
  { title: '打造自己的UI样式库', image: 'bg05.jpg' },
  { title: 'Hello World', image: 'bg02.jpg' },
  { title: '仿IMOOC页面', image: 'bg03.jpg' },
  { title: '鸿蒙初识', image: 'bg04.jpg' },
  // 添加更多文章...
]);
const articleCount = ref(4);
const recentUpdates = ref('无');
const launchDate = ref('2024-09-25');
const announcement = ref('欢迎来到我的博客！');

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



interface Song {
  id: number,
  title: string,
  artist: string,
  url: string
}

const songs: Song[] = [
  { id: 1, title: '人是_', artist: '周深', url: '人是_.mp3' },
  { id: 2, title: '伝承の丘', artist: '秋山裕和', url: '伝承の丘.mp3' },
  { id: 3, title: 'しわあわせ', artist: 'Vaudny', url: 'しわあわせ.mp3' }
];

const currentSong = ref<Song>(songs[0]);

const audio = ref<HTMLAudioElement | null>(null);

const play = () => {
  if (audio.value) {
    audio.value.play();
  }
};

const pause = () => {
  if (audio.value) {
    audio.value.pause();
  }
};

const changeSong = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedSongId = parseInt(target.value);
  const selectedSong = songs.find(song => song.id === selectedSongId);

  if (selectedSong) {
    currentSong.value = selectedSong;
    if (audio.value) {
      audio.value.src = selectedSong.url;
      audio.value.play();
    }
  }
};
 const nextSong = () => {
  const currentIndex = songs.findIndex(song => song.id === currentSong.value.id);
  const nextIndex = (currentIndex + 1) % songs.length;
  changeSong({ target: { value: songs[nextIndex].title } } as unknown as Event);
};
</script>

<style scoped>
.page {
  top: 0;
  left: 0;
  background: url("../image/bg-cover.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto; /* 添加滚动效果 */
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

.menu {
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  gap: 20px;
  width: 83%;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  width: 32%;
}

.search-input {
    margin-left: 150px;
  width: 300px;
  color: white;
}

.menu .el-menu-item {
  color: white;
}

.main-container {
  margin: 20px 10%;
  display: flex;
}

.left-panel {
  padding: 22px 20px  20px 20px;
}
.profile {
  background-color: white; /* 白色背景 */
  border-radius: 5px; /* 圆角 */
  padding: 10px;
}

.profile-header {
  background-image: url('../image/swiper-3.jpg'); /* 背景图路径 */
  background-size: cover;
  background-position: center;
  height: 100px; /* 背景图高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0 0; /* 圆角 */
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid white; /* 白色边框 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  position: relative;
  top: -40px; /* 向上移动头像，使其重叠于背景 */
}

.quote {
  font-style: italic;
  margin-top: 10px;
  text-align: center; /* 中心对齐名言 */
}

.links {
  margin-top: 20px;
  background-color: white; /* 白色背景 */
  padding: 20px;
  border-radius: 5px; /* 圆角 */
}

.site-info {
  margin-top: 20px;
  background-color: white; /* 白色背景 */
  padding: 20px;
  border-radius: 5px; /* 圆角 */
}

.content-panel {
  flex: 1;
  padding: 20px;
}

.carousel {
  margin-bottom: 20px;
}

.carousel-image {
  width: 100%;
  height: auto;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.article-card {
  position: relative;
  width: calc(49% - 10px);
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: auto;
}

.article-title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
}

.right-panel {
  padding: 20px;
}

.announcement {
  background-color: white; /* 白色背景 */
  padding: 20px;
  border-radius: 5px; /* 圆角 */
  margin-bottom: 20px;
}

.music-player {
  background-color: white; /* 白色背景 */
  padding: 20px;
  border-radius: 5px; /* 圆角 */
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.player-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.song-info {
  text-align: center;
  margin-bottom: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px; /* 按钮间距 */

}

.control-button {
  background-color: #4CAF50; /* 按钮颜色 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #45a049; /* 鼠标悬停颜色 */
}

.custom-select {
  position: relative;
 
}

.song-select {
  appearance: none; /* 去除默认样式 */
  background-color: #f5f5f5; /* 背景色 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 5px; /* 圆角 */
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.song-select:focus {
  border-color: #4CAF50; /* 聚焦时边框颜色 */
  outline: none; /* 去除默认轮廓 */
}

.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333; /* 箭头颜色 */
  transform: translateY(-50%);
  pointer-events: none; /* 阻止事件干扰 */
}
.back-to-top {
  display: block;
  margin-top: 10px;
}
</style>
