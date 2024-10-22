<template>
  <el-container class="detail-container">
    <el-header class="header">
      <Header />
    </el-header>

    <el-main v-if="question">
      <div class="post-card">
        <div class="post-header">
          <img :src="question.avatar" class="avatar" />
          <div class="user-info">
            <p class="username">{{ question.accountname }}</p>
            <p class="timestamp">{{ formatTime(question.createTime) }}</p>
          </div>
        </div>
        <h2 class="title">{{ question.title }}</h2>
        <p class="content" v-html="question.content"></p>
        <div class="post-footer">
          <el-button @click="toggleLike(question.id, 2)">
            👍 {{ question.questionLikeCount }} 赞
          </el-button>
        </div>
      </div>

      <el-button type="primary" @click="showEditor = !showEditor">
        {{ showEditor ? '取消回答' : '发布回答' }}
      </el-button>

      <QuestionEditor v-if="showEditor" @submit="submitAnswer" :related-question-id="question.id" />

      <h3 class="section-title">回复列表：</h3>
      <div v-if="question.answers.length === 0" class="empty-message">
        等你来回复
      </div>
      <div v-else>
        <AnswerItem
          v-for="answer in mainAnswers"
          :key="answer.answerId"
          :answer="answer"
          :all-answers="question.answers"
          @toggleLike="toggleLike"
          @reply="submitNestedAnswer"
        />
      </div>
    </el-main>

    <el-main v-else>
      <p>正在加载问题详情...</p>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import AnswerItem from "../components/AnswerItem.vue";
import QuestionEditor from "../components/editor.vue";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const route = useRoute();
const question = ref(null);
const showEditor = ref(false);
const id = route.params.id;

const fetchQuestionDetail = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/v1/questions/${id}`);
    question.value = data.data;
  } catch (error) {
    console.error("获取问题详情失败:", error);
  }
};

const mainAnswers = computed(() =>
  question.value ? question.value.answers.filter((a) => a.parentId === null) : []
);

const submitAnswer = async (content: string) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/v1/answers/add",
      { content, relatedQuestionId: question.value.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    showEditor.value = false;
    fetchQuestionDetail();
  } catch (error) {
    console.error("提交答案失败:", error);
  }
};

const submitNestedAnswer = async (content: string, parentId: number) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/v1/answers/add",
      { content, relatedQuestionId: question.value.id, parentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchQuestionDetail();
  } catch (error) {
    console.error("提交嵌套回复失败:", error);
  }
};

const toggleLike = async (targetId: number, type: number) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/v1/likes/toggle",
      {},
      { params: { targetId, type }, headers: { Authorization: `Bearer ${token}` } }
    );
    fetchQuestionDetail();
  } catch (error) {
    console.error("点赞失败:", error);
  }
};

const formatTime = (time: string) =>
  new Date(time).toLocaleString("zh-CN", { hour12: false });

onMounted(fetchQuestionDetail);
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.header {
  background-color: #409eff;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-card, .answer-card {
  background-color: white;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header, .answer-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  border-radius: 50%;
  margin-right: 10px;
  height: 50px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  margin: 0;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content, .answer-content {
  margin-bottom: 10px;
  font-size: 16px;
}

.post-footer, .answer-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #666;
}

.section-title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.empty-message {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin: 20px 0;
}
</style>
