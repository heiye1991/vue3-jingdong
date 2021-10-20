<template>
  <div class="wrapper">
    <div class="search">
      <router-link to="/">
        <div class="search__back iconfont">&#xe6f2;</div>
      </router-link>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62d;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <shop-info :item="item" :show-border="false" />
  </div>
</template>

<script>
import ShopInfo from '@/components/ShopInfo'

export default {
  name: 'Shop',
  components: {
    ShopInfo,
  },
  setup() {
    const item = {
      expressLimit: 0,
      expressPrice: 5,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      name: '沃尔玛',
      sales: 10000,
      slogan: 'VIP尊享满89元减4元运费券',
      _id: '1',
    }
    return {
      item,
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
  .search {
    display: flex;
    margin: 0.2rem 0 0.16rem;
    line-height: 0.32rem;
    &__back {
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      background: #f5f5f5;
      border-radius: 16px;
      &__icon {
        width: 0.44rem;
        text-align: center;
        color: #b7b7b7;
      }
      &__input {
        height: 0.32rem;
        width: 100%;
        padding-right: 0.12rem;
        color: #333;
        font-size: 0.14rem;
        border: none;
        background: none;
        &::placeholder {
          color: #333;
        }
      }
    }
  }
}
</style>
