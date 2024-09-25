<template>
  <div class="container">
    <div v-for="(item, index) in list" :key="index" class="card">
      <div class="left">
        <img class="photo" :src="item.banner" alt="" />
      </div>
      <div class="right">
        <div class="title-and-button">
          <h2>{{ item.title }}</h2>
          <div class="follow-btn">
            <span v-if="item.isFollowing === 'TRUE'" class="follow followed">
              <h3>已关注</h3>
            </span>
            <span v-else class="follow unfollow">
              <h3>关注专题</h3>
            </span>
          </div>
        </div>
        <div class="meta">
          <span class="updated">{{ item.updated }}</span>
          <span>{{ item.viewCount }}次浏览</span>
        </div>
        <!-- 用 truncatedIntroduction 方法处理描述 -->
        <p class="introduction">
          {{ truncatedIntroduction(item.introduction, 100) }}
        </p>
      </div>
    </div>

    <div style="text-align: center">
      <button
        @click="prevPage"
        :disabled="isFirstPage"
        :class="{ disabled: isFirstPage }"
      >
        上一页
      </button>
      <button
        @click="nextPage"
        :disabled="isLastPage"
        :class="{ disabled: isLastPage }"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";

interface Special {
  id: string;
  title: string;
  banner: string;
  introduction: string;
  isFollowing: string;
  followCount: number;
  viewCount: number;
  updated: string;
}

const list = ref<Special[]>([]);

const limit = ref<number>(3); //每页条数
const offset = ref<number>(0); //偏移量
const total = ref<number>(0); //总条数

//请求分页接口
const fetchByPage = (): void => {
  axios
    .get(
      `http://localhost:8080/api/v1/special/page?limit=${limit.value}&offset=${offset.value}`
    )
    .then((res) => {
      console.log("Fetched Data:", res.data.data.specials); // 验证数据
      list.value = res.data.data.specials;
      total.value = res.data.data.total;
    })
    .catch((err) => {
      console.error(err);
    });
};

//点击下一页
const nextPage = (): void => {
  if (offset.value + limit.value >= list.value.length) {
    offset.value += limit.value;
    fetchByPage();
  }
};

//点击上一页
const prevPage = (): void => {
  if (offset.value > 0) {
    offset.value -= limit.value;
  }
  fetchByPage();
};

//两个计算属性：是否第一页，是否最后一页
const isFirstPage = computed(() => offset.value === 0);
const isLastPage = computed(() => offset.value + limit.value >= total.value);

// 页面加载生命周期
onMounted(() => {
  fetchByPage();
});

// 添加截断描述文字的方法
function truncatedIntroduction(text: string, maxLength: number): string {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
</script>

<style scoped>
/* 省略样式不变 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.photo {
  height: 140px;
  width: 336px;
}

.card {
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.left {
  flex-basis: 33.33%;
}

h2 {
  margin: 0;
}
.left img {
  max-width: 100%;
  height: auto;
}

.right {
  flex-basis: 66.67%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

.title-and-button {
  display: flex;
  justify-content: space-between;
}

.follow-btn {
  margin-left: 10px;
  text-align: right;
  height: 50px;
}

.meta {
  font-size: 14px;
  color: #9196a1;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}

.introduction {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

h3 {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.follow {
  font-size: 14px;
  font-weight: bold;
}

.followed {
  color: #716c6c;
}

.unfollow {
  color: #3670ee;
}

.unfollow h3 {
  margin: 0;
  font-weight: bold;
  background-color: #eff4fe;
  color: #3670ee;
  width: 102px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.followed h3 {
  margin: 0;
  font-weight: bold;
  background-color: #f6f6f6;
  width: 102px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1772f6;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:disabled,
button.disabled {
  background-color: #d6d6d6;
  color: #888;
  cursor: not-allowed;
}
</style>
