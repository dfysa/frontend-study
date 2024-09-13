const path =require('path')
//filename精确到文件
console.log(path.resolve(__filename))
//dirname精确到父级文件夹
console.log(path.resolve(__dirname));



const argv =process.argv
console.log('参数：',argv)
console.log(argv.slice(2));

