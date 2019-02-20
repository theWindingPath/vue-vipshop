<template>
  <div class="flagshipStore">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in flagshipStore" :key="item.id" class="menu-item" :class="{'current': index === currentIndex}">
          <span class="title">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="brand-wrapper">
      <ul>
        <li v-for="item in flagshipStore" :key="item.id" class="brand-list">
          <h1 class="title">{{item.title}}</h1>
          <ul class="store-list">
            <li v-for="brand in item.brand" :key="brand.id" class="brand-item">
              <img class="avatar" width="56" height="56" :src="brand.brand_logo">
              <span class="name">{{brand.brand_name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getFlagshipStore} from 'api/flagshipStore'
import {ERR_0K} from 'api/config'

export default {
  data() {
    return {
      flagshipStore: []
    }
  },
  created() {
    this._getFlagshipStore()
  },
  computed: {
    currentIndex() {
      return 0
    }
  },
  methods: {
    _getFlagshipStore() {
      getFlagshipStore().then((res) => {
        if (res.error === ERR_0K) {
          console.log(res.data)
          this.flagshipStore = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
@import "~common/stylus/mixin.styl"

.flagshipStore
  display flex
  position fixed
  top 89px
  bottom 0
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background-color #f3f4f5
    .menu-item
      display table
      height 56px
      width 56px
      padding 0 12px
      line-height 16px
      text-align center
      &.current
        position relative
        z-index 10
        margin-top -1px
        background-color #fff
        border-left 3px solid $color-theme
        .title
          font-weight 600
          color #000
          border-none()
      .title
        display table-cell
        // padding 16px 0
        width 56px
        vertical-align middle
        color #585c64
        font-size $font-size-medium
        // border-bottom 1px solid rgba(7, 17, 27, 0.1)
        border-1px(rgba(7, 17, 27, 0.1))
  .brand-wrapper
    flex 1
    padding 0 26px
    .brand-list
      padding 10px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        height 26px
        width 100%
        line-height 26px
        font-size $font-size-small
        font-weight 700
        margin-bottom 12px
      .store-list
        display flex
        flex-wrap wrap
        .brand-item
          display flex
          flex 30%
          flex-direction column
          align-items center
          justify-content center
          margin-bottom 18px
          .avatar
            margin-bottom 6px
          .name
            font-size $font-size-small

</style>