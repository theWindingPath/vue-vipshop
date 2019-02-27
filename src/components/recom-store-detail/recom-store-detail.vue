<template>
  <transition name="slide">
    <ProductList :title="title" :bgImage="bgImage" :products="products" class="store-list"></ProductList>
  </transition>
</template>

<script type="text/ecmascript-6">
import ProductList from 'components/product-list/product-list'
import {mapGetters} from 'vuex'

export default {
  computed: {
    title() {
      return this.store.brand_show_name
    },
    bgImage() {
      return this.store.brand_bg_logo
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
        this.$router.push('/recommend') // 刷新退回上一路由
        return
      }
      this.products = this.store.products
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