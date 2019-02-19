<template>
  <!-- 加引入 ref=""，获取dom节点 -->
  <div class="slider" ref="slider">
      <!-- 内层，需要手动获得浏览器宽度，并设置子元素（图片）宽度 -->
      <div class="slider-group" ref="sliderGroup">
          <!-- 使用vue里的插槽slot，在父组件引用当前组件slider里，的内容会添加到这里面 -->
          <slot>
          </slot>
      </div>
      <div class="dots">
        <span v-for="(item, index) in dots" :key="item" class="dot" :class="{'active': currentIndex === index}"></span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom' // 从dom.js文件引入addClass()方法

export default {
    data() {
      return {
        dots: [], // 轮播图下面的5个小圆点，
        currentIndex: 0 // 圆点active高亮下标，默认值0
      }
    },
    props: { // 可以从外部父组件里，传一些数据进来，控制轮播方式：循环轮播，自动轮播，轮播间隔时间
      loop: { // 循环轮播
          type: Boolean,
          default: true
      },
      autoPlay: { // 自动轮播
          type: Boolean,
          default: true
      },
      interval: { // 轮播间隔
          type: Number,
          default: 3000 // 毫秒 (默认值)
      }
    },
    mounted() { // 在mounted钩子里初始化better-scroll，slider组件dom渲染好，
      // 浏览器刷新通常是17ms一次，用settimeout(fn,20) 代替this.$nextTick()
      setTimeout(() => {
        // 调用方法
        this._setSliderWidth() // 不传 isResize 为undefined
        this._initDots() // 初始化小圆点_initDots需要放在_initSlider前面，不然则是7个圆点（多两个是new better-scroll克隆的）
        this._initSlider()

        // 一进页面来，就会自动播放
        if (this.autoPlay) {
          this._play()
        }
      }, 20) // 经验值

      // 浏览器窗口改变，视口改变，需要重新获取轮播横向距离
      // refresh()作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      // 文档视图调整大小时会触发 resize 事件。
      // EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象
      window.addEventListener('resize', () => { // 监听窗口改变事件
        // 第一次进来不执行下面代码
        if (!this.slider) {
          return // 什么都不做
        }
        this._setSliderWidth(true) // 重新计算div宽度
        this.slider.refresh() // 重新计算bette-scroll
      })
    },
    methods: {
        // 新增isResize窗口改变属性，一开始进来 isResize 是undefined（窗口改变调用传true）
        _setSliderWidth(isResize) { // 轮播图横向滚动，设置宽度
            this.children = this.$refs.sliderGroup.children // 获得子元素（图片），是数组（5个图片div）
            // console.log(this.children.length)

            let width = 0 // 宽度是计算而来的（累加），外层content宽度，需要大于父节点，才能滚动
            let sliderWidth = this.$refs.slider.clientWidth // 这个宽度是被图片撑开的，等于浏览器当前宽度
            for (let i = 0; i < this.children.length; i++) { // for循环，累加计算宽度
              let child = this.children[i] // 获取子节点数组里的每个元素
              addClass(child, 'slider-item') // 为slider-group下遍历出的每个div加上slider-item类名

              // 加上单位 'px'
              child.style.width = sliderWidth + 'px' // 每个child设置宽度，等于父容器宽度（浏览器宽度）
              width += sliderWidth // 总的slider-group的宽度累加
            }
            // 接下来用better-scroll初始化轮播图slider时，better-scroll会为我们clone（克隆、复制）多两个div(item),轮播这组图片左右两边，是为了保证循环切换
            // 窗口改变的情况不用加上2，better-scroll只是重新计算，不是重新创建new
            // isResize 传true 不再加2
            if (this.loop && !isResize) { // 循环，需要多加两个width（图片width）
              width += 2 * sliderWidth // 两边克隆
            }
            this.$refs.sliderGroup.style.width = width + 'px' // 设置图片（每个子元素）的父容器宽度，累加总和
        },
        _initSlider() { // 用better-scroll初始化slider
          // 第一个参数是dom
          this.slider = new BScroll(this.$refs.slider, { // 初始化better-scroll，传一堆轮播图相关的配置
              scrollX: true, // 横向滚动
              scrollY: false, // 不允许纵向滚动
              momentum: false, // 惯性关掉，不关滚动会很快
              snap: true, // 轮播滚动
              snapLoop: this.loop, // 循环轮播
              snapThreshold: 0.3, // threshold 表示可滚动到下一个的阈值
              snapSpeed: 400 // 400毫秒
              // click: true // 允许点击， better-scroll内部实现会阻止浏览器内部的click事件，better-scroll 有时候会被fastclick库阻止点击事件
          })

          // 监听滚动结束动作，绑定圆点当前高亮
          this.slider.on('scrollEnd', () => {
            // console.log('触发时机：滚动结束。')
            // 滚动结束后，获得当前页面 getCurrentPage()，作用：获取当前页面的信息，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
            let pageIndex = this.slider.getCurrentPage().pageX // 返回当前页面的值（第几页）
            // console.log(pageIndex) // 因为左右各克隆一页，需要减1
            if (this.loop) {
              pageIndex -= 1
            }
            // console.log(pageIndex)
            this.currentIndex = pageIndex

            // 接下来调用自动轮播函数，轮播到下一页
            if (this.autoPlay) {
              // 每次自动轮播前，要清理定时器
              clearTimeout(this.timer)
              this._play()
            }
          })
        },
        _initDots() { // 小圆点
          // console.log(this.children.length)
          this.dots = new Array(this.children.length) // 创建一个长度为5的空数组
        },
        _play() { // 播放
          let pageIndex = this.currentIndex + 1 // pageIndex局部变量，需要重新获取，加一恢复
          // goToPage(x, y, time, easing) 作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。
          if (this.loop) {
            pageIndex += 1 // 滚动到下一页
          }
          // 使用timer保存定时器，以便清除，timer没有在data上定义，所以不是响应式的数据，但在this上，是全局的
          this.timer = setTimeout(() => {
            this.slider.goToPage(pageIndex, 0, 400) // 400为time 动画执行的时间
          }, this.interval) // 轮播interval（间隔，可通过父组件传进来控制）秒一页
        }
    },
    // destroyed: Vue 实例销毁后调用。清除计时器，是一个非常好的编程习惯，有利于内存释放
    destroyed() {
      clearTimeout(this.timer)
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .slider
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      // width 3333px
      .slider-item
        float left // 要给父节点设置足够的宽度width，才能横向浮动起来，不然会换行，往下浮动
        box-sizing border-box
        overflow hidden
        text-align center
        padding 0 30px
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
          img
            display block
            width 100%
    .dots
      position absolute // 用relative 会掉到底部，bottom 12px 不起作用？？
      // left 0 // relative是相对浏览器定位，则dots相对于正常文本流定位，
      right 42px // 用absolute则是找最近有relative的父节点，这里是recommend组件里的slider-wrapper
      bottom 12px
      // text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        // height 8px
        // width 8px
        height 6px
        width 6px
        border-radius 50%
        background-color $color-text-l
        &.active
          // width 20px // 高亮样式 变宽
          // border-radius 5px // 变方
          // background-color $color-text-ll // 变亮
          // background-color #455164
          background-color $color-background

</style>