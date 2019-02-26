<template>
  <div class="foot-tab" :class="{'addWidth': totalPrice>0}">
      <router-link tag="div" class="foot-item" to="/user">
        <span class="tab-link icon-geren"></span>
      </router-link>
      <router-link tag="div" class="foot-item" to="/like">
        <span class="tab-link icon-love_icon"></span>
      </router-link>
      <router-link tag="div" class="foot-item" to="/shop">
        <span class="tab-link icon-buoumaotubiao40"></span>
        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
      </router-link>
      <div class="foot-item" v-show="totalPrice>0">
        <div class="price">￥{{totalPrice}}</div>
      </div>
      <div class="ball-container">
        <div transition="drop" v-for="ball in balls" :key="ball.id" v-show="ball.show" class="ball">
          <div class="inner inner-hook">
            <i class="ball-icon icon-buoumaotubiao40"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      balls: [
        {
          show: true
        },
        {
          show: false
        }
      ]
    }
  },
  computed: {
    totalCount() {
      let count = 0
      this.shopList.forEach((product) => {
        count += product.count
      })
      return count
    },
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

  .foot-tab
    display flex
    width 150px
    height 40px
    line-height 40px
    font-size 22px
    // background rgba(25,29,38,.95)
    background rgba(25,29,38,.85)
    border-radius 5px
    &.addWidth
      width 200px
    .foot-item
      flex 1
      position relative
      text-align center
      .tab-link
        color #fff
        font-weight normal
      .num
        position absolute
        top 2px
        right 3px
        width 16px
        height 16px
        line-height 16px
        text-align center
        border-radius 16px
        font-size 12px
        font-weight 400
        color #fff
        background-color $color-theme
      .price
        display inline-block
        margin-right 12px
        color $color-theme
        font-size 14px
        font-weight 700
    .ball-container
      .ball
        // position fixed
        // left 32px
        // bottom 32px
        // z-index 200
        // font-size 0
        .inner
          position absolute
          right 22px
          bottom 22px
          // padding 6px
          width 28px
          height 28px
          line-height 28px
          text-align center
          box-sizing border-box
          border-radius 50%
          background $color-theme
          .ball-icon
            display inline-block
            // line-height 16px
            // line-height 28px
            font-size 14px
            color #fff
        // &.drop-transition
        //   transition all 0.5s linear
        //   .inner
        //     width 28px
        //     height 28px
        //     text-align center
        //     box-sizing border-box
        //     border-radius 50%
        //     background $color-theme
        //     transition all 0.5s linear
        //     .icon-buoumaotubiao40
        //       display inline-block
        //       line-height 16px
        //       font-size 14px
        //       color #fff

</style>