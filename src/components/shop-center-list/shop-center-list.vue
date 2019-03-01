<template>
    <div class="middle">
        <scroll ref="scroll" :data="productList" class="scroll-list">
          <div class="products-wrapper">
            <ul class="cart-order-list">
              <li v-for="product in productList" :key="product.id" class="list-item">
                <div class="icon">
                  <img width="76px" height="96px" v-lazy="product.small_image">
                </div>
                <div class="content">
                  <div class="name">
                    <div class="product-name">唯品自营 | {{product.product_name}}</div>
                    <div class="brand-name">{{product.brand_show_name}}特卖旗舰店</div>
                  </div>
                  <div class="price">
                    <p class="new-price">￥{{product.vipshop_price}}</p>
                    <del class="old-price">￥{{product.market_price}}</del>
                  </div>
                  <div class="cart-control clearfix">
                    <div class="cart-decrease number-bottom">﹣</div>
                    <div class="cart-count">{{product.count}}</div>
                    <div class="cart-add number-bottom">+</div>
                    <div class="cart-delete">×</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </scroll>
        <!-- <div class="shopping-cart-empty" v-show="totalPrice===0">
          <div class="bgImg"></div>
          <h2 class="subtitle">购物车空空如也</h2>
        </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

export default {
    props: {
        productList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    components: {
        Scroll
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .middle
        position fixed
        width 100%
        top 40px
        bottom 80px
        .scroll-list
          height 100%
          overflow hidden
          .products-wrapper
            width 100%
            .cart-order-list
              margin 6px 16px
              .list-item
                display flex
                width 100%
                padding 16px 0
                font-size 14px
                .icon
                  flex 0 0 76px
                  margin-right 12px
                .content
                  flex 1
                  position relative
                  .name
                    color #555
                    .product-name
                      display -webkit-box
                      margin-bottom 6px
                      padding-right 52px
                      line-height 18px
                      color #222
                      overflow hidden
                      text-overflow ellipsis
                      -webkit-box-orient vertical
                      -webkit-line-clamp: 2
                    .brand-name
                      line-height 12px
                      color #999
                      font-size 12px
                  .price
                    position absolute
                    right 0
                    top 0
                    width 88px
                    text-align right
                    .new-price
                      margin-bottom 6px
                      line-height 16px
                      font-size 16px
                      color #222
                      font-weight 500
                    .old-price
                      line-height 12px
                      font-size 12px
                      color #98989f
                  .cart-control
                    position relative
                    top 22px
                    height 26px
                    &.clearfix
                      zoom 1
                      clear both
                    .number-bottom
                      float left
                      padding 0 2px
                      width 20px
                      height 20px
                      line-height 20px
                      text-align center
                      border 1px solid #e7e7e7
                      color #83878f
                      font-size 18px
                    .cart-decrease
                      border-radius 4px 0 0 4px
                    .cart-add
                      border-radius 0 4px 4px 0
                    .cart-count
                      float left
                      height 20px
                      line-height 20px
                      padding 0 10px
                      border-top 1px solid #e7e7e7
                      border-bottom 1px solid #e7e7e7
                      color #595d65
                    .cart-delete
                      position absolute
                      right 0
                      top 50%
                      transform translateY(-50%)
                      color #a2a4a8
                      font-size 22px
</style>