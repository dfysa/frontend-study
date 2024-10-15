<template>
    <div>
<h2>列表</h2>
<div style="height: 2000px;">
    <p>总之很长</p>
</div>
<ul>
    <li v-for="article in articles" :key="article.id">
<router-link    :to="`/articles/${article.id}`">        {{ article.title }}</router-link>



    </li>
</ul>
    </div>
</template>

<script setup lang="ts">

const articles=[
    {
        id:1,
        title:"如何学习 Vue3"
    },
        {
        id:2,
        title:"理解 Vue Router"
    }
]

</script>

<script lang="ts">
export default{
    beforeRouteEnter(to,from,next){
        console.log(to.form);
        console.log("进入页面");
        next();
    },
};


</script>

<style scoped>

</style>