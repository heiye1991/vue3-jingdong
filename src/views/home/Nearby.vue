<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <shop-info v-for="item in nearbyList" :key="item._id" :item="item" />
  </div>
  <toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast'
import ShopInfo from '@/components/ShopInfo'

const useNearbyListEffect = toastHandler => {
  let nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      const result = await get('/api/shop/hot-list')
      if (result?.errno === 0 && result?.data.length) {
        nearbyList.value = result.data
      } else {
        toastHandler('登录失败')
      }
    } catch (err) {
      toastHandler('请求失败')
    }
  }

  return {
    nearbyList,
    getNearbyList,
  }
}
export default {
  name: 'Nearby',
  components: {
    Toast,
    ShopInfo,
  },
  setup() {
    const { toastData, toastHandler } = useToastEffect()
    const { nearbyList, getNearbyList } = useNearbyListEffect(toastHandler)
    getNearbyList()

    return {
      toastData,
      nearbyList,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-font-color;
  }
}
</style>
