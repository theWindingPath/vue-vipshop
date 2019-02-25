<template>
  <div class="user-center">i am 个人中心</div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
      position fixed
      width 100%
      height 100%
      left 0
      right 0
      top 0
      bottom 0
      z-index 150
      background $color-background
      color $color-theme

</style>