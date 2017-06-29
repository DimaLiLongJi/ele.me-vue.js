<template>
  <div class="shopCar">
  	<div class="content">
  	  <!-- 左侧flex布局自适应，右面固定 -->
  	  <div class="content-left">
  	  	<div class="logo-wrapper">
  	  	  <div class="logo">  <!-- wrapper为 -->
  	  	  	<i :class="[{'full': totalCount>0},{'empty': totalCount==0}]" width="44" height="44"></i>
  	  	  </div>
  	  	  <div class="num">{{totalCount}}</div>
  	  	</div>
  	  	<div class="price">&yen;{{totalPrice}}</div>
  	    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  	  </div>
  	  <div class="content-right">
  	  	<div :class="[{'toBuy': totalPrice>=minPrice},{'pay': totalPrice<minPrice}]" @click="buyIt">
  	  	  {{payDesc}}
  	  	</div>
  	  </div>
  	</div>
    <!-- 小球效果 -->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        balls: [ // 存储小球,show决定是否显示
          { show: false }
          // { show: false },
          // { show: false },
          // { show: false },
          // { show: false }
        ],
        dropBalls: []
      }
    },
    props: {
      deliveryPrice: { type: Number },
      minPrice: { type: Number },
      selectFoods: {  //  从－组件goods传来的选择数据
        type: Array,
        default () {
          return [
            // {
            //   count: 0,
            //   price: 200
            // }
          ]
        }
      }
    },
    methods: {
      buyIt () {
        if (this.totalPrice >= this.minPrice) { window.alert(`需要付款${this.totalPrice + this.deliveryPrice}元`) }
      },
      // 被来自good.vue激活的函数
      drop (target) {
        console.log(target)
        // 遍历balls数组，
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true // 此项决定小球动画
            ball.el = target
            this.dropBalls.push(ball) // show为true的放入drops里
            return
          }
        }
      },
      // 动画函数
      beforeDrop (el) { // 动画开始前
        // let count = this.balls.length // 5
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i] // ball=balls[5]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect() // 返回元素相对于窗口的偏移 left right
            let x = rect.left - el.style.left
            let y = -(window.innerHeight - rect.top - el.style.bottom)
            // 外层纵向位移
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 里层横向位移
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el) { // 动画开始
        /* eslint-disable no-unused-vars */
        // es6不检测下面
        let rf = el.offsetHeight // 获取el高度
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterDrop (el) { // 动画结束后
        let ball = this.dropBalls.shift() // 移除数组中的第一个元素并返回第一个元素的值
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    computed: {
      totalPrice () { // 计算总价格的一个函数
        let total = 0 // 首选定义一个总价钱
        this.selectFoods.forEach((i) => {
          if (i.count) { total += i.price * i.count }
          // array.forEach(function (e){e}) 循环数组中的值 累加到total中 可以直接用里面的值,i为每次循环出的i的value
        })
        return total
      },
      // bgSelect () {
      //   if (this.countNum > 0) { return 'full' } else { return 'empty' }
      // },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((i) => {
          if (i.count) { count += i.count }
        })
        // if (count > 0) { this.src = './shopcarFull.png' } else { this.src = './shopcarEmpty.png' }
        // this.countNum = count
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

/*小球效果*/
.ball{position: fixed; left: 32px; bottom: 22px; z-index: 200; transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);}
.inner{width: 16px; height: 16px; border-radius: 50%; background: rgb(0, 160, 220); transition: all 0.4s linear;}
</style>
