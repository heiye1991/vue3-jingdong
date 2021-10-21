import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {},
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num, shopName } = payload
      let shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      }
      shopInfo.shopName = shopName
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (product.count <= 0) {
        product.count = 0
      } else {
        product.checked = true
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      for (const product of Object.values(products)) {
        if (!product.checked) {
          product.checked = true
        }
      }
    },
  },
  actions: {},
  modules: {},
})
