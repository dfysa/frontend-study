Page({
  data: {
  inputAmount: '', // 存储⽤户输⼊的⾦额
  inputNote: '', // 存储⽤户输⼊的备注
  totalBalance: 0, // 总余额，初始化为 0
  records: [] // 存储交易记录的数组
  },
  // 处理⽤户输⼊的⾦额，将输⼊框中的值存⼊ inputAmount
  handleAmountInput(event) {
  this.setData({
  inputAmount: event.detail.value // 从 event 中获取输⼊的值，更新 inputAmount
  });
  },
  // 处理⽤户输⼊的备注，将输⼊框中的值存⼊ inputNote
  handleNoteInput(event) {
  this.setData({
  inputNote: event.detail.value // 从 event 中获取输⼊的值，更新 inputNote
  });
  },
  // 添加收⼊记录
  addIncome() {
  const { inputAmount, inputNote, records, totalBalance } = this.data;
 // 获取当前的输⼊值、记录数组和总余额
  // 检查⽤户是否输⼊了⾦额
  if (inputAmount) {
  // 创建新的收⼊记录对象
  const newRecord = {
  type: '收⼊', // 交易类型：收⼊
  amount: parseFloat(inputAmount), // 将输⼊的⾦额转换为浮点数
  note: inputNote || '⽆备注' // 如果备注为空，则设置为 "⽆备注"
  };
  // 更新记录列表和总余额
  records.push(newRecord); // 将新记录添加到 records 数组
  this.setData({
  records, // 更新记录数组
  totalBalance: totalBalance + newRecord.amount, // 增加总余额
  inputAmount: '', // 清空输⼊框
  inputNote: '' // 清空备注输⼊框
});
} else {
// 如果⽤户没有输⼊⾦额，弹出提示信息
wx.showToast({
title: '请输⼊⾦额', // 提示信息
icon: 'none' // 不显示图标
});
}
},
// 添加⽀出记录
addExpense() {
const { inputAmount, inputNote, records, totalBalance } = this.data;
// 获取当前的输⼊值、记录数组和总余额
// 检查⽤户是否输⼊了⾦额
if (inputAmount) {
// 创建新的⽀出记录对象
const newRecord = {
type: '⽀出', // 交易类型：⽀出
amount: parseFloat(inputAmount), // 将输⼊的⾦额转换为浮点数
note: inputNote || '⽆备注' // 如果备注为空，则设置为 "⽆备注"
};
// 更新记录列表和总余额
records.push(newRecord); // 将新记录添加到 records 数组
this.setData({
records, // 更新记录数组
totalBalance: totalBalance - newRecord.amount, // 减少总余额
inputAmount: '', // 清空输⼊框
inputNote: '' // 清空备注输⼊框
});
} else {
// 如果⽤户没有输⼊⾦额，弹出提示信息
wx.showToast({
title: '请输⼊⾦额', // 提示信息
icon: 'none' // 不显示图标
});
}
},
// 删除记录
removeRecord(event) {
const index = event.currentTarget.dataset.index; // 获取要删除的记录索引
const { records, totalBalance } = this.data; // 获取当前的记录数组和总余额
const record = records[index]; // 获取要删除的记录
 // 更新总余额
 const newBalance = record.type === '收⼊'? totalBalance - record.amount : totalBalance + record.amount;  
 // 删除该记录并更新数据
 records.splice(index, 1); // 从 records 数组中删除指定的记录
 this.setData({
 records, // 更新记录数组
 totalBalance: newBalance // 更新总余额
 });
 }
});
