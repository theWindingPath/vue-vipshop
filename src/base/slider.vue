<template>
  <div class="slider">
      <div class="slider-group">
          <!-- 使用vue里的插槽slot，在父组件引用当前组件slider里，的内容会添加到这里面 -->
          <slot>
          </slot>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
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
          default: 4000 // 毫秒 (默认值)
      }
    },
    mounted() { // 在mounted钩子里初始化better-scroll，slider组件dom渲染好，

    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
          img
            display block
            width 100%
</style>