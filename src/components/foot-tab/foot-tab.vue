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
      <div class="foot-item" v-show="totalPrice>0" @click="showShopCenter">
        <div class="price">￥{{totalPrice}}</div>
      </div>
      <div class="ball-container">
          <div v-for="ball in balls" :key="ball.id">
            <transition name="drop"
                        @before-enter="beforeDrop"
                        @enter="droppiing"
                        @after-enter="afterDrop"
            >
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook">
                  <i class="icon-buoumaotubiao40"></i>
                </div>
              </div>
            </transition>
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
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
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
  },
  methods: {
    drop(el) {
      // console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i] // 小球引用
        if (!ball.show) {
          ball.show = true // 小球设为true
          ball.el = el // 保存dom对象到运动小球上
          this.dropBalls.push(ball) // 处理后的小球放入引用数组
          // console.log('drop')
          // console.log(this.balls)
          return // 一次for循环取一个ball
        }
      }
    },
    beforeDrop(el) { // 底部小球dom
      let count = this.balls.length
      // console.log('beforDrop')
      while (count--) {
        let ball = this.balls[count] // 遍历所有小球数组
        if (ball.show) { // drop()设置为true的小球
          let rect = ball.el.getBoundingClientRect() // 处理为true小球的el上有点击的dom
          let x = rect.left - 118 // 动画x轴距离1，正值，底部小球向右移动距离
          let y = -(window.innerHeight - rect.top - 16) // 负值，底部小球y轴向上移动距离，两次移动将小球移到点击按钮位置
          el.style.display = '' // 将小球显示出来
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)` // 外层dom向上移动
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    droppiing(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
          el.style.display = '' // 将小球显示出来
          el.style.webkitTransform = `translate3d(0,0,0)`
          el.style.transform = `translate3d(0,0,0)` // 外层dom向上移动
          // console.log('dropping')
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(0,0,0)`
          inner.style.transform = `translate3d(0,0,0)`
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift() // 弹出数组第一个元素
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    showShopCenter() {
      this.$router.push('/shop')
    }
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
        // color #e4007f
        font-size 14px
        font-weight 700
    .ball-container
      .ball
        position fixed
        left 118px
        bottom 16px
        z-index 200
        // font-size 0
        transition all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          display inline-block
          // padding 6px
          width 28px
          height 28px
          line-height 28px
          text-align center
          box-sizing border-box
          border-radius 50%
          background $color-theme
          transition all 0.5s linear
          .icon-buoumaotubiao40
            display inline-block
            font-size 14px
            color #fff

</style>