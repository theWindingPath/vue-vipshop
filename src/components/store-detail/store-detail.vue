<template>
  <transition name="slide">
    <ProductList :title="title" :bgImage="bgImage" class="store-list"></ProductList>
  </transition>
</template>

<script type="text/ecmascript-6">
import ProductList from 'components/product-list/product-list'
import {mapGetters} from 'vuex'
import {getProducts} from 'api/products.js'
import {ERR_0K} from 'api/config'

export default {
  computed: {
    title() {
      return this.store.brand_name
    },
    bgImage() {
      return this.store.brand_logo
      // return this.store.brand_bg_logo
    },
    ...mapGetters([
      'store'
    ])
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    this._getProducts()
  },
  methods: {
    _getProducts() {
      if (!this.store.brand_id) {
        this.$router.push('/flagshipStore') // 刷新退回上一路由
        return
      }
      getProducts().then((res) => {
        if (res.error === ERR_0K) {
          let brand = res.data
          console.log(brand)
          brand.forEach((item) => {
            if (item.brand_id === this.store.brand_id) { // 根据点击vuex上的id，加载对应旗舰店products数据
              this.products = item.products
              console.log(this.products)
            }
          })
        }
      })
    }
  },
  components: {
    ProductList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    &.slide-enter-active, .slide-leave-active
        transition all 0.3s
    &.slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0) // 从右边进入 缓动动画s

</style>