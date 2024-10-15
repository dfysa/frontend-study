<template>
    <div>
        <p>当前窗口大小：宽{{ width }}px，高{{ height }}px</p>
        <div :class="{'mobile-layout': isMobile}">
            <p>{{ isMobile ? "移动端布局" : "桌面端布局" }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

const { width, height } = useWindowSize();

// 计算窗口宽度是否小于 768px，小于则为移动端
const isMobile = computed(() => {
    return width.value < 768;
});
</script>

<style scoped>
div {
    text-align: center;
    margin-top: 20px;
}

/* 默认桌面端布局为 lightblue */
.mobile-layout {
    background-color: lightblue;
}

.mobile-layout p {
    font-size: 24px;
}

/* 当宽度小于 768px 时，即移动端布局时，变为 lightcoral */
@media (max-width: 800px) {
    .mobile-layout {
        background-color: lightcoral;
    }

    .mobile-layout p {
        font-size: 10px;
    }
}
</style>
