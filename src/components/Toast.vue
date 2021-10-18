<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Toast',
  props: {
    message: String,
  },
  setup() {
    return {}
  },
}

export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: '',
  })
  const toastHandler = message => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return {
    toastData,
    toastHandler,
  }
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
