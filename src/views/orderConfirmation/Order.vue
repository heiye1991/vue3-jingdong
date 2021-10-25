<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>¥{{ calculations.totalPrice }}</b>
    </div>
    <div
      v-if="calculations.totalPrice > 0"
      class="order__btn"
      @click="handleShowConfirmChange(true)"
    >
      提交订单
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
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
  <toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '@/effects/cartEffect'
import Toast, { useToastEffect } from '@/components/Toast'
import { post } from '@/utils/request'

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = status => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

const useMakeOrderEffect = (shopId, shopName, productList, toastHandler) => {
  const router = useRouter()
  const store = useStore()

  const addressId = store.state.addressId

  const handleConfirmOrder = async isCanceled => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push('/orderList')
      } else {
        toastHandler(isCanceled ? '取消订单失败' : '下单失败')
      }
    } catch (err) {
      toastHandler('请求失败')
    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'Order',
  components: {
    Toast,
  },
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    const { toastData, toastHandler } = useToastEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList,
      toastHandler
    )

    return {
      calculations,
      showConfirm,
      handleShowConfirmChange,
      handleConfirmOrder,
      toastData,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
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
