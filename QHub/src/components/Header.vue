<template>
  <el-header class="header">
    <el-row type="flex" justify="space-between" align="top">
      <h1 class="logo">问答系统</h1>
      <div class="user-info" v-if="userInfo">
        <!-- 消息图标 -->
        <img 
          src="https://img.icons8.com/material-rounded/24/ffffff/appointment-reminders--v1.png" 
          alt="通知" 
          class="notification-icon" 
          @click="goToNotifications" 
        />
        <!-- 头像，点击跳转到个人信息页 -->
        <el-avatar 
          :src="userInfo.avatar || 'https://placekitten.com/40/40'" 
          @click="goToUserProfile" 
          class="avatar" 
        />
        <span>{{ userInfo.accountname }}</span>
      </div>
      <div v-else>
        <el-button @click="goToLogin">请先登录</el-button>
      </div>
    </el-row>
  </el-header>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter
import { extractUserId } from '../utils/JwtUtil';
import axios from 'axios';

const router = useRouter(); // 创建 router 实例
const userInfo = ref<any>(null);

// 跳转到登录页
const goToLogin = () => {
  router.push('/login');
};

// 跳转到通知页
const goToNotifications = () => {
  router.push('/notifications'); // 跳转到消息页
};

// 跳转到个人信息页
const goToUserProfile = () => {
  router.push('/user-profile'); // 跳转到个人信息页
};

// 获取用户信息
const fetchUserInfo = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('未检测到 Token，请先登录');
    return;
  }

  const userId = extractUserId(token);
  if (!userId) {
    console.error('未检测到用户 ID，请先登录');
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // 注意：`Bearer` 前缀
      }
    });

    if (response.data.code === 200) {
      userInfo.value = response.data.data;
    } else {
      console.error(response.data.msg);
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

onMounted(fetchUserInfo);

</script>

<style scoped>
.header {
  background-color: #409eff;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  cursor: pointer; /* 鼠标悬浮变为指针 */
}

.notification-icon {
  width: 24px;
  height: 24px;
  cursor: pointer; /* 鼠标悬浮变为指针 */
}

</style>

