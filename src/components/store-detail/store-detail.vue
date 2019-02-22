<template>
  <transition name="slide">
    <div class="store-list">store-detail 旗舰店主页</div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .store-list
      position fixed
      z-index 100
      top 0
      left 0
      bottom 0
      right 0
      background $color-background-d
      &.slide-enter-active, .slide-leave-active
          transition all 0.3s
      &.slide-enter, .slide-leave-to
          transform translate3d(100%, 0, 0) // 从右边进入 缓动动画s

</style>