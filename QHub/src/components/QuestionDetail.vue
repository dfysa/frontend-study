<template>
  <div class="question-detail">
    <h2 class="title">{{ question!.title }}</h2>
    <p class="content">{{ question!.content }}</p>
    <div class="info">
      <span>发布者: {{ question!.user?.username || '匿名用户' }}</span>
      <span>
        发布时间: 
        {{ TimeUtil.format(new Date(question!.createTime).getTime() / 1000) }}
      </span>
    </div>

    <h3>回复列表</h3>
    <ul class="answer-list">
      <li v-for="(answer, index) in question!.answers" :key="index">
        {{ answer.answerContent }} - {{ answer.userId }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import TimeUtil from '../utils/timeUtil';

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
}

interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
  createTime: string;
  updateTime: string;
  deleteFlag: boolean;
  answers: Answer[];
  user?: { id: number; username: string };
  likes?: number;
}

const route = useRoute();
const question = ref<Question | null>(null);

const fetchQuestionDetail = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/v1/questions/${id}`);
    question.value = data.data;
  } catch (error) {
    console.error('获取问题详情失败:', error);
  }
};

onMounted(() => {
  const stateQuestion = route.state?.question;
  if (stateQuestion) {
    question.value = stateQuestion; // 使用传递过来的数据
  } else {
    const id = Number(route.params.id);
    if (id) fetchQuestionDetail(id); // 如果没有传递数据，则请求接口
  }
});

</script>

<style scoped>
.question-detail {
  width: 60%;
  margin: 20px auto;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.content {
  font-size: 18px;
  margin-bottom: 20px;
}

.info {
  font-size: 14px;
  margin-bottom: 20px;
}

.answer-list {
  list-style: none;
  padding: 0;
}
</style>
