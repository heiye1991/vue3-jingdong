import { computed } from 'vue'
import { useStore } from 'vuex'
import { get } from '../utils/request'

export const useCommonAddressEffect = () => {
  const store = useStore()

  const getAddressList = async forceUpdate => {
    const addressList = store.state.addressList
    if (forceUpdate || !addressList.length) {
      const result = await get('/api/user/address')
      if (result?.data?.length) {
        store.commit('changeAddressList', result.data)
      }
    }
  }

  const currentAddress = computed(() => {
    const store = useStore()
    const addressList = store.state.addressList
    const addressId = store.state.addressId || addressList[0]?._id
    store.commit('chooseAddressId', addressId)
    return addressList.find(item => item._id === addressId)
  })

  return { getAddressList, currentAddress }
}
