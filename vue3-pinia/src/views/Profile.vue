<template>
    <div>
        <h2>欢迎来到个人中心</h2>
        <p>昵称:{{ user?.nickname }}</p>
        <img :src="user?.avatar" alt="avatar" width="100" height="100" />
        <p>积分:{{ user?.bonus }}</p>
        <button @click="handleLogout">退出登录</button>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const handleLogout = () => {
    clearUser();
    router.push("/login");
};
import { useUserStore } from "../stores/useUser"

import { onMounted} from "vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);// 批量解构响应式状态

const { fetchUser, clearUser } = userStore;//解构方法

onMounted(() => {
    fetchUser();
});
</script>