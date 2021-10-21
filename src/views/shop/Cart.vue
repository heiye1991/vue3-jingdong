<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <div v-if="showCart" class="product">
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__item__num">
            <span
              class="product__item__num__minus iconfont"
              @click="changeCartItemInfo(shopId, item._id, item, -1)"
              >&#xe691;
            </span>
            {{ item.count || 0 }}
            <span
              class="product__item__num__plus iconfont"
              @click="changeCartItemInfo(shopId, item._id, item, 1)"
              >&#xe668;
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon" @click="handleCartShowChange">
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
import { computed, ref } from 'vue'
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

  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num,
    })
  }

  const toggleCartEffect = () => {
    const showCart = ref(false)
    const handleCartShowChange = () => {
      showCart.value = !showCart.value
    }
    return { showCart, handleCartShowChange }
  }

  return {
    total,
    totalPrice,
    productList,
    shopId,
    changeCartItemInfo,
    toggleCartEffect,
  }
}

export default {
  name: 'Cart',
  setup() {
    const {
      total,
      totalPrice,
      productList,
      shopId,
      changeCartItemInfo,
      toggleCartEffect,
    } = useCartEffect()
    const { showCart, handleCartShowChange } = toggleCartEffect()

    return {
      total,
      totalPrice,
      productList,
      shopId,
      changeCartItemInfo,
      showCart,
      handleCartShowChange,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
  .product {
    flex: 1;
    overflow-y: auto;
    background: #fff;
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 1px solid $content-bg-color;
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__detail {
        overflow: hidden;
      }
      &__title {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: $content-font-color;
        @include ellipsis;
      }
      &__price {
        margin-top: 0.06rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: $highlight-font-color;
      }
      &__yen {
        font-size: 0.12rem;
      }
      &__origin {
        margin-left: 0.06rem;
        line-height: 0.2rem;
        font-size: 0.12rem;
        color: $light-font-color;
        text-decoration: line-through;
      }
      &__num {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
        font-size: 0.14rem;
        color: $content-font-color;
        &__minus,
        &__plus {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          text-align: center;
        }
        &__minus {
          margin-right: 0.04rem;
          color: $medium-font-color;
        }
        &__plus {
          margin-left: 0.04rem;
          color: $btn-color;
        }
      }
    }
  }
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
