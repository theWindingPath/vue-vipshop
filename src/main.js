import Vue from 'vue'
import App from './App'
// import router from './router'

import 'common/stylus/index.styl' // 在webpack.base文件里配置相对路径

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
