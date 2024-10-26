<script setup lang="ts">
import Counter from './views/Counter.vue';
import Todo from './views/Todo.vue';

</script>

<template>
<nav>
  <!-- <router-link to="/counter">计数器</router-link>
<router-link to="/todo">待办清单</router-link>
<router-link to="/list">记账应用</router-link> -->
<router-link to="/login">登录</router-link>
<router-link to="/profile">个人信息</router-link>
</nav>

<router-view></router-view>
</template>

<style scoped>
 a{
  margin: 20px;
  text-decoration: none;
  color: #3baee0;

  padding: 5px 10px;

}
/* 自定义路由激活样式 */
.router-link-active{
  font-weight: bold;
    color: white;
  background-color: #3baee0;
}
 

</style>
