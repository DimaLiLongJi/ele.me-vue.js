<template>
  <div id="app">
    <vheader></vheader>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">我是内容</div>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
export default {
  components: {
    vheader
  }
}
</script>

<style>
.tab {display: flex;width: 100%;height: 40px;line-height: 40px;}
.tab .tab-item{flex: 1 1 auto;text-align: center;}
</style>
