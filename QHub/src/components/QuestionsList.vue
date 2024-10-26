<template>
  <div class="post-container">
    <!-- 搜索框 -->
    <div class="search-bar">
      <input
        v-model="searchTitle"
        placeholder="输入问题标题进行搜索"
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">🔍 搜索</button>
    </div>

    <div v-if="!questions.length" class="empty-message">
      <p>目前还没有问题，期待你的提问！</p>
    </div>

    <div
      v-else
      v-for="(question, index) in questions"
      :key="index"
      class="post-card"
      @click="emitDetail(question.id)"
    >
      <div class="header">
        <div class="user-info">
          <img :src="question.avatar" class="avatar" />
          <div>
            <span class="username">{{ question.accountname || '匿名用户' }}</span>
            <span class="time">{{  question.updateTime }}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <h3 class="title">{{ question.title }}</h3>
        <p class="question-content" v-html="question.content"></p>
      </div>

      <div class="footer">
        <span class="info">💬 {{ question.answers.length }} 条回复</span>
        <span class="info">👍 {{ question.questionLikeCount ?? 0 }} 个赞</span>
      </div>
    </div>

    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="page"
      :page-size="size"
      :total="total"
      @current-change="fetchQuestions"
   
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import TimeUtil from '../utils/timeUtil';

// 获取 router 实例
const router = useRouter();
const questions = ref([]); // 问题数据
const page = ref(0); // 当前页码
const size = ref(5); // 每页条目数
const total = ref(0); // 总条目数
const searchTitle = ref(''); // 搜索关键词
    const formatTime = (updateTime) => {
      return TimeUtil.timeAgo(updateTime); // 使用 TimeUtil 进行时间格式化
    };
// 获取问题数据
const fetchQuestions = async (currentPage = page.value, title = '') => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/questions/getall', {
      params: {
        page: currentPage - 1,
        size: size.value,
        title: title || undefined, // 仅在有输入时传递 title
      },
    });

    if (response.data.code === 200) {
      questions.value = response.data.data.records;
      total.value = response.data.data.total; // 确保这个总数是正确的
    } else {
      console.error('数据获取失败:', response.data.msg);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

// 处理搜索按钮点击事件
const handleSearch = () => {
  page.value = 1; // 重置为第一页
  fetchQuestions(1, searchTitle.value);
};

 
 
// 跳转到问题详情页
const emitDetail = (id: number) => {
  router.push({ path: `/question/${id}` });
};

// 页面加载时调用
onMounted(() => fetchQuestions());
</script>

<style scoped>
/* 搜索栏 */
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.search-input {
  width: 300px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-button {
background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s;
  min-width: 100px;
}

.search-button:hover {
  background-color: #2563eb;
}

/* 布局容器 */
.post-container {
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
}

/* 提示信息 */
.empty-message {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
}

/* 单个帖子卡片 */
.post-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.3s;
  cursor: pointer;
}
.post-card:hover {
  background-color: #f9f9f9;
  transform: scale(1.02);
}

/* 头部：用户信息 */
.header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

/* 内容部分 */
.content {
  margin-top: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px;
}

.question-content {
  font-size: 15px;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  max-height: 40px;
}

/* 底部：回复数和点赞数 */
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.info {
  margin-right: 10px;
  color: #888;
}
</style>
