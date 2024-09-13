<template>
 <div>
 <p>当前⽤户：{{ user.name }}，年龄：{{ user.age }}</p>
 <button @click="changeName('李四')">修改⽤户名</button>
 <button @click="resetUser">重置⽤户信息</button>
 </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
// 定义⽤户状态
const user = reactive<{ name: string; age: number }>({
 name: '张三',
 age: 30
})
// 定义⽅法修改⽤户名
const changeName = (newName: string): void => {
 user.name = newName
}
// 定义⽅法重置⽤户信息
const resetUser = (): void => {
 user.name = '张三'
 user.age = 30
}
</script>
