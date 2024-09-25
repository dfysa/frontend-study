<template>
  <div>
    <el-menu
      class="header"
      style="margin-top: 10px; background-color: #fff"
      mode="horizontal"
    >
      <el-menu-item index="1">
        <img src="../image/知乎.png" alt="Logo" class="logo" />
      </el-menu-item>
      <el-menu-item index="2">首页</el-menu-item>
      <el-menu-item index="3">知乎知学堂</el-menu-item>
      <el-menu-item index="4">等你来答</el-menu-item>
      <el-menu-item index="5">        <img src="../image/direct.png" alt="Logo" class="direct-logo" /></el-menu-item>
      <el-menu-item index="6" class="">
        <el-input placeholder="翁泓阳2-0击败乔纳" class="search custom-input" />
        <img src="../image/搜索.png" alt="搜索" class="search-icon" />
      </el-menu-item>
      <el-menu-item index="7">
        <el-button type="primary" class="ask-button">提问</el-button>
      </el-menu-item>
      <el-menu-item index="8" class="icons">
        <div class="icon-wrapper">
          <img src="../image/消息.png" alt="消息" class="icon-message" />
          <div class="icon-word1">消息</div>
        </div>
       
      </el-menu-item>
            <el-menu-item index="9" class="icons">
   
        <div class="icon-wrapper">
          <img src="../image/私信.png" alt="私信" class="icon-mail" />
          <div class="icon-word2">私信</div>
        </div>
 
      </el-menu-item>
            <el-menu-item index="10" class="">
 
        <el-avatar class="avatar" :src="avatarUrl" />
      </el-menu-item>
    </el-menu>

    <el-main class="main">
      <div class="main-main">
        <!-- 好问题广场 -->
        <div class="news-module">
          <div class="flex align-center " style="margin-bottom: 20px;">
                   <img src="../image/question.png"  class="question"/>
                             <h1 class="module-title">  好问题广场</h1>
          </div>
          

   
          <div class="container1">
            <el-card class="news-section bg-white">
              <h2 class="section-title">近期热点</h2>
              <el-divider></el-divider>
              <div
                v-for="(item, index) in newsData.recentHotTopics"
                :key="index"
                class="news-item"
              >
                <div
                  class="flex"
                  style="
                    align-items: center;
                    margin-top: 22px; /* 垂直居中对齐 */
                  "
                >
                  <div class="flex">
                    <div
                      :class="['news-index', getBackgroundColor(index)]"
                      class=""
                      style="margin-top: 2px; margin-right: 4px"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="news-title">{{ item.title }}</div>
                  </div>
                </div>

                <div class="news-stats">
                  {{ item.views }} 浏览 · {{ item.followers }} 关注 ·
                  {{ item.answers }} 回答
                </div>
              </div>
              <el-button class="view-more" type="text"
                >查看全部热点问题></el-button
              >
            </el-card>
            <el-card class="news-section bg-white">
              <h2 class="section-title">潜力好问题</h2>
              <el-divider></el-divider>
              <div
                v-for="(item, index) in newsData.potentialHotTopics"
                :key="index"
                class="news-item"
              >
                <div class="flex" style="    margin-top: 22px; /* 垂直居中对齐 */">
                  <div :class="['news-index', getBackgroundColor(index)]"   style="margin-top: 2px; margin-right: 4px">
                    {{ index + 1 }}
                  </div>
                  <div class="news-title">{{ item.title }}</div>
                </div>
                <div class="news-stats">
                  {{ item.views }} 浏览 · {{ item.followers }} 关注 ·
                  {{ item.answers }} 回答
                </div>
              </div>
              <el-button class="view-more" type="text" style="color: #8491a5"
                >查看更多好问题></el-button
              >
            </el-card>
          </div>
          <!-- 插入新按钮 -->
<el-button type="text" class="bottom-button">查看更多好问题 ></el-button>
        </div>
               <!-- 好问题广场结束 -->

<!-- 最新专题 -->
<div class="news-module">
  <div class="flex align-center" style="margin-bottom: 20px;">
    <img src="../image/topic.png" class="question" />
    <h1 class="module-title">最新专题</h1>
  </div>

  <div class="topic-container">
    <div class="single-topic" v-for="(topic, index) in newsData1.topics" :key="index">
      <img :src="getURL(topic.image)" alt="主题图片" class="full-width-image" />
      <el-card class="info-card">
        <div class="flex align-center">
          <div class="info-left">
            <h2 class="news-title">{{ topic.title }}</h2>
            <p class="news-details">{{ topic.updatedTime }} · {{ topic.views }}</p>
          </div>
          <el-button class="right-button" type="text">关注专题</el-button>
        </div>
        <el-divider></el-divider>
        <div v-for="(subTopic, subIndex) in topic.subTopics" :key="subIndex" class="topic-item">
          <span class="topic-type">{{ subTopic.type }}</span>
          <span class="topic-title">{{ subTopic.title }}</span>
        </div>
      </el-card>
    </div>
  </div>
  <el-button type="text" class="bottom-button">查看更多专题 ></el-button>
</div>

      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import "../css/free.css";
