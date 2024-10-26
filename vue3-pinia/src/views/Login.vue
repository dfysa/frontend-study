<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuth";
import { useRouter } from "vue-router";

// 使用 ref 来追踪手机号和验证码
const authStore = useAuthStore();
const router = useRouter();
const phone = ref<string>("17351434909");
const code = ref<string>("");

// 发送验证码函数
const sendCode = async () => {
  await authStore.sendCode(phone.value); // 调用 store 中的发送验证码函数
};

// 登录函数
const login = async () => {
  await authStore.login(phone.value, code.value);
  router.push("/profile"); // 登录成功后跳转到个人中心
};
</script>

<template>
  <div>
    <h2>登录</h2>
    <input v-model="phone" placeholder="请输入手机号" />
    <button :disabled="authStore.isSending || authStore.countdown > 0" @click="sendCode">
      {{ authStore.countdown > 0 ? `重新发送 (${authStore.countdown}s)` : '发送验证码' }}
    </button>
    <input v-model="code" placeholder="请输入验证码" />
    <button @click="login">登录</button>
  </div>
</template>
