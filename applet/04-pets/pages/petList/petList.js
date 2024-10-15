// pages/petList/petList.js
Page({
  data: {
  petList: [] // 存储宠物列表数据
  },
  // 在⻚⾯加载时请求或模拟获取宠物数据
  onLoad() {
  this.setData({
  petList: [
  {
  id: 1,
  name: "旺财",
  type: "狗",
  age: 2,
  breed: "拉布拉多",
  img: "/assets/images/dog1.png",
  description: "性格温和，喜欢和⼈亲近，⾮常适合家庭饲养。"
  },
  {
  id: 2,
  name: "⼩咪",
  type: "猫",
  age: 1,
  breed: "布偶",
  img: "/assets/images/cat1.png",
  description: "布偶猫，喜欢独⽴，适合公寓⽣活，易于照顾。"
  },
  {
  id: 3,
  name: "⼤⻩",
  type: "狗",
  age: 3,
  breed: "⾦⽑",
  img: "/assets/images/dog2.png",
  description: "聪明可爱，善于和孩⼦玩耍，适合⼤户型。"
  },
  {
  id: 4,
  name: "雪球",
  type: "狗",
  age: 1,
  breed: "⽐熊",
  img: "/assets/images/dog3.png",
  description: "⽐熊⽝，⽑发洁⽩蓬松，性格活泼好动，适合城市家庭。"
  }
 ]
 });
 },
 // 当点击某只宠物时，跳转到详情⻚⾯
 onPetTap(event) {
 const petId = event.currentTarget.dataset.id;
 wx.navigateTo({
 url: `/pages/petDetail/petDetail?id=${petId}`
 });
 }
});
