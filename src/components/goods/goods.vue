<template>
  <div class="goods">
	<div class="menu-wrapper">

	</div>
	<div class="foods-wrapper">

	</div>
  </div>
  
</template>

<script type="text/javascript">
  const errOK = 0
  export default {
    data () {
      return {
        goods: []
      }
    },
    props: {
      seller: { type: Object }
    },
    created () {
      this.$http.get('./api/goods').then((response) => {
        response = response.body
        if (response.errno === errOK) { this.goods = response.data }
      })
      console.log(this.goods)
      console.log(this.seller)
    }
  }
</script>

<style type="text/css">
/*绝对定位布局，上下留出固定高度给header和购物车*/
/*flex: 放大 缩小 占位*/
.goods{position: absolute;width: 100%;top: 174px;bottom: 46px;display: -webkit-flex;;display: flex;overflow: hidden;}
.goods .menu-wrapper{flex: 0 0 80px;width: 80px;background-color: #f3f5f7;}
.goods .foods-wrapper{flex: 1;}
</style>
