<template>
    <div>
        <h3>评论</h3>
        <div v-if="articleComments">
            <div v-for="(comment, index) in articleComments.comments" :key="index">
                <p><strong>用户{{ index + 1 }}</strong>: {{ comment }}</p>
            </div>
        </div>
        <div v-else>
            <p>暂无评论</p>
        </div>

        <!-- 新评论输入框 -->
        <textarea v-model="newComment" placeholder="添加评论"></textarea>
        <button @click="addComment">提交</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// 评论数据，每个对象对应一篇文章的评论数组
const commentsData = ref([
    { articleId: 1, comments: ['这篇文章很好！', '非常有帮助！'] },
    { articleId: 2, comments: ['学习到了很多。'] },
]);

const route = useRoute();
const articleId = Number(route.params.id);
const newComment = ref('');

// 根据文章ID查找对应的评论
const articleComments = computed(() =>
    commentsData.value.find(item => item.articleId === articleId)
);

// 添加新评论
const addComment = () => {
    if (newComment.value.trim()) {
        articleComments.value?.comments.push(newComment.value.trim());
        newComment.value = ''; // 清空输入框
    }
};
</script>

<style scoped>
textarea {
    width: 100%;
    height: 80px;
    margin-top: 10px;
}
button {
    margin-top: 10px;
}
</style>
