<template>
  <div class="m-header">
      <div class="icon"></div>
      <!-- <div class="text">Chicken Music</div> -->
      <div class="text">品牌特卖，天天都有3折</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable" // 引入字体，颜色等晒stylus
@import "~common/stylus/mixin"

.m-header
  position relative
  height 44px
  text-align center
  background-color #f0f0f0
  color $color-theme // $color-theme颜色、字体定义在 variable.styl文件里
  font-size 0 // 消除display inline-block 产生的间距
  .icon
      display inline-block
      vertical-align top
      margin-top 6px
      width 30px
      height 32px
      margin-right 9px
      // bg-image("logo") // bg-image($url)定义在mixin.styl里
      // bg-image("vip-logo")
      background-image url("https://m.vip.com/sw/touch-icon_48.png")
      background-size 30px 32px
  .text
      display inline-block
      vertical-align top
      line-height 44px
      font-size $font-size-large
</style>
