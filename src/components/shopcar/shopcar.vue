<template>
  <div class="shopCar">
  	<div class="content">
  	  <!-- 左侧flex布局自适应，右面固定 -->
  	  <div class="content-left">
  	  	<div class="logo-wrapper">
  	  	  <div class="logo">  <!-- wrapper为 -->
  	  	  	<i :class="[{'full': totalCount>0},{'empty': totalCount=0}]" width="44" height="44"></i>
  	  	  </div>
  	  	  <div class="num">{{totalCount}}</div>
  	  	</div>
  	  	<div class="price">&yen;{{totalPrice}}</div>
  	    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  	  </div>
  	  <div class="content-right">
  	  	<div :class="[{'toBuy': totalPrice>minPrice},{'pay': totalPrice<minPrice}]">
  	  	  {{payDesc}}
  	  	</div>
  	  </div>
  	</div>
  </div>
</template>

<script type="text/javascript">
  export default {
    // data () {
    //   return {
    //     countNum: { type: Number } // 用来统计数量，并根据数量改变下方图标
    //   }
    // },
    props: {
      deliveryPrice: { type: Number },
      minPrice: { type: Number },
      selectFoods: {  //  从－组件goods传来的选择数据
        type: Array,
        default () {
          return [
            // {
            //   count: 3,
            //   price: 200
            // }
          ]
        }
      }
    },
    computed: {
      totalPrice () { // 计算总价格的一个函数
        let total = 0 // 首选定义一个总价钱
        this.selectFoods.forEach((i) => {
          total += i.price * i.count  // array.forEach(function (e){e}) 循环数组中的值 累加到total中 可以直接用里面的值,i为每次循环出的i的value
        })
        console.log({ 'total': total })
        return total
      },
      // bgSelect () {
      //   if (this.countNum > 0) { return 'full' } else { return 'empty' }
      // },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((i) => {
          count += i.count
        })
        // if (count > 0) { this.src = './shopcarFull.png' } else { this.src = './shopcarEmpty.png' }
        // this.countNum = count
        console.log({ 'count': count })
        return count
      },
      payDesc () {
        if (this.totalCount === 0) { return `￥${this.minPrice}元起送` } else if (this.totalPrice < this.minPrice) { return `还差￥${this.minPrice - this.totalPrice}元起送` } else { return `去结算` }
      }
    }
  }
</script>

<style type="text/css">
/*购物车图标改变*/
.full{background-image:url('./shopcarFull.png');}
.empty{background-image: url('./shopcarEmpty.png');}
/*结算改变*/
.toBuy{background-color: #00b43c;color: #fff;height:48px;line-height:48px;text-align:center;font-size:12px;}

.shopCar{position: fixed;left: 0;bottom: 0;width: 100%;z-index: 50;height: 48px;}
.shopCar .content{display: flex;background: #141d27;font-size: 0;}
.shopCar .content .content-left{flex: 1;}
.shopCar .content .content-left .logo-wrapper{display: inline-block;vertical-align: top;position: relative;top: -10px;margin: 0 12px;padding: 6px;width: 56px;height: 56px;box-sizing: border-box;border-radius: 50%;background: #141d27 }
.shopCar .content .content-left .logo-wrapper .logo{width: 100%;height: 100%;border-radius: 50%;-webkit-border-radius:50%;text-align: center;}
.shopCar .content .content-left .logo-wrapper .logo i{width: 44px;height: 44px;display: block;background-size:44px 44px;background-repeat:no-repeat}
.shopCar .content .content-left .logo-wrapper .num{position: absolute;top:0;right:0;width:24px;height:16px;line-height: 16px;text-align: center;border-radius: 16px;-webkit-border-radius: 16px;font-size: 9px;font-weight: 700;color: #fff;background-color: rgb(240,20,20);box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);}
.shopCar .content .content-left .price{display: inline-block;vertical-align: top;margin-top: 12px;line-height: 24px;padding-right: 12px;box-sizing: border-box;border-right: 1px solid rgba(255, 255, 255, 0.1);font-size: 16px;font-weight: 700;color:rgba(255, 255, 255, 0.4);}
.shopCar .content .content-left .desc{display:inline-block;vertical-align:top;line-height: 24px;margin:12px 0 0 12px;font-size:12px;color:rgba(255, 255, 255, 0.4);}
.shopCar .content .content-right{flex: 0 0 105px;width: 105px;}
.shopCar .content .content-right .pay{height:48px;line-height:48px;text-align:center;font-size:12px;color:rgba(255, 255, 255, 0.4);background-color:#2b333b;}
</style>
