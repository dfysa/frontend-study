 
<template>
    <h1 style="align-items: center;">
        <img src="../assets/书店.png" alt="" style="height: 30px;">
        线上书店</h1>
<nav>
  <router-link to="/home">首页</router-link>
   <!-- <router-link to="/articles">文章列表</router-link> -->
   
        <router-link to="/cart">购物车</router-link>    
   <router-link to="/user">个人中心</router-link>
        

        
        
</nav>
<!-- 
<router-view  >
 
</router-view> -->
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>

</template>

<style scoped>
 /* 定义路由导航样式 */
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
 

.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
