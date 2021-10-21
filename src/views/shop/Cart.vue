<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ totalPrice }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const useCartEffect = () => {
  const route = useRoute()
  const store = useStore()
  const shopId = route.params.id
  const cartList = store.state.cartList
  const total = computed(() => {
    let count = 0
    const productList = cartList[shopId]
    if (productList) {
      for (const item of Object.values(productList)) {
        count += item.count
      }
    }
    return count
  })
  const totalPrice = computed(() => {
    let price = 0
    const productList = cartList[shopId]
    if (productList) {
      for (const item of Object.values(productList)) {
        price += item.count * item.price
      }
    }
    return price.toFixed(2)
  })
  return {
    total,
    totalPrice,
  }
}

export default {
  name: 'Cart',
  setup() {
    const { total, totalPrice } = useCartEffect()

    return {
      total,
      totalPrice,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  .check {
    display: flex;
    height: 0.5rem;
    border-top: 0.01rem solid $content-bg-color;
    line-height: 0.5rem;
    &__icon {
      position: relative;
      width: 0.84rem;
      &__img {
        display: block;
        margin: 0.12rem auto;
        width: 0.28rem;
        height: 0.26rem;
      }
      &__tag {
        position: absolute;
        left: 0.46rem;
        top: 0.04rem;
        padding: 0 0.04rem;
        min-width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        background-color: $highlight-font-color;
        border-radius: 0.1rem;
        font-size: 0.12rem;
        text-align: center;
        color: #fff;
        transform: scale(0.5);
        transform-origin: left center;
      }
    }
    &__info {
      flex: 1;
      color: $content-font-color;
      font-size: 0.12rem;
      &__price {
        color: $highlight-font-color;
        font-size: 0.18rem;
      }
    }
    &__btn {
      width: 0.98rem;
      background-color: $btn-color;
      text-align: center;
      font-size: 0.14rem;
      a {
        color: $bgColor;
        text-decoration: none;
      }
    }
  }
}
</style>
