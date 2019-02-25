import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend' // 引入recommend组件
import flagshipStore from 'components/flagshipStore/flagshipStore'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import StoreDetail from 'components/store-detail/store-detail'

// 底部tab路由 es6语法
const UserCenter = () => import('components/user-center/user-center')
const ShopCenter = () => import('components/shop-center/shop-center')
const LikeCenter = () => import('components/like-center/like-center')

Vue.use(Router) // 注册路由

export default new Router({ // 导出路由实例
  routes: [ // 路由配置选项
    {
      path: '/', // 根的router，刚进入页面
      redirect: '/recommend' // 默认跳到这个页面
    },
    {
      path: '/recommend', // 路由to对应的路径
      component: recommend // 路由到对应的组件
    },
    {
      path: '/flagshipStore',
      component: flagshipStore,
      children: [ // 子路由
        {
          path: ':id', // 动态路由
          component: StoreDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/user',
      component: UserCenter
    },
    {
      path: '/shop',
      component: ShopCenter
    },
    {
      path: '/like',
      component: LikeCenter
    }
  ]
})
