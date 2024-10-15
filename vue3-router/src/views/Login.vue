<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="store-title">
          <img src="../assets/书店.png" alt="" style="height: 30px;">
        线上书店</h1>
      <h3>用户登录</h3>
      <button @click="handleLogin" class="login-button">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogin = () => {
  // 模拟登录成功，将用户状态存储在 localStorage
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/cart'); // 导航到购物车页面
};
</script>

<style scoped>
/* 页面背景 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://source.unsplash.com/1600x900/?books');
  background-size: cover;
  background-position: center;
}

/* 登录框样式 */
.login-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

/* 标题样式 */
.store-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

/* 登录按钮样式 */
.login-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #359ac0;
}
</style>
