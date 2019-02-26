import * as types from './mutation-types'

const mutations = {
    [types.SET_STORE](state, store) {
        state.store = store
    },
    [types.pushProductToCart](state, list) {
        state.shopList = list
    },
    [types.incrementItemCount](state, productId) { // 商品数量加 1
        const product = state.shopList.find(item => item.product_id === productId)
        // console.log(productId)
        // console.log(state.shopList)
        // console.log(product)
        product.count++
    }
}

export default mutations