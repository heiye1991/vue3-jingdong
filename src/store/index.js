import { createStore } from 'vuex'

const setLocalCartList = state => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
    addressList: [],
    addressId: '',
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
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      for (const product of Object.values(products)) {
        if (!product.checked) {
          product.checked = true
        }
      }
      setLocalCartList(state)
    },
    changeAddressList(state, addressList) {
      state.addressList.splice(0, state.addressList.length, ...addressList)
    },
    chooseAddressId(state, payload) {
      const { id } = payload
      state.addressId = id
    },
  },
  actions: {},
  modules: {},
})
