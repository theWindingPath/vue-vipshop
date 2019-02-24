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
                <div v-if="products.length" class="products-wrapperr">
                    <ul>
                        <li v-for="product in products" :key="product.id" class="products-item">
                            <div class="icon">
                                <img width="120px" height="150px" :src="product.small_image">
                            </div>
                            <div class="content">
                                <div class="price">
                                    <span class="now">￥{{product.vipshop_price}}</span><span class="old">￥{{product.market_price}}</span><span class="discount">{{product.vip_discount}}</span>
                                </div>
                                <p class="name">{{product.product_name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

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
        }
    },
    components: {
        Scroll
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
                .products-wrapperr
                    width 100%
                    .products-item
                        display flex
                        width 100%
                        padding 6px
                        .icon
                            flex 0 0 120px
                            width 120px

</style>