<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="top__header__back iconfont" @click="handleBackClick">
          &#xe6f2;
        </div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">
          北京理工大学国防科技园2号楼10层
        </div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18911024266</span>
        </div>
        <div class="top__receiver__enter iconfont">&#xe6f2;</div>
      </div>
    </div>
    <div class="products">
      <div class="products__title">
        {{ shopName }}
      </div>
      <div class="products__wrapper">
        <div class="product">
          <div
            v-for="item in productList"
            :key="item._id"
            class="product__item"
          >
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
    <div class="order">
      <div class="order__price">
        实付金额 <b>¥{{ calculations.totalPrice }}</b>
      </div>
      <div class="order__btn" @click="handleShowConfirmChange(true)">
        提交订单
      </div>
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleShowConfirmChange(false)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleShowConfirmChange(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { backEffect } from '@/effects/backEffect'
import { useCommonCartEffect } from '@/effects/cartEffect'

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = status => {
    console.log(status)
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'OrderConfirmation',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)
    const { handleBackClick } = backEffect()
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()

    return {
      shopName,
      productList,
      calculations,
      showConfirm,
      handleBackClick,
      handleShowConfirmChange,
    }
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
  .top {
    padding: 0 0.18rem;
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(
      0deg,
      rgba(0, 145, 255, 0) 4%,
      #0091ff 50%
    );
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
  .order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    background: $bgColor;
    &__price {
      flex: 1;
      text-indent: 0.24rem;
      font-size: 0.14rem;
      color: $content-font-color;
    }
    &__btn {
      width: 0.98rem;
      background: $btn-color;
      color: $bgColor;
      text-align: center;
      font-size: 0.14rem;
    }
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bgColor;
    text-align: center;
    border-radius: 0.04rem;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: $content-font-color;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $medium-font-color;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid $btn-color;
        color: $btn-color;
      }
      &--last {
        margin-left: 0.12rem;
        background: $btn-color;
        color: $bgColor;
      }
    }
  }
}
</style>
