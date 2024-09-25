<template>
  <div class="card">
    <header>
      <slot name="header">
        <h3>默认头部</h3>
      </slot>
    </header>
    <main>
      <slot name="main">
        <h3>默认主体内容</h3>
      </slot>
    </main>
    <footer>
      <slot name="footer">
        <h3>默认底部</h3>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 20px;
}

header,
footer {
  background-color: #f5f5f5;
  padding: 10px;
}
</style>
