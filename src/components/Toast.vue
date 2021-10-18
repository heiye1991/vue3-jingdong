<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: #a5a5a5;
  border-radius: 0.05rem;
}
</style>
