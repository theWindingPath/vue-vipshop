<template>
  <div class="foot-tab">
      <router-link tag="div" class="foot-item" to="/user">
        <span class="tab-link icon-geren"></span>
      </router-link>
      <router-link tag="div" class="foot-item" to="/like">
        <span class="tab-link icon-love_icon"></span>
      </router-link>
      <router-link tag="div" class="foot-item" to="/shop">
        <span class="tab-link icon-buoumaotubiao40"></span>
      </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
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
    .foot-item
      flex 1
      text-align center
    .tab-link
      color #fff
      font-weight normal
</style>