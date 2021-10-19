<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div v-for="item in nearbyList" :key="item._id" class="nearby__item">
      <img class="nearby__item__img" :src="item.imgUrl" alt="nearby" />
      <div class="nearby__item__content">
        <div class="nearby__item__content__title">{{ item.name }}</div>
        <div class="nearby__item__content__tags">
          <span class="nearby__item__content__tags__tag">
            月售：{{ item.sales }}
          </span>
          <span class="nearby__item__content__tags__tag">
            起送：{{ item.expressLimit }}
          </span>
          <span class="nearby__item__content__tags__tag">
            基础运费：{{ item.expressPrice }}
          </span>
        </div>
        <p class="nearby__item__content__highlight">
          {{ item.slogan }}
        </p>
      </div>
    </div>
  </div>
  <toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast'

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
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
    &__content {
      flex: 1;
      padding-bottom: 0.12rem;
      border-bottom: 0.01rem solid $content-bg-color;
      &__title {
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: $content-font-color;
      }
      &__tags {
        margin-top: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $content-font-color;
        &__tag {
          margin-right: 0.16rem;
        }
      }
      &__highlight {
        margin-top: 0.08rem;
        margin-bottom: 0;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: #e93b3b;
      }
    }
  }
}
</style>
