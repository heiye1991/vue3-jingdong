<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBackClick">
        &#xe6f2;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div v-if="currentAddress" @click="handleAddressClick">
        <div class="top__receiver__address">
          {{ currentAddress.city }}{{ currentAddress.department
          }}{{ currentAddress.houseNumber }}
        </div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">{{
            currentAddress.name
          }}</span>
          <span class="top__receiver__info__name">{{
            currentAddress.phone
          }}</span>
        </div>
        <div class="top__receiver__enter iconfont">&#xe6f2;</div>
      </div>
      <div v-else class="top__receiver__address">暂无可用地址</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { backEffect } from '@/effects/backEffect'
import { useCommonAddressEffect } from '@/effects/addressEffect'

export default {
  name: 'TopArea',
  setup() {
    const router = useRouter()
    const { handleBackClick } = backEffect()
    const handleAddressClick = () => {
      router.push(`/chooseAddressList`)
    }
    const { getAddressList, currentAddress } = useCommonAddressEffect()
    getAddressList()

    return {
      handleBackClick,
      handleAddressClick,
      currentAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins.scss';
.top {
  padding: 0 0.18rem;
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding: 0.25rem 0 0.22rem;
    line-height: 0.24rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0;
      font-size: 0.2rem;
    }
  }
  &__receiver {
    position: relative;
    height: 1.11rem;
    background: $bgColor;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-font-color;
      font-weight: bold;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-font-color;
      @include ellipsis;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: $medium-font-color;
      }
    }
    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $medium-font-color;
      font-size: 0.2rem;
    }
  }
}
</style>
