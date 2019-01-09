<template>
  <div id="app">
    <!-- 使用头部组件 -->
    <m-header></m-header>
    <tab></tab>
    <!-- 路由出口 -->
    <!-- 从其他路由组件切换回来，会重新走一遍生命周期，重新初始化，也会重新去获取数据，可以优化，加 keep-alive -->
    <!-- 在动态组件上使用 keep-alive 以避免反复重渲染导致的性能问题。我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来,我们可以用一个 <keep-alive> 元素将其动态组件包裹起来。 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
