<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="brandList">
      <!-- 因为在recommend组件的created里获取数据是异步过程，会有时间的延迟（0.几秒），但子组件slider的mounted会先(获取数据)执行，这时设置宽度是渲染不成功的 -->
      <!-- 需要加v-if判断，等获取数据成功后，在引入子组件slider，这时子组件slider在设置宽度，就拿得到渲染好的dom了 -->
      <div>
        <!-- better-scroll做滚动，用一个div包裹要滚动的部分，第一个子元素才滚动 -->
        <div v-if="recommends.length" class="slider-wrapper">
          <!-- 需要确保slider下的slot是有的，在子组件slider里的mounted设置元素宽度才会生效， -->
          <slider>
            <!-- v-for遍历recommends -->
            <!-- vue2.0使用v-for需要加上:key="item.id"，不然会有warning -->
            <!-- 在子组件手动添加  class="slider-item" 用js-->
            <div v-for="item in recommends" :key="item.id">
              <!-- :href动态绑定， a标签跳转链接 -->
              <a :href="item.linkUrl">
                <!-- 监听图片load事件，图片加载完成触发，更新子组件scroll里的better-scroll -->
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <!-- 唯品会旗舰店brand数据 -->
        <div class="recommend-list">
          <!-- <h1 class="list-title">热门旗舰店推荐</h1> -->
          <h1 class="list-title">-每天早10点 - 晚8点上新-</h1>
          <ul>
            <li v-for="item in brandList" :key="item.id" class="item">
              <div class="avater">
                <img width="100%" height="180" v-lazy="item.brand_bg_logo">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.brand_name"></h2>
                <p class="desc" v-html="item.promotion_discount"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom-tips">
          <div class="line"></div>
          <div class="text">我是有底线的</div>
          <div class="line"></div>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!brandList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSlider, getRecommendShop} from 'api/recommend' // 引入获取歌单轮播图数据方法
  import {ERR_0K} from 'api/config' // 引入错误标识符 常量为0
  import Slider from 'base/slider/slider' // 引入slider组件
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        recommends: [], // 存放轮播图数据的数组，初始化为空数组
        brandList: [] // 旗舰店数据s
      }
    },
    created() { // 在 created 钩子函数获取数据
      // 模拟延迟，延迟2秒获取轮播图数据
      setTimeout(() => {
        // this._getRecommend()
      }, 2000)

      // 获取唯品会mock轮播图数据
      this._getSlider()

      // 热门旗舰店数据
      this._getRecommendShop()
    },
    methods: { // 封装一些方法
      _getSlider() {
        getSlider().then((res) => {
          // console.log(111)
          // console.log(res)
          if (res.error === ERR_0K) {
            // console.log(res)
            this.recommends = res.data
          }
        })
      },
      _getRecommendShop() {
        getRecommendShop().then((res) => {
          if (res.error === ERR_0K) {
            console.log(res)
            this.brandList = res.data
          }
        })
      },
      loadImage() {
        // 单例模式，一张图片加载完，即可撑开高度
        if (!this.hasLoad) { // 一开始为undefined，设置标志位，确保这个逻辑只执行一次
          this.hasLoad = true
          // this.$refs.scroll.refresh()

          // 解决图片到底部之后问题
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      }
    },
    components: {
      Slider, // 注册组件
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
  position fixed
  width 100%
  top 88px
  // top 100px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      top 12px
      overflow hidden
    .recommend-list
      margin-top 24px
      background-color #f3f4f5
      .list-title
        // height 65px
        // line-height 65px
        height 40px
        line-height 40px
        text-align center
        color $color-theme
        font-size $font-size-medium
      .item
        // display flex
        box-sizing border-box
        // align-items center
        padding 0 20px 20px 20px
        .avater
          // flex 0 0 60px
          // width 60px
          width 100%
          // padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          // line-height 20px
          line-height 26px
          // flex 1
          overflow hidden
          padding-left 10px
          font-size $font-size-medium
          background-color #fff
          .name
            color $color-text
            font-weight 800
          .desc
            // color $color-text-d
            color $color-theme
            font-size $font-size-small
    .bottom-tips
      display flex
      margin 0 auto
      width 60%
      height 60px
      line-height 60px
      .line
        flex 1
        position relative
        top -30px
        border-bottom 1px solid #ddd
      .text
        padding 0 12px
        color #aaa
        font-size 12px
    .loading-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)

</style>