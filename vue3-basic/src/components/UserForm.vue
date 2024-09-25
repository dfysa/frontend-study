<template>
  <div>
    <form @submit.prevent="submitForm">
      <input type="text" placeholder="请输入用户名" v-model="form.username" />
      <input type="text" placeholder="请输入邮箱" v-model="form.email" />
      <input type="password" placeholder="请输入密码" v-model="form.password" />
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

//定义emits事件
const emit = defineEmits<{
  "submit-form": [any];
}>();

const form = reactive({
  username: "admin",
  email: "admin@qq.com",
  password: "22345",
});
// 阻止表单的默认提交，自定义了表单的提交函数
const submitForm = () => {
  //   console.log("表单提交数据", form);
  // 子组件通过emit
  emit("submit-form", form);
};
</script>

<style scoped></style>
