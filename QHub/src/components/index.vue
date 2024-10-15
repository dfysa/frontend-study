<template>
  <div class="post-container">
    <div 
      v-for="(question, index) in questions" 
      :key="index" 
      class="post-card"
      @click="goToDetail(question.id)" 
    >

       <!-- <li v-for="article in articles" :key="article.id">
<router-link    :to="`/articles/${article.id}`">        {{ article.title }}</router-link>



    </li> -->


    
      <!-- 第一行：问题标题 + 用户名 -->
      <div class="header">
        <h3 class="title">{{ question.title }}</h3>
        <span class="username">{{ question.userName || '匿名用户' }}</span>
      </div>

      <!-- 第二行：问题内容 + 发布时间/更新时间 -->
      <div class="content">
        <p class="question-content">{{ question.content }}</p>
        <span class="time">
          {{ TimeUtil.format(new Date(question.updateTime).getTime() / 1000, 'YYYY-MM-DD HH:mm:ss') }}
        </span>
      </div>

      <!-- 第三行：回复数 + 点赞数 -->
      <div class="footer">
        <span class="info">{{ question.answers.length }} 条回复</span>
        <span class="info">{{ question.likes ?? 0 }} 个赞</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter
import axios from 'axios';
import TimeUtil from '../utils/timeUtil';

// 用户接口
interface User {
  id: number;
  userName: string;
}

// 回答接口
interface Answer {
  answerId: number;
  relatedQuestionId: number;
  parentId: number | null;
  userId: number;
  answerContent: string;
  acreateTime: string;
  aupdateTime: string;
  deleteFlag: boolean;
  replies: Answer[];
    userName: string;

}

// 问题接口
interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
  createTime: string;
  updateTime: string;
  deleteFlag: boolean;
  answers: Answer[];
  user?: User; // 关联的用户信息
  likes?: number; // 点赞数
    userName: string;
}

const questions = ref<Question[]>([]);
const router = useRouter(); // 获取路由实例

// 跳转到详情页
const goToDetail = (question: Question) => {
  router.push({
    name: 'QuestionDetail',
    state: { question }, // 将问题对象作为 state 传递
  });
};


// 获取问题数据
const fetchQuestions = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/v1/questions/getall');
    questions.value = data.data;
  } catch (error) {
    console.error('获取问题数据失败:', error);
  }
};

onMounted(fetchQuestions);
</script>

<style scoped>
/* 布局容器 */
.post-container {
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
}

/* 单个帖子卡片 */
.post-card {
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
  cursor: pointer; /* 增加鼠标指针样式 */
  transition: background-color 0.3s;
}
.post-card:hover {
  background-color: #f9f9f9;
}

/* 帖子头部：标题 + 用户名 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.username {
  font-size: 14px;
  color: #666;
}

/* 内容部分：问题内容 + 时间 */
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.question-content {
  font-size: 15px;
  color: #444;
  width: 70%;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  font-size: 12px;
  color: #999;
}

/* 底部：回复数 + 点赞数 */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #555;
}

.info {
  margin-right: 15px;
  color: #888;
}
</style>
