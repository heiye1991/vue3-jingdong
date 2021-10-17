<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input
        type="text"
        placeholder="请输入手机号"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        placeholder="请输入密码"
        autocomplete="off"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        placeholder="确认密码"
        autocomplete="off"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__register-button">注册</div>
    <router-link to="/login">
      <div class="wrapper__register-link">已有账号，去登录</div></router-link
    >
  </div>
</template>

<script>
export default {
  name: 'Register',
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem;
  }
  &__input {
    box-sizing: border-box;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid #e5e5e5;
    border-radius: 0.06rem;
    &__content {
      width: 100%;
      line-height: 0.48rem;
      font-size: 0.16rem;
      border: none;
      outline: none;
      background: none;
      color: #333;
      &::placeholder {
        color: $content-notice-font-color;
      }
    }
  }
  &__register-button {
    height: 0.48rem;
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    font-size: 0.16rem;
    text-align: center;
    color: #fff;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 #addbff;
    border-radius: 0.04rem;
  }
  &__register-link {
    font-size: 0.14rem;
    color: $content-notice-font-color;
    text-align: center;
  }
}
</style>
