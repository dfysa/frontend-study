<template>
  <div class="user-dashboard">
    <nav class="nav">
      <router-link to="/user/profile">用户信息</router-link>
      <router-link to="/user/setting">用户设置</router-link>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
.nav {
  margin: 20px;
}
a {
  margin: 20px 10px;
  text-decoration: none;
  color: #3baee0;
  padding: 5px 10px;
}
.router-link-active {
  font-weight: bold;
  color: white;
  background-color: #3baee0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
