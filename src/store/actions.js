import * as types from './mutation-types'

export const addProduct = function ({commit, state}, product) {
    let shopList = state.shopList.slice() // 获取购物车已有列表，slice()数组的浅拷贝，不改变原数组
    let shopItem = state.shopList.find(item => item.product_id === product.product_id) // 查找是否已购买过此商品
    if (!shopItem) { // 如果没有，则添加到shopList数组
        let newProduct = Object.assign({}, product, {count: 1}) // 为shopItem添加购买数量count
        shopList.push(newProduct) // 添加到数组末尾
        commit(types.pushProductToCart, shopList) // 通过commit改变vuex数据
    } else { // 列表已有，则数量加一
        // product.count++
        commit(types.incrementItemCount, product.product_id)
    }

    // commit(types.SET_SHOPLIST, shopList) // 通过commit改变vuex数据
}