<template>
  <div class="send-email">
    <EmailForm :email="myEmail" @submit-form="handleSendEmail"></EmailForm>

    <div v-if="sentEmail" class="email-details">
      <h3>发送的邮件信息</h3>
      <p><strong>收件人邮箱：</strong>{{ sentEmail.email }}</p>
      <p><strong>邮件标题：</strong>{{ sentEmail.title }}</p>
      <p><strong>邮件内容：</strong>{{ sentEmail.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EmailForm from "./EmailForm.vue";

// 初始化邮件数据
const myEmail = ref({
  email: "zhangsan@qq.com",
  title: "标题",
  content: "内容",
});

// 存储发送的邮件信息
const sentEmail = ref<null | { email: string; title: string; content: string }>(
  null
);

// 处理子组件传递过来的邮件对象
const handleSendEmail = (email: {
  email: string;
  title: string;
  content: string;
}) => {
  sentEmail.value = email; // 将接收到的邮件对象存储并渲染
};
</script>

<style scoped>
.send-email {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.email-details {
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  font-size: 22px;
  color: #333;
}

p {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

strong {
  color: #333;
}
</style>
