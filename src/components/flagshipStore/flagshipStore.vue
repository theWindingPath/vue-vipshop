<template>
  <div class="flagshipStore">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in flagshipStore" :key="item.id" class="menu-item" :class="{'current': index === currentIndex}"
        @click="selectMenu(index, $event)">
          <span class="title">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <scroll class="brand-wrapper"
            ref="brandWapper"
            :data="flagshipStore"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <ul>
        <li v-for="item in flagshipStore" :key="item.id" class="brand-list" ref="listGroup">
          <h1 class="title">{{item.title}}</h1>
          <ul class="store-list">
            <li @click="selectBrand(brand)" v-for="brand in item.brand" :key="brand.id" class="brand-item">
              <img class="avatar" width="56" height="56" v-lazy="brand.brand_logo">
              <span class="name">{{brand.brand_name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getFlagshipStore} from 'api/flagshipStore'
import {ERR_0K} from 'api/config'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      flagshipStore: [],
      scrollY: -1, // 数字
      currentIndex: 0
    }
  },
  created() {
    this._getFlagshipStore()
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  methods: {
    _getFlagshipStore() {
      getFlagshipStore().then((res) => {
        if (res.error === ERR_0K) {
          // console.log(res.data)
          this.flagshipStore = res.data
        }
      })
    },
    scroll(pos) {
      // 将pos.y（负值小数，转换为正值整数）
      this.scrollY = Math.abs(Math.round(pos.y))
      // console.log(this.scrollY)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup // 列表数组
      let height = 0
      this.listHeight.push(height) // 数组第一个元素 为 0
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight // 每个列表高度 累加
        this.listHeight.push(height) // 高度数组
        // console.log(this.listHeight)
      }
      // console.log(this.listHeight)
    },
    selectMenu(index, event) {
      // console.log(index, event)
      // this.currentIndex = index
      this.scrollY = this.listHeight[index]
      let el = this.$refs.listGroup[index]
      this.$refs.brandWapper.scrollToElement(el, 300)
    },
    selectBrand(brand) {
      this.$router.push({
        path: `/flagshipStore/${brand.brand_id}`
      })
      // 使用vuex保存数据
      this.setStore(brand)
    },
    ...mapMutations({
      setStore: 'SET_STORE'
    })
  },
  components: {
    Scroll
  },
  watch: {
    flagshipStore() { // 获取数据后计算列表高度
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) { // 监听滚动y值 改变 currentIndex
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i] // 区间上值
        let height2 = this.listHeight[i + 1] // 高度区间下值
        if (!height2 || (newY >= height1 && newY < height2)) {
          this.currentIndex = i
          return
        }
      }
      return 0
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
      &:last-child
        border-none()
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