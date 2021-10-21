<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input
        v-model="loginForm.username"
        type="text"
        placeholder="请输入手机号"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__input">
      <input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        autocomplete="off"
        class="wrapper__input__content"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <router-link to="/register">
      <div class="wrapper__login-link">立即注册</div>
    </router-link>
  </div>
  <toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { post } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast'

const useLoginEffect = toastHandler => {
  const router = useRouter()
  const loginForm = reactive({
    username: '',
    password: '',
  })
  const handleLogin = async () => {
    try {
      if (!loginForm.username || !loginForm.password) {
        toastHandler('请填写手机号和密码')
        return false
      }
      const result = await post('/api/user/login', loginForm)
      if (result?.errno === 0) {
        localStorage.setItem('login', true)
        router.push('/')
      } else {
        toastHandler('登录失败')
      }
    } catch (err) {
      toastHandler('请求失败')
    }
  }
  return {
    loginForm,
    handleLogin,
  }
}

export default {
  name: 'Login',
  components: {
    Toast,
  },
  setup() {
    const { toastData, toastHandler } = useToastEffect()
    const { loginForm, handleLogin } = useLoginEffect(toastHandler)

    return {
      handleLogin,
      loginForm,
      toastData,
    }
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
    border: 0.01rem solid #e5e5e5;
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
  &__login-button {
    height: 0.48rem;
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    font-size: 0.16rem;
    text-align: center;
    color: $bgColor;
    background: $btn-color;
    box-shadow: 0 0.04rem 0.08rem 0 #addbff;
    border-radius: 0.04rem;
  }
  &__login-link {
    font-size: 0.14rem;
    color: $content-notice-font-color;
    text-align: center;
  }
}
</style>
