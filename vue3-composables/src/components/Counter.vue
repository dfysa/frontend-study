<template>
    <div>
        <p>当前计数器的值：{{ count }}</p>
        <button @click="increment"> 增加</button>
        <button @click="decrement"> 减少</button>
                <button @click="reset"> 清空</button>

    </div>
</template>

<script setup lang="ts">
import { userCounter } from '../composables/userCounter';

const{count,increment,decrement,reset}=userCounter(10)

</script>

<style scoped>

</style>