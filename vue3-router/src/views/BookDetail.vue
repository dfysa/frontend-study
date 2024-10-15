<template>
  <div class="book-detail">
    <h2>{{ book.title }}</h2>
    <img :src="getURL(book.cover)" alt="封面图片" />
    <p><strong>作者：</strong>{{ book.author }}</p>
    
    <div class="price-info">
      <p v-if="book.discountPrice">
        <span class="discount-price">{{ book.discountPrice }} 元</span>
        <span class="original-price">{{ book.price }} 元</span>
        <span class="discount-label">{{ calculateDiscount(book) }}% OFF</span>
      </p>
      <p v-else>{{ book.price }} 元</p>
    </div>

    <p><strong>简介：</strong>{{ book.description }}</p>
    <button @click="addToCart">加入购物车</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

// 图片 URL 处理函数
const getURL = (url: string) => new URL(`${url}`, import.meta.url).href;

const route = useRoute(); // 获取当前路由参数

// 模拟书籍数据
const books = [
  {
    id: 1,
    title: '西游记',
    author: '吴承恩',
    price: 39.99,
    discountPrice: 29.99,
    cover: '../assets/xi.png',
    description: '《西游记》是一部中国古典文学名著，讲述了唐僧师徒四人取经的传奇故事。',
  },
  {
    id: 2,
    title: '红楼梦',
    author: '曹雪芹',
    price: 49.99,
    discountPrice: 39.99,
    cover: '../assets/ho.png',
    description: '《红楼梦》是中国四大名著之一，描写了贾府的兴衰和众多人物的悲欢离合。',
  },
  {
    id: 3,
    title: '三国演义',
    author: '罗贯中',
    price: 45.00,
    cover: '../assets/sa.png',
    description: '《三国演义》是一部描写三国时期历史事件的小说。',
  },
];

const book = books.find((b) => b.id === Number(route.params.id));

// 计算折扣百分比
const calculateDiscount = (book: any) => {
  const discount = ((1 - book.discountPrice / book.price) * 100).toFixed(0);
  return discount;
};

// 加入购物车函数：将书籍添加到购物车
const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingItem = cart.find((item: { id: number }) => item.id === book.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('已加入购物车');
};
</script>

<style scoped>
 
.book-detail {
  text-align: center;
  margin-top: 20px;
}

.book-detail img {
  width: 200px;
  height: 300px;
  margin: 10px 0;
}

.price-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.discount-price {
  color: #ff4d4f;
  font-size: 1.5rem;
  font-weight: bold;
    margin-right: 5px;
 
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 1.1rem;
    margin-right: 5px;
}

.discount-label {
  background-color: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.9rem;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #359ac0;
}
</style>
