<template>
  <div v-if="shopName" class="products">
    <div class="products__title">
      {{ shopName }}
    </div>
    <div class="products__wrapper">
      <div class="product">
        <div v-for="item in productList" :key="item._id" class="product__item">
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>
              {{ item.price }} x {{ item.count }}
            </p>
          </div>
          <span class="products__item__total">
            <span class="products__item__yen">&yen; </span>
            {{ (item.price * item.count).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffect'

export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)

    return {
      shopName,
      productList,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins.scss';
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: $bgColor;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: $content-font-color;
    font-weight: bold;
  }
  &__wrapper {
    overflow-y: scroll;
    margin: 0 0.18rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    top: 2.6rem;
    .product {
      background: $bgColor;
      &__item {
        position: relative;
        display: flex;
        padding: 0 0.16rem 0.16rem 0.16rem;
        &__img {
          width: 0.46rem;
          height: 0.46rem;
          margin-right: 0.16rem;
        }
        &__detail {
          overflow: hidden;
          flex: 1;
        }
        &__title {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: $content-font-color;
          @include ellipsis;
        }
        &__price {
          display: flex;
          margin: 0.06rem 0 0 0;
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: $highlight-font-color;
        }
        &__yen {
          font-size: 0.12rem;
        }
        &__total {
          flex: 1;
          text-align: right;
          color: $dark-font-color;
        }
      }
    }
  }
}
</style>
