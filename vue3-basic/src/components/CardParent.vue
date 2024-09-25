<template>
  <div>
    <Card>
      <template #header>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum fugiat
          maxime nostrum aut, quam dicta saepe qui commodi, ipsam pariatur
          autem. Corrupti, pariatur omnis. Laboriosam eaque optio nobis saepe
          voluptatibus.
        </p>
      </template>
      <template #main>
        <h3>中间内容</h3>
      </template>
      <template #footer>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          ipsa esse quaerat error tempora culpa enim unde ratione veritatis
          reprehenderit magni dolore iure, ducimus beatae est, placeat molestias
          rerum quisquam.
        </p>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
</script>

<style scoped></style>
