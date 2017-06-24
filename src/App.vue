<template>
  <div id="app">
    <vheader :seller="seller"></vheader>
    <div class="tab border1px">
      <div class="tab-item">
        <!-- <router-link>按照a来设定css -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
// 导入vheader组件
import vheader from './components/header/header.vue'
const errOK = 0
export default {
  // 数据
  data () {
    return {
      seller: {}
    }
  },
  // 组件
  components: {
    vheader
  },
  // 初始化,vue实例被创建之后被调用，因此可以处理一些ajax函数
  created () {
    // vue-resource方法ajax
    this.$http.get('/api/seller').then((response) => {
      response = response.body // 获得数据，response参数为得到的数据
      if (response.errno === errOK) {
        this.seller = response.data
      }
    })
  }

}
</script>

<style rel="stylesheet" type="text/css">
/*媒体查询*/
.tab {display: flex;width: 100%;height: 40px;line-height: 40px;}
.tab .tab-item{flex: 1 1 auto;text-align: center;vertical-align: middle;}
.tab .tab-item>a{display: block;text-decoration: none;font-size: 14px;color: rgb(77,85,93);line-height: 40px;vertical-align: middle;font-family: "Microsoft Yahei"}
.tab .tab-item>.router-link-active{color: rgb(240,20,20);}
</style>
