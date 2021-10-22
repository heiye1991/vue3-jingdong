import { useRouter } from 'vue-router'

export const backEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }

  return {
    handleBackClick,
  }
}
