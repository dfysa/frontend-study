<template>
  <div class="book-list">
    <h2>书籍列表</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <img :src="getURL(book.cover)" alt="封面图片" class="book-cover" />
        <div class="book-info">
          <router-link :to="`/books/${book.id}`" class="title">{{ book.title }}</router-link>
          <p class="author">作者：{{ book.author }}</p>
          <div class="price-info">
            <p v-if="book.discountPrice" class="price">
              <span class="discount-price">{{ book.discountPrice }} 元</span>
              <span class="original-price">{{ book.price }} 元</span>
              <span class="discount-label">{{ calculateDiscount(book) }}% OFF</span>
            </p>
            <p v-else class="price">{{ book.price }} 元</p>
          </div>
          <p class="description">{{ book.description.slice(0, 50) }}...</p>
          <button @click="addToCart(book)" class="add-to-cart">加入购物车</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 计算图片 URL
const getURL = (url: string) => new URL(`${url}`, import.meta.url).href;

// 计算折扣百分比
const calculateDiscount = (book: any) => {
  const discount = ((1 - book.discountPrice / book.price) * 100).toFixed(0);
  return discount;
};

// 模拟数据
const books = [
  {
    id: 1,
    title: '西游记',
    author: '吴承恩',
    price: 39.99,
    discountPrice: 29.99,
    cover: '../assets/xi.png',
    description: '《西游记》讲述了唐僧师徒四人取经的传奇故事。',
  },
  {
    id: 2,
    title: '红楼梦',
    author: '曹雪芹',
    price: 49.99,
    discountPrice: 39.99,
    cover: '../assets/ho.png',
    description: '《红楼梦》描写了贾府的兴衰和众多人物的悲欢离合。',
  },
  {
    id: 3,
    title: '三国演义',
    author: '罗贯中',
    price: 45.00,
    cover: '../assets/sa.png',
    description: '《三国演义》是一部描写三国时期历史事件的小说。',
  },
  {
    id: 4,
    title: '水浒传',
    author: '施耐庵',
    price: 42.00,
    discountPrice: 35.00,
    cover: '../assets/sh.png',
    description: '《水浒传》讲述了一百单八将的故事，是经典武侠小说。',
  },
  {
    id: 5,
    title: '四大名著合订本',
    author: '多位',
    price: 120.00,
    cover: '../assets/he.png',
    description: '包含了《西游记》《红楼梦》《三国演义》《水浒传》。',
  },
];

// 加入购物车功能
const addToCart = (book: any) => {
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
.book-list ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-list li {
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 0 auto;
}

.book-cover {
  width: 120px;
  height: 180px;
  margin-right: 15px;
  border-radius: 5px;
  object-fit: cover;
}

.book-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
}

.author {
  margin: 0px 0;   font-weight: 500;
  height: 25px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 10px;
  height: 45px;
  width: 100%;
}

.discount-price {
  color: #ff4d4f;
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 5px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
    margin-right: 5px;
}

.discount-label {
  background-color: #4caf50;
  color: white;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 0.8rem;
}

.description {
  margin: 5px 0;
  color: #666;
  line-height: 1.4;
}

.add-to-cart {
  align-self: flex-start;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #359ac0;
}
</style>
