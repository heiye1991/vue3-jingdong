<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item.icon"
      class="docker__item"
      :class="{ 'docker__item--active': index === currentIndex }"
    >
      <router-link :to="item.url">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Docker',
  setup() {
    const route = useRoute()
    const dockerList = [
      {
        icon: '&#xe6f3;',
        text: '首页',
        url: '/',
      },
      {
        icon: '&#xe7e5;',
        text: '购物车',
        url: '/cartList',
      },
      {
        icon: '&#xe61e;',
        text: '订单',
        url: '/orderList',
      },
      {
        icon: '&#xe660;',
        text: '我的',
        url: '/personalInfo',
      },
    ]
    let currentIndex = ref(0)
    dockerList.forEach((item, index) => {
      if (item.url === route.path) {
        currentIndex.value = index
      }
    })
    return {
      dockerList,
      currentIndex,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.docker {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 0.5rem;
  padding: 0 0.18rem;
  border-top: 0.01rem solid $content-bg-color;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-font-color;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5);
    transform-origin: center top;
  }
}
</style>
