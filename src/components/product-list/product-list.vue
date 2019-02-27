<template>
  <div class="product-list">
      <div class="header">
        <div class="back" @click="back">
            <i class="icon-fanhui"></i>
        </div>
        <h1 class="title">{{title}}-旗舰店</h1>
      </div>
      <div class="list">
        <scroll ref="scroll" :data="products" class="list-content">
            <div>
                <div class="bg-image" :style="bgStyle">
                </div>
                <nav class="vis-product-filter-bar">
                    <ul class="filter-opt-holder">
                        <li class="filter-opt filter-price">
                            <span>价格</span>
                            <span class="iconbox">
                                <i class="icon-paixu-shang"></i>
                                <i class="icon-paixu-xia"></i>
                            </span>
                        </li>
                        <li class="filter-opt filter-discount">
                            <span>折扣</span>
                            <span class="iconbox">
                                <i class="icon-paixu-shang"></i>
                                <i class="icon-paixu-xia"></i>
                            </span>
                        </li>
                        <li class="filter-opt filter-select">
                            <span>筛选</span>
                            <span class="iconbox">
                                <i class="icon-shaixuan"></i>
                            </span>
                        </li>
                    </ul>
                </nav>
                <div v-if="products.length" class="products-wrapperr">
                    <ul>
                        <li v-for="product in products" :key="product.id" class="products-item">
                            <div class="icon">
                                <!-- <img width="120px" height="150px" :src="product.small_image"> -->
                                <img width="120px" height="150px" v-lazy="product.small_image">
                            </div>
                            <div class="content">
                                <div class="price">
                                    <span class="now">￥{{product.vipshop_price}}</span><span class="old"><del>￥{{product.market_price}}</del></span><span class="discount">{{product.vip_discount}}</span>
                                </div>
                                <p class="name">{{product.product_name}}</p>
                                <div class="cartcontrol-wrapper" @click.stop.prevent="addCart(product, $event)">
                                    <div class="cart-add icon-buoumaotubiao40"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
      </div>
      <div class="footTab-wrapper">
          <foot-tab ref="footTab"></foot-tab>
      </div>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import FootTab from 'components/foot-tab/foot-tab'
import {mapActions} from 'vuex'

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        },
        products: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    created() {
        // console.log(this.products) // 一开始获取不到，但是products是响应式的，等父组件数据更新传进来，就可以得到
    },
    computed: {
        bgStyle() {
            return `background-image:url(${this.bgImage})`
        }
    },
    methods: {
        back() {
            this.$router.back()
        },
        addCart(product, event) {
            if (!event._constructed) { // 解决浏览器点击派发两次问题
                // return
            }
            this.addProduct(product)

            // console.log(event)
            // 调用子组件drop小球动画
            this._drop(event.target) // 将点击的dom传过去，计算动画x/y轴距离
        },
        _drop(target) {
            this.$nextTick(() => {
                this.$refs.footTab.drop(target) // 调用子组件foot-tab函数
            })
        },
        ...mapActions([
            'addProduct'
        ])
    },
    components: {
        Scroll,
        FootTab
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .product-list
        position fixed
        width 100%
        z-index 100
        top 0
        left 0
        bottom 0
        right 0
        background-color #f3f5f7
        .header
            position relative
            z-index 40
            width 100%
            height 40px
            background-color #fff
            .back
                position absolute
                top 0
                // left 6px
                left 3px
                z-index 50
                .icon-fanhui
                    display block
                    // padding 10px // 增加点击面积
                    // font-size $font-size-large-x
                    padding 2px 6px
                    font-size 32px
                    // color $color-theme
                    color #222
                    font-weight 400
            .title
                position absolute
                top 0
                left 10%
                z-index 40
                width 80%
                text-align center
                height 40px
                line-height 40px
                font-size $font-size-large
                color $color-theme
                font-weight 700
        .list
            position fixed // 滚动内容的父元素固定高度布局
            width 100%
            top 40px
            bottom 0
            .list-content
                height 100%
                overflow hidden
                .bg-image
                    position relative
                    // top 40px
                    // width 100%
                    // padding-top 40%
                    width 100%
                    height 160px
                    background-size 100% 160px
                    // background-size: cover
                .vis-product-filter-bar
                    position sticky
                    background #fff
                    width 100%
                    margin 0 auto
                    .filter-opt-holder
                        position relative
                        box-sizing border-box
                        border-bottom 1px solid #f4f4f4
                        height 42px
                        color #585c64
                        .filter-opt
                            float left
                            width 33.3%
                            line-height 42px
                            height 42px
                            font-size $font-size-medium
                            text-align center
                            .iconbox
                                display inline-block
                                position relative
                                vertical-align top
                                width 12px
                                height 100%
                                line-height normal
                                color #585c64
                                i
                                    display inline-block
                                    position relative
                                    left 0
                                    font-size 12px
                                .icon-paixu-shang
                                    top 12px
                                    width 12px
                                    height 3px
                                .icon-paixu-xia
                                    bottom 3px
                                    width 12px
                                    height 6px
                                .icon-shaixuan
                                    top 13px
                                    width 12px
                                    height 6px
                .products-wrapperr
                    width 100%
                    .products-item
                        display flex
                        width 100%
                        padding 6px
                        .icon
                            flex 0 0 120px
                            width 120px
                            // margin-right 10px
                        .content
                            flex 1
                            position relative
                            padding 12px 6px
                            background-color #fff
                            .price
                                line-height 18px
                                line-height 18px
                                margin-bottom 8px
                                color #222
                                .span
                                    display block
                                    float left
                                    font-size 16px
                                    font-weight bolder
                                .now
                                    font-weight 500
                                .old
                                    margin 2px 0 0 6px
                                    height 18px
                                    line-height 18px
                                    font-size 12px
                                    color #98989f
                                    font-weight 400
                                .discount
                                    margin 2px 0 0 6px
                                    height 18px
                                    line-height 18px
                                    font-size 12px
                                    color #98989f
                                    font-weight 400
                            .name
                                margin-bottom 12px
                                height 16px
                                line-height 16px
                                text-align left
                                color #585c64
                                font-size 14px
                            .cartcontrol-wrapper
                                position absolute
                                right 22px
                                bottom 22px
                                padding 6px
                                width 28px
                                height 28px
                                text-align center
                                box-sizing border-box
                                border-radius 50%
                                background $color-theme
                                .cart-add
                                    display inline-block
                                    line-height 16px
                                    font-size 14px
                                    color #fff
        .footTab-wrapper
          position fixed
          left 6px
          bottom 6px

</style>