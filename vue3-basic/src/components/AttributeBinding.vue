<template>
    <div>
        <!-- 绑定 isDisabled 属性 -->
         <!-- <button v-bind="isDisabled">点击</button> -->
         <button :disabled="isDisabled">点击</button>
           <img :src="url" alt="">


           <button v-bind="buttonAttrs">点击我</button>
    </div>
</template>

<script setup lang="ts">
import {ref ,reactive} from 'vue'
const isDisabled =ref<boolean>(false)
const url=ref<string>('https://img0.baidu.com/it/u=3851590697,1173264875&fm=253&fmt=auto&app=138&f=JPEG?w=1422&h=800')


// 定义⼀个包含多个属性的对象
const buttonAttrs = reactive({
 disabled: false,
 title: '按钮已禁⽤',
 id: 'unique-button',
})

</script>

 