import avatarUrl from "../image/avatar.jpg";
const getURL = (url: string) => {
  return new URL(`../image/${url}`, import.meta.url).href;
};
const newsData = {
  recentHotTopics: [
    {
      title: "江苏南通一年轻女村干部被一低保户杀害，当地「正在调查」中",
      views: "364万",
      followers: "1269",
      answers: "624",
    },
    {
      title: "如何评价 IGN 玩家年度游戏投票活动中《黑神话:悟空》评价为史上",
      views: "339万",
      followers: "1242",
      answers: "767",
    },
    {
      title: "博主曝石家庄多酒店暗藏摄像头，报案后遭围堵，警方通报[.",
      views: "459万",
      followers: "2707",
      answers: "1197",
    },
    {
      title: "合肥交通局女员工着便装乘网约车后亮证检查证件，司机质疑其",
      views: "633万",
      followers: "2503",
      answers: "1424",
    },
  ],
  potentialHotTopics: [
    {
      title: "如何评价电影《三体》将由张艺谋执导?",
      views: "39.6万",
      followers: "599",
      answers: "570",
    },
    {
      title: "美国担心中国月球探测器「玉兔」轧了阿姆斯特朗的脚印，会.",
      views: "97万",
      followers: "461",
      answers: "328",
    },
    {
      title: "梅西美洲杯决赛伤退，替补席捂脸持续痛哭了分钟，他本届比.",
      views: "85万",
      followers: "455",
      answers: "312",
    },
    {
      title: "如何评价外网玩家对绝区零的这句话?",
      views: "101万",
      followers: "405",
      answers: "426",
    },
  ],
};

const newsData1 = {
  topics: [
    {
      title: "2024国家网络安全宣传周",
      updatedTime: "09-14 更新",
      views: "1,414,391 浏览",
      image: "topic-1.png",
      subTopics: [
        { type: "官方稿件", title: "安全意识不松懈 网络安全多留心" },
        { type: "宣传视频", title: "网络安全小课堂-扫码领礼物有风险 30秒" },
        { type: "宣传海报", title: "2024国家网络安全宣传周|网络安全知识小课堂3" },
      ],
    },
    {
      title: "2024中国网络文明大会",
      updatedTime: "08-27 更新",
      views: "6,675,151 浏览",
      image: "topic-2.png",
      subTopics: [
        { type: "网络文明生态共建", title: "营造良好的网络空间生态至关重要" },
        { type: "网络法治", title: "《新时代的中国网络法治建设》白皮书发布，其中提及" },
        { type: "网络辟谣", title: "关于网络谣言的法律常识，你了解吗?" },
      ],
    },
    {
      title: "共建和谐亲子关系，助力儿童健康成长",
      updatedTime: "07-30 更新",
      views: "543,563 浏览",
      image: "topic-3.png",
      subTopics: [
        { type: "问答精选", title: "和谐亲子关系特征有哪些，建立良好的亲子关系对孩子" },
        { type: "相关问答", title: "想要处理好亲子关系，你有什么「锦喜妙计」? " },
                { type: "问答精选", title: "和谐亲子关系特征有哪些，建立良好的亲子关系对孩子" },
      ],
    },
    {
      title: "网络中国节·端午",
      updatedTime: "06-07 更新",
      views: "3,796,345 浏览",
      image: "topic-4.png",
      subTopics: [
        { type: "粽香探源", title: "最早投入汩罗江中的粽子是甜的还是咸的?" },
        { type: "粽艺薪传", title: "搞事情!粽叶到底有多少种?究竟哪种最正宗?" },
        { type: "粽韵新篇", title: "除了四面体和立方体，粽子有没有其他形状?" },
      ],
    },
  ],
};


// 根据索引返回不同的背景颜色类
const getBackgroundColor = (index: number) => {
  const colors = ["bg-color-1", "bg-color-2", "bg-color-3", "bg-color-4"];
  return colors[index % colors.length];
};
</script>

<style scoped>
.bottom-button {
 
  background-color: #fff;
  color: #8491a5;
  margin: 40px auto;
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 15px 24px; /* 内边距 */
  border-radius: 30px;
  font-size: 15px;
  font-weight: bolder;
  width: 168px; /* 可设置固定宽度 */
  height: 50px; /* 设置高度 */
}
.align-center{
align-items: center; /* 上下居中 */
}
 
.topic-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  justify-content: space-between; /* 两列之间的间距 */
}

.single-topic {
  width: 48%; /* 每个主题宽度 */
  margin-bottom: 20px; /* 底部间距 */
}
.question{
  width: 32px;
  height: 32px;
  margin-top: 10px;
  margin-right: 10px;
}
.section-title {
  margin-top: 0px;
}
.bg-color-1 {
  background-color: #f65853;
}

.bg-color-2 {
  background-color: #ff8803;
}

.bg-color-3 {
  background-color: #eeb66d;
}

.bg-color-4 {
  background-color: #c4c4c4;
}

