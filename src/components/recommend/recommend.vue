<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 因为在recommend组件的created里获取数据是异步过程，会有时间的延迟（0.几秒），但子组件slider的mounted会先(获取数据)执行，这时设置宽度是渲染不成功的 -->
      <!-- 需要加v-if判断，等获取数据成功后，在引入子组件slider，这时子组件slider在设置宽度，就拿得到渲染好的dom了 -->
      <div v-if="recommends.length" class="slider-wrapper">
        <!-- 需要确保slider下的slot是有的，在子组件slider里的mounted设置元素宽度才会生效， -->
        <slider>
          <!-- v-for遍历recommends -->
          <!-- vue2.0使用v-for需要加上:key="item.id"，不然会有warning -->
          <!-- 在子组件手动添加  class="slider-item" 用js-->
          <div v-for="item in recommends" :key="item.id">
            <!-- :href动态绑定， a标签跳转链接 -->
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend' // 引入获取歌单轮播图数据方法
  import {ERR_0K} from 'api/config' // 引入错误标识符 常量为0
  import Slider from 'base/slider' // 引入slider组件

  export default {
    data() {
      return {
        recommends: [] // 存放轮播图数据的数组，初始化为空数组
      }
    },
    created() { // 在 created 钩子函数获取数据
      this._getRecommend()
    },
    methods: { // 封装一些方法
      _getRecommend() {
        // 调用获取数据方法，返回promise对象，在then() 里获取返回数据
        getRecommend().then((res) => { // res参数接收 返回的数据
          if (res.code === ERR_0K) { // 成功返回标识符 code为0
            // console.log(res.data.slider) // 打印返回数据
            this.recommends = res.data.slider // 赋值
          }
        })
      }
    },
    components: {
      Slider // 注册组件
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
</style>