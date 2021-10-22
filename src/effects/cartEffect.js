import { computed } from 'vue'
import { useStore } from 'vuex'

export const useCommonCartEffect = shopId => {
  const store = useStore()
  const cartList = store.state.cartList
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const item of Object.values(productList)) {
      if (item.count > 0) {
        notEmptyProductList[item._id] = item
      }
    }
    return notEmptyProductList
  })
  const changeCartItemInfo = (
    shopId,
    productId,
    productInfo,
    num,
    shopName
  ) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num,
      shopName,
    })
  }

  const calculations = computed(() => {
    const result = {
      total: 0,
      totalCount: 0,
      totalPrice: 0,
      allChecked: true,
    }
    const productList = cartList[shopId]?.productList
    if (productList) {
      for (const item of Object.values(productList)) {
        if (item.checked) {
          result.total += item.count
          result.totalPrice += item.count * item.price
        }
        result.totalCount += item.count
      }
      result.allChecked = Object.values(productList).every(
        product => product.checked
      )
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  return {
    cartList,
    shopName,
    productList,
    changeCartItemInfo,
    calculations,
  }
}
