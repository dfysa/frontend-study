<template>
    <div>
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <router-link :to="`/articles/${articleId}/comments`">查看评论</router-link>
        <router-view></router-view> <!-- 用于显示嵌套路由 -->
    </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'

const route =useRoute();
// 接收到路由中的id参数
const articleId=route.params.id;

const articles=[
    {
        id:1,
        title:"西游记",
        content:"如何学习 Vue3如何学习 Vue3如何学习 Vue3如何学习 Vue3如何学习 Vue3如何学习 Vue3"
    },
        {
        id:2,
        title:"红楼梦",
         content:"理解 Vue Router理解 Vue Router理解 Vue Router理解 Vue Router理解 Vue Router理解 Vue Router"
    }
]

// 查找id为articleId的文章
const article=articles.find((a)=>a.id===Number(articleId))

</script>

<style scoped>

</style>