<template>
 <div>
 <p>⽤户名：{{ user.name }}</p>
 <p>年龄：{{ user.age }}</p>
 <button @click="increaseAge">增加年龄</button>
 </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
// 使⽤ reactive 定义复杂对象的响应式状态
const user = reactive<{ name: string; age: number }>({
 name: '张三',
 age: 25,
})
// 定义增加年龄的⽅法
const increaseAge = (): void => {
 user.age++
}
</script>
