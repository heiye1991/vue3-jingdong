<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from '@/views/orderConfirmation/TopArea.vue'
import ProductList from '@/views/orderConfirmation/ProductList.vue'
import Order from '@/views/orderConfirmation/Order.vue'
export default {
  name: 'OrderConfirmation',
  components: {
    TopArea,
    ProductList,
    Order,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $dark-bg-color;
  overflow-y: scroll;
}
</style>
