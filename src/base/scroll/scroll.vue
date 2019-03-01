<template>
  <!-- 滚动组件，ref获取dom节点 -->
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
    props: {
        probeType: { // 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件...
          type: Number,
          default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: { // watch的数据，数据改变，调用refresh函数，更新better-scroll
            type: Array,
            default: null
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll() // 一开始new better-scroll还没有请求会数据，初始时dom没有高度，滚动不了，需要watch（异步监听更新better-scroll）
        }, 20)
    },
    methods: {
        _initScroll() {
            // 如果this.$ref.wrapper为undefined，没有值时候，直接return
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
              probeType: this.probeType, // 初始化参数
              click: this.click
            })

            // 监听滚动，派发scrollY（纵坐标）
            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }
        },
        refresh() {
            // 前提是this.scroll是要有的
            this.scroll && this.scroll.refresh()
            console.log('refresh')
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: { // 监听数据变化，执行对应函数，相应操作dom
        data() {
            setTimeout(() => { // 异步执行一般要使用 settimeout(fn, 20)
                this.refresh() // 更新better-scroll
                // console.log('data')
            }, 20)
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>