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
    <ShopInfo v-show="item.imgUrl" :item="item" :show-border="false" />
    <Content />
    <Cart />
  </div>
  <toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import ShopInfo from '@/components/ShopInfo'
import Toast, { useToastEffect } from '@/components/Toast'
import { get } from '@/utils/request'
import Content from '@/views/shop/Content'
import Cart from '@/views/shop/Cart'

const useShopInfoEffect = toastHandler => {
  const route = useRoute()
  const id = route.params.id
  let shopInfo = reactive({
    item: {},
  })
  const getShopInfoById = async () => {
    try {
      const result = await get(`/api/shop/${id}`)
      if (result?.errno === 0 && result?.data) {
        shopInfo.item = result.data
      } else {
        toastHandler('获取商铺信息失败')
      }
    } catch (err) {
      toastHandler('请求失败')
    }
  }
  const { item } = toRefs(shopInfo)
  return {
    item,
    getShopInfoById,
  }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Toast,
    Content,
    Cart,
  },
  setup() {
    const { toastData, toastHandler } = useToastEffect()
    const { item, getShopInfoById } = useShopInfoEffect(toastHandler)
    getShopInfoById()

    return {
      toastData,
      item,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.wrapper {
  padding: 0 0.18rem;
  .search {
    display: flex;
    margin: 0.14rem 0 0.04rem;
    line-height: 0.32rem;
    &__back {
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      background: $search-bg-color;
      border-radius: 16px;
      &__icon {
        width: 0.44rem;
        text-align: center;
        color: $search-font-color;
      }
      &__input {
        height: 0.32rem;
        width: 100%;
        padding-right: 0.12rem;
        color: $content-font-color;
        font-size: 0.14rem;
        border: none;
        background: none;
        &::placeholder {
          color: $content-font-color;
        }
      }
    }
  }
}
</style>
