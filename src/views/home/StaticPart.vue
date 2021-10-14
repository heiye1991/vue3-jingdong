<template>
  <div class="position">
    <span class="iconfont position__location">&#xe619;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe60b;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe62d;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt="banner"
    />
  </div>
  <div class="icons">
    <div v-for="item in iconsList" :key="item.icon" class="icons__item">
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.icon}.png`"
        :alt="item.desc"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      { icon: '超市', desc: '超市便利' },
      { icon: '菜市场', desc: '菜市场' },
      { icon: '水果店', desc: '水果店' },
      { icon: '鲜花', desc: '鲜花绿植' },
      { icon: '医药健康', desc: '医药健康' },
      { icon: '家居', desc: '家居时尚' },
      { icon: '蛋糕', desc: '烘培蛋糕' },
      { icon: '签到', desc: '签到' },
      { icon: '大牌免运', desc: '大牌免运' },
      { icon: '红包', desc: '红包套餐' },
    ]
    return { iconsList }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  color: $content-font-color;
  line-height: 0.22rem;
  @include ellipsis;
  &__location {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  &__notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  color: #b7b7b7;
  background: #f5f5f5;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  // hack 技巧：避免加载图片导致的页面抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem;
      text-align: center;
      color: $content-font-color;
    }
  }
}
.gap {
  height: 0.1rem;
  margin: 0 -0.18rem;
  background: $content-bg-color;
}
</style>
