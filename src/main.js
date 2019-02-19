import 'babel-polyfill' // 写在最前，补丁
import Vue from 'vue'
import App from './App'
import router from './router' // 这个router是 router目录下的index.js文件 export default出来的路由实例(new Router)
import fastclick from 'fastclick' // 移动端点击，延迟300毫秒
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl' // 在webpack.base文件里配置相对路径

fastclick.attach(document.body) // 推荐用法，body下的按钮div都没有300毫秒点击延迟

Vue.use(VueLazyload, {
  loading: 'https://b.appsimg.com/upload/momin/2018/07/11/36/1531301431219.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 挂载路由router实例
  render: h => h(App)
})
