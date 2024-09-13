<template>
    <div>
     <p :class="pClass">这是一段文字</p>
     <button @click="toggleClass">切换样式</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const isHighLight =ref<boolean>(false)

//  动态切换的样式名
const pClass =ref<{[key:string]:boolean}>({
    isHighLight:isHighLight.value,
    normal:!isHighLight.value
})

// 切换类名的函数
const toggleClass=()=>{
        isHighLight.value=!isHighLight.value,
    pClass.value={
       isHighLight:isHighLight.value,
    normal:!isHighLight.value
    }
}

</script>

<style scoped>
.isHighLight{
    color:red
}

.normal{
    color:black
}
</style>