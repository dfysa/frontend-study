// pages/petDetail/petDetail.js
Page({
  data: {
  pet: {}, // 存储宠物详细信息
  },
  // ⻚⾯加载时，通过URL传递的参数获取宠物ID
  onLoad(options) {
  const { id } = options;
  const pets = [
  {
  id: 1,
  name: "旺财",
  type: "狗",
  age: 2,
  breed: "拉布拉多",
  img: "/assets/images/dog1.png",
  description: "性格温和，喜欢和⼈亲近，⾮常适合家庭饲养。",
  },
  {
  id: 2,
  name: "小咪",
  type: "猫",
  age: 1,
  breed: "布偶",
  img: "/assets/images/cat1.png",
  description: "布偶猫，粘人，适合公寓⽣活，易于照顾。",
  },
  {
  id: 3,
  name: "⼤⻩",
  type: "狗",
  age: 3,
  breed: "⾦⽑",
  img: "/assets/images/dog2.png",
  description: "聪明可爱，善于和孩⼦玩耍，适合⼤户型。",
  },
  {
  id: 4,
  name: "雪球",
  type: "狗",
  age: 1,
  breed: "⽐熊",
  img: "/assets/images/dog3.png",
  description: "⽐熊⽝，⽑发洁⽩蓬松，性格活泼好动，适合城市家庭。",
},
];
// 遍历查找 pets 数组中和参数 id ⼀样的宠物对象
const pet = pets.find((pet) => pet.id == id);
this.setData({ pet });
},
// 将宠物加⼊收藏夹
addToFavorites() {
// 获取到应⽤对象
const app = getApp();
// 应⽤级别的全局存储数据
app.globalData.favoritePets.push(this.data.pet);
wx.showToast({
title: "已加⼊收藏夹",
icon: "success",
});
},
// 跳转到收藏夹⻚⾯
goToFavorites() {
wx.navigateTo({
url: "/pages/favorite/favorite",
});
},
});