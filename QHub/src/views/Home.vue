<template>
  <el-container class="main-container">
    <el-header class="header">
      <Header />
    </el-header>

    <el-main>
      <!-- 切换发布问题或回答的按钮 -->
      <el-button
        type="primary"
        @click="prepareEditor('question')"
        class="toggle-editor-button"
      >
        发布问题
      </el-button>

      <QuestionEditor 
        v-if="showEditor" 
        :is-question="editorMode === 'question'" 
        :related-question-id="selectedQuestionId" 
        :parent-id="selectedAnswerId" 
        @submitted="handleSubmit" 
      />

      <!-- <h3 class="section-title">问题列表：</h3> -->
      <QuestionList 
        :questions="questions" 
        @detail="goToDetail" 
        @reply="prepareEditor" 
        class="questionList"
      />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import QuestionList from "../components/QuestionsList.vue";
import QuestionEditor from "../components/Questioneditor.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const questions = ref([]); // 问题数据
const showEditor = ref(false); // 控制编辑器显示
const selectedQuestionId = ref<number | null>(null); // 当前问题 ID
const selectedAnswerId = ref<number | null>(null); // 当前答案 ID
const editorMode = ref<'question' | 'answer' | 'reply'>('question'); // 编辑器模式
const router = useRouter();

// 获取问题数据
const fetchQuestions = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/v1/questions/getall');
    if (data.code === 200) {
      questions.value = data.data.records;
    } else {
      console.error('数据获取失败:', data.msg);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

// 跳转到问题详情页
const goToDetail = (id: number) => {
  router.push({ path: `/question/${id}` });
};

// 准备发布问题、回答或回复
const prepareEditor = (mode: 'question' | 'answer' | 'reply', questionId?: number, answerId?: number) => {
  editorMode.value = mode;
  selectedQuestionId.value = questionId || null;
  selectedAnswerId.value = answerId || null;
  showEditor.value = true;
};

// 发布成功后的处理
const handleSubmit = () => {
  showEditor.value = false;
  fetchQuestions(); // 刷新问题列表
};

onMounted(fetchQuestions);
</script>

<style scoped>
.main-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  padding: 20px;
}

.header {
background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;

  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
}

.toggle-editor-button {
  margin-bottom: 20px;
  width: 100%;
}
.el-main {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 
}

</style>
