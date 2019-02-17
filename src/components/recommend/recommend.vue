<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
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
        <!-- <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.id" class="item">
              <div class="avater">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div> -->
        <!-- 唯品会旗舰店brand数据 -->
        <div class="recommend-list">
          <h1 class="list-title">热门旗舰店推荐</h1>
          <ul>
            <li v-for="item in brandList" :key="item.id" class="item">
              <div class="avater">
                <img width="60" height="60" :src="item.small_image">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.product_name"></h2>
                <p class="desc" v-html="item.brand_name"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getDiscList, getDailyRecomd, getSlider, getBrand, getBrandLanmiu} from 'api/recommend' // 引入获取歌单轮播图数据方法
  import {ERR_0K} from 'api/config' // 引入错误标识符 常量为0
  import Slider from 'base/slider' // 引入slider组件
  import Scroll from 'base/scroll'

  export default {
    data() {
      return {
        recommends: [], // 存放轮播图数据的数组，初始化为空数组
        discList: [], // 歌单数据
        brandList: [] // 旗舰店数据s
      }
    },
    created() { // 在 created 钩子函数获取数据
      // 模拟延迟，延迟2秒获取轮播图数据
      setTimeout(() => {
        // this._getRecommend()
      }, 2000)
      // this._getRecommend()
      this._getDiscList()

      // this._getDailyRecomd() // has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://m.vip.com' that is not equal to the supplied origin.

      // 获取唯品会mock轮播图数据
      this._getSlider()

      // 爱慕希旗舰店
      // this._getBrand()

      // 兰缪
      this._getBrandLanmiu()
    },
    methods: { // 封装一些方法
      _getRecommend() {
        // 调用获取数据方法，返回promise对象，在then() 里获取返回数据
        getRecommend().then((res) => { // res参数接收 返回的数据
          if (res.code === ERR_0K) { // 成功返回标识符 code为0
            // console.log(res.data.slider) // 打印返回数据
            // this.recommends = res.data.slider // 赋值
          }
        })
      },
      _getBrand() {
        getBrand().then((res) => {
          if (res.code === 1) {
            console.log(res.data)
            this.brandList = res.data
          }
        })
      },
      _getBrandLanmiu() { // 兰缪
        getBrandLanmiu().then((res) => {
          if (res.code === 1) {
            console.log(res.data)
            this.brandList = res.data
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_0K) {
            // console.log(res)
            this.discList = res.data.list
          }
        })
      },
      _getDailyRecomd() {
        getDailyRecomd().then((res) => {
          if (res.code === 1) {
            console.log(res)
          }
        })
      },
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
      Scroll
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
      .list-title
        height 65px
        line-height 65px
        text-align center
        color $color-theme
        font-size $font-size-medium
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
        .avater
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          line-height 20px
          flex 1
          overflow hidden
          font-size $font-size-medium
          .name
            color $color-text
            margin-bottom 10px
          .desc
            // color $color-text-d
            color $color-text-l

</style>