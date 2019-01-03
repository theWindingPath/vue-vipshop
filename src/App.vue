<template>
  <div id="app">
    <!-- 使用头部组件 -->
    <m-header></m-header>
    <tab></tab>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header' // 引入头部m-header组件,需要配置components的相对路径
import Tab from 'components/tab/tab' // 引入tab组件

export default {
  components: {
    MHeader, // 注册头部组件
    Tab
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
</style>
