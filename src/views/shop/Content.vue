<template>
  <div class="content">
    <div class="category">
      <div
        v-for="item in categories"
        :key="item.name"
        class="category__item"
        :class="{ 'category__item--active': item.tab === 'all' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div v-for="item in list" :key="item._id" class="product__item">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">{{ item.sales }}</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__item__num">
          <span class="product__item__num__minus iconfont">&#xe691;</span>
          10
          <span class="product__item__num__plus iconfont">&#xe668;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  setup() {
    const categories = [
      { name: '全部商品', tab: 'all' },
      { name: '秒杀', tab: 'seckill' },
      { name: '新鲜水果', tab: 'fruit' },
    ]

    const list = [
      {
        _id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        name: '番茄250g/份',
        sales: 10,
        price: 33.6,
        oldPrice: 66.6,
      },
    ]

    return {
      categories,
      list,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  display: flex;
  .category {
    height: 100%;
    width: 0.76rem;
    background: $search-bg-color;
    overflow-y: auto;
    font-size: 0.14rem;
    color: $content-font-color;
    &__item {
      line-height: 0.4rem;
      text-align: center;
      &--active {
        background: $bgColor;
      }
    }
  }
  .product {
    flex: 1;
    overflow-y: auto;
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 1px solid $content-bg-color;
      &__img {
        width: 0.68rem;
        height: 0.68rem;
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
      &__sales {
        margin: 0.06rem 0;
        font-size: 0.12rem;
        line-height: 0.16rem;
        color: $content-font-color;
      }
      &__price {
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
}
</style>