.news-stats {
  font-size: 12px;
  color: #9196a1;
  margin: 6px 0 0 22px;
}
.main {
  background-color: #f4f6f9;
}
.view-more {
  margin-top: 22px;
  padding-bottom: 26px;
  color: #8491a5;
}
.news-section {
  padding: 24px;
  width: 44%;
}
.main-main {
  width: 60%;
  margin: 0 auto; /* 中心对齐 */
}
.header {
  display: flex;
  align-items: center;
  padding: 0 20px; /* Header内边距 */
  width: 61%;
  margin: 0 auto; /* 中心对齐 */
}
.news-index {
  min-width: 18px; /* 容器宽度 */
  height: 18px; /* 容器高度 */

  color: white; /* 字体颜色 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  font-size: 12px;
  border-radius: 5px;
}

.news-title {
  max-width: 410px; /* 设置最大宽度 */
  font-size: 15px;
  font-weight: bolder;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 省略号 */
}
.bg-red {
}

.nav {
  margin: 0 0%; /* 使 nav 元素距离两边各 20% */
}

.nav a {
  font-size: 15px;
  padding: 14px 15px;
  margin: 0 10px;
  text-decoration: none; /* 去除下划线 */
  color: gray; /* 设置为灰色 */
}

.nav a:hover {
  color: darkgray; /* 悬停时颜色变深 */
}

.logo {
  width: 80px; /* 设置 logo 的宽度 */
  height: 40px; /* 自动高度 */
 
}

.direct-logo {
  width: 81px; /* 设置 logo 的宽度 */
  height: 22px; /* 自动高度 */
 
}
.custom-input {
  height: 30px; /* 调整高度 */
  line-height: 30px; /* 使文本垂直居中 */
}
:deep(.search-wrapper) {
  height: 10px;
  margin-left: 40px;
  display: flex;
  width: 30%;
  align-items: center;
  border: 1px solid #dcdcdc; /* 搜索框边框 */
  background-color: #f8f8fa; /* 灰底 */
  border-radius: 20px;
  padding: 5px; /* 内边距 */
}

.search {
  /* 去除默认边框 */
  border: none;
  width: 100%; /* 使输入框占满可用空间 */
}

.search-icon {
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
  margin-left: 10px; /* 图标的左边距 */
}

.ask-button {
  margin: 0 10px 0 20px; /* 提问按钮的间距 */
  padding: 18px 20px;
  border-radius: 20px;
  width: 80px;
  background-color: #1772f6;
}

.icons {
 
  display: flex;
  align-items: center;
}

.icon-wrapper {
  display: flex;
  flex-direction: column; /* 使图标和文字垂直排列 */
  align-items: center; /* 水平居中 */
 
  position: relative;
  width: 40px;
}
.icon-word1 {
  font-size: 12px;
  position: absolute;
  top: -10px;
  width: 30px;
  left: 8px;
  color: #849184;
}

.icon-word2 {
  font-size: 12px;
  position: absolute;
  top: -10px;
  left: 11px;
  width: 30px;
  color: #849184;
}
.icon-mail {
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
  margin-left: 10px; /* 图标的左边距 */
  position: absolute;
  top: -17px;
}

.icon-message {
  width: 29px; /* 图标宽度 */
  height: 29px; /* 图标高度 */
  position: absolute;
  top: -20px;
}

.avatar {
  width: 40px; /* 头像宽度 */
  height: 40px; /* 头像高度 */
 
  border-radius: 0;
}

.module {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.module-title {
  margin-bottom: 10px;
  text-align: left;
}

.container {
  display: flex;
  justify-content: space-between;
}

.content-box {
  width: 30%;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  text-align: center;
}

.el-input__inner {
  background-color: gray !important;
}

:deep(.el-input__inner) {
  border: none;
  background-color: #f8f8fa;
  border: none;
}

:deep(.el-input__wrapper) {
  background-color: #f8f8fa;
  border: none;
  box-shadow: 0 0 0 0;
}

:deep(.el-input) {
  --el-input-focus-border-color: none;
  --el-input-hover-border-color: none;
  background-color: #f8f8fa;
  border: none;
  box-shadow: 0 0 0 0;
}

.container1 {
  display: flex;
  justify-content: space-between; /* 使一个靠左，一个靠右 */
}
 





.full-width-image {
  width: 100%; /* 或设置固定宽度 */
  height: 200px; /* 统一高度 */
  object-fit: cover; /* 保持比例，填充空间 */
}
.image-card {
  margin-bottom: 20px;
}

.info-card {

  align-items: center;
  padding: 16px;
  background-color: #fff;
}

.space-between{
    display: flex;
  justify-content: space-between;
}

.info-left {
  flex: 1;
}

.news-title {
  font-size: 18px;
  font-weight: bold;
}

.news-details {
  font-size: 14px;
  color: #9196a1;
}

.right-button {
  color: #1772f6;
    background-color: #ecf4ff;
 
  
  padding: 16px 2px; /* 内边距 */
 
  font-size: 14px;
  font-weight: bolder;
  width: 102px; /* 可设置固定宽度 */
  height: 34px; /* 设置高度 */
}

.topic-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.topic-type {
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  color: #333;
}

.topic-title {
  font-size: 14px;
  margin-left: 10px;

}


</style>
