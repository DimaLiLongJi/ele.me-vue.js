<template>
  <div class="header">
    <!-- 首图内容 -->
  	<div class="content-wrapper">
  	  <div class="avatar">
        <!-- 要用v-bind:属性 或:属性 才能引用vue里的变量 -->
  		<img :src="seller.avatar" alt="seller">
  	  </div>
  	  <div class="content">
  	  	<div class="title">
  	  	  <span class="brand bg_image"></span>
  	  	  <span class="name">{{seller.name}}</span>
  	  	</div>
  	  	<div class="description">
  	  	  {{seller.description}}/{{seller.deliveryTime}}分钟送达
  	  	</div>
  	  	<div v-if="seller.supports" class="supports">
  	  	  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
  	  	  <span class="text">{{seller.supports[0].description}}</span> <!-- 此处为一个异步过程，先传空得seller所以一开始会报错，所以判断下v-if再添入 -->
  	  	</div>
  	  </div>
  	  <div v-if="seller.supports" class="support-count">
  	  	<span class="count">{{seller.supports.length}}个</span>
  	  	<i @click="showDetail">&gt;</i>
  	  </div>
  	</div>
  	<!-- 公告 -->
  	<div class="bulletin-wrapper">
  	  <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
  	  <i @click="showDetail">&gt;</i>
  	</div>
  	<div class="background">
  	  <img :src="seller.avatar" width="100%" height="100%">
  	</div>
  	<!-- 浮层，CSS Sticky Footer -->
  	<div class="detail" v-show="detailShow">
  	  <div class="detail-wrapper clearfix">
  	  	<div class="detail-main">
  	  	  <h1 class="name">{{seller.name}}</h1>
  	  	</div>
  	  </div>
  	  <div class="detail-close">
  	  	<img class="icon-close" src="./close.png" @click="show">
  	  </div>
  	</div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        if (!this.detailShow) { this.detailShow = true }
      },
      show () {
        if (this.detailShow) { this.detailShow = false }
      }
    },
    props: {
      seller: { type: Object } // 此处不能在data注册，在methods中可this.seller this是个vue对象
    },
    created () {
      this.classMap = [
        'decrease1',
        'discount1',
        'special1',
        'invoice1',
        'guarantee1'
      ]
    }
  }
</script>

<style type="text/css">
  .header{color: #fff;position: relative;background: rgba(7,17,27,0.5);overflow: hidden;}
  /*内容区域*/
  .header .content-wrapper .avatar img{
  	height: 64px;width: 64px;
  }
  .content-wrapper{padding: 24px 12px 18px 24px;position: relative;}
  .content-wrapper .avatar{display: inline-block;vertical-align: top;--webkit-border-radius: 2px;border-radius: 2px;}
  .content-wrapper .content{display: inline-block;font-size: 14px;margin-left: 16px;}
  .content-wrapper .content .title{margin: 2px 0 8px 0;}
  .content-wrapper .content .title .brand{width: 30px;height:18px;display: inline-block;background-size: 30px 18px;background-repeat: no-repeat;vertical-align: top;}
  .content-wrapper .content .title .name{margin-left:6px;font-size: 16px;line-height: 18px;font-weight: bold;vertical-align: top; }
  .header .content-wrapper .description{margin-bottom: 10px;line-height: 12px;font-size: 12px;}
  .header .content-wrapper .supports .icon{display: inline-block;width: 12px;height: 12px;margin-right: 4px;background-size: 12px 12px;background-repeat: no-repeat;vertical-align: top;}
  .header .content-wrapper .supports .text{font-size:10px;line-height: 12px;vertical-align: top;}
  .header .content-wrapper .support-count{position: absolute;right: 12px;bottom: 14px;padding:0 8px;height: 24px;line-height: 24px;-webkit-border-radius:14px;border-radius:14px;background-color: rgba(0,0,0,0.2);cursor: pointer;}
  .header .content-wrapper .support-count .count{font-size: 10px;vertical-align: middle;height: 24px;line-height: 24px;}
  .header .content-wrapper .support-count i{font-size: 10px;text-align: right;vertical-align: middle;height: 24px;line-height: 24px;margin-left: 2px;}
  /*公告栏*/
  .header .bulletin-wrapper{height: 28px;line-height: 28px;padding: 0 22px 0 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;position: relative;background: rgba(7,17,27,0.2);cursor: pointer;}
  .header .bulletin-wrapper .bulletin-title{display: inline-block;height: 12px;width: 22px;background-image: url("./bulletin@2x.png");background-size: 22px 12px;vertical-align: top;background-repeat: no-repeat;margin-top: 8px;}
  .header .bulletin-wrapper .bulletin-text{font-size: 10px;margin:0 4px;vertical-align: top;}
  .header .bulletin-wrapper i{position: absolute;font-size: 10px;right: 12px;}
  /*背景*/
  .background{position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: -1;filter: blur(10px);}
  /*浮层 CSS sticky footers*/
  .header .detail{position: fixed;z-index: 100;width: 100%;height: 100%;overflow: auto;background-color: rgba(7,17,27,0.8);top: 0;left: 0;}
  .header .detail .detail-wrapper{min-height: 100%;width: 100%;}
  .header .detail .detail-wrapper .detail-main{margin-top: 64px;padding-bottom:64px; }
  .header .detail .detail-wrapper .detail-main .name{line-height:16px;text-align: center;font-size: 16px;font-weight: 700;margin: 0 auto;}
  .header .detail .detail-close {position: relative;width:32px;height: 32px;margin: -64px auto 0 auto;clear: both;cursor: pointer;}

   /*图标的公共样式*/
   @media (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3){
    .bg_image{background-image: url("./brand@3x.png");}
    .decrease1{background-image: url("./sellIcon/decrease_1@3x.png"); }
   .discount1{background-image: url("./sellIcon/discount_1@3x.png");}
   .guarantee1{background-image: url("./sellIcon/guarantee_1@3x.png");}
   .invoice1{background-image: url("./sellIcon/invoice_1@3x.png");}
   .special1{background-image: url("./sellIcon/special_1@3x.png");}
   .bulletin-title{background-image: url("./bulletin@3x.png");}
   }

  .bg_image{background-image: url("./brand@2x.png");} 
   .decrease1{background-image: url("./sellIcon/decrease_1@2x.png"); }
   .discount1{background-image: url("./sellIcon/discount_1@2x.png");}
   .guarantee1{background-image: url("./sellIcon/guarantee_1@2x.png");}
   .invoice1{background-image: url("./sellIcon/invoice_1@2x.png");}
   .special1{background-image: url("./sellIcon/special_1@2x.png");}
   .icon-close{display: block;width: 32px;height: 32px;}
</style>
