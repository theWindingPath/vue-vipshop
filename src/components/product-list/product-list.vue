<template>
  <div class="product-list">
      <div class="back" @click="back">
          <i class="icon-back"></i>
      </div>
      <h1 class="title">{{title}}-旗舰店</h1>
      <div class="bg-image" :style="bgStyle">
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        }
    },
    computed: {
        bgStyle() {
            return `background-image:url(${this.bgImage})`
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .product-list
      position fixed
      z-index 100
      top 0
      left 0
      bottom 0
      right 0
      background-color #fff
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 10px // 增加点击面积
          font-size $font-size-large
          color $color-theme
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
      .bg-image
        position relative
        top 40px
        // width 100%
        // padding-top 40%
        width 100%
        height 160px
        background-size 100% 160px
        // background-size: cover

</style>