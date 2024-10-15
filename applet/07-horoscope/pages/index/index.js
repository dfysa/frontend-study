// 导⼊⽣成运势的⼯具模块
const horoscope = require('../../utils/horoscope.js');
Page({
 data: {
 showPopup: false, // 控制弹出层显示与否
 zodiacSigns: ['⽩⽺座', '⾦⽜座', '双⼦座', '巨蟹座', '狮⼦座', '处⼥座','天秤座', '天蝎座', '射⼿座', '摩羯座', '⽔瓶座', '双⻥座'], // 星座列表
 selectedSign: '', // ⽤户选择的星座
 horoscopeData: '', // ⽣成的星座运势
 luckyColor: '', // 幸运颜⾊
 luckyNumber: '' // 幸运数字
 },
 // 显示星座选择弹窗
 showPopup() {
 this.setData({ showPopup: true });
 },
 // 关闭星座选择弹窗
 onClose() {
 this.setData({ showPopup: false });
 },
 // 当⽤户选择星座后，触发的事件
 onSelectSign(event) {
 const sign = event.detail.value; // 获取⽤户选择的星座
 const { horoscopeData, luckyColor, luckyNumber } = horoscope.getDailyHoroscope(sign); // ⽣成运势数据

 // 更新⻚⾯的数据
 this.setData({
 selectedSign: sign,
 horoscopeData: horoscopeData,
 luckyColor: luckyColor,
 luckyNumber: luckyNumber,
 showPopup: false // 关闭弹窗
 });
 }
});