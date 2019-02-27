<template>
  <transition name="slide">
    <div class="shop-center">
      <div class="header">
        <div class="back" @click="back">
          <i class="icon-fanhui"></i>
        </div>
        <h1 class="title">购物车</h1>
      </div>
      <div class="middle">
        <div class="shopping-cart-empty" v-show="totalPrice===0">
          <div class="bgImg"></div>
          <h2 class="subtitle">购物车空空如也</h2>
        </div>
      </div>
      <div class="bottom" v-show="totalPrice>0">
        <div class="price">总金额<span class="total-price">￥{{totalPrice}}</span></div>
        <button class="paycheck">结算</button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  methods: {
    back() {
      this.$router.back()
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.shopList.forEach((product) => {
        total += (product.vipshop_price * product.count)
      })
      return total
    },
    ...mapGetters([
      'shopList'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .shop-center
      position fixed
      width 100%
      height 100%
      left 0
      right 0
      top 0
      bottom 0
      z-index 150
      background $color-background-d
      color $color-theme
      &.slide-enter-active, .slide-leave-active
          transition all 0.3s
          .header, .bottom
            transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.slide-enter, .slide-leave-to
          transform translate3d(100%, 0, 0) // 从右边进入 缓动动画s
          .header
            transform translate3d(0, -100px, 0)
          .bottom
            transform translate3d(0, 100px, 0)
      .header
          position relative
          z-index 40
          width 100%
          height 40px
          background-color #fff
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .back
              position absolute
              top 0
              // left 6px
              left 3px
              z-index 50
              .icon-fanhui
                  display block
                  // padding 10px // 增加点击面积
                  // font-size $font-size-large-x
                  padding 2px 6px
                  font-size 32px
                  // color $color-theme
                  color #222
                  font-weight 400
          .title
              position absolute
              top 0
              left 10%
              z-index 40
              width 80%
              text-align center
              height 40px
              line-height 40px
              font-size $font-size-large
              color $color-theme
              font-weight 700
      .middle
        .shopping-cart-empty
          position relative
          padding 60px 0
          background-color #fff
          text-align center
          .bgImg
            width 120px
            height 160px
            background-image url('data:image/png;base64,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')
            background-size 120px 160px
            margin 0 auto
          .subtitle
            margin-top 22px
            color $color-text-l
            font-size 16px
            font-weight 400

      .bottom
        position fixed
        bottom 0
        left 0
        width 100%
        height 80px
        z-index 40
        background-color #fff
        border-top 1px solid rgba(7, 17, 27, 0.1)
        .price
          width 100%
          height 30px
          line-height 30px
          text-align center
          z-index 40
          color $color-text-ll
          font-size 14px
          font-weight 600
          .total-price
            margin-left 3px
            color #e4007f
            font-size 16px
            font-weight 700
        .paycheck
          position absolute
          left 10%
          width 80%
          height 40px
          border none
          background-color #e80080
          color #fff
          font-size 16px

</style>