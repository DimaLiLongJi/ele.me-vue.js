<template>
<div> 
  <div class="goods">
    <!-- 左侧滚动列表 -->
  	<div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- v-for="(vaule,index) in XXX" 事件为$event -->
          <li v-for="(i,index) in goods" class="menu-item" :class="{current: currentIndex===index}" @click="selectMenu(index,$event)" ref="goodMenu">
            <span class="text border1px"><span v-show="i.type>0" class="icon" :class="classMap[i.type]"></span>{{i.name}}</span>
          </li>
        </ul>
  	</div>
      <!-- 右侧食品列表 -->
  	<div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="i in goods" class="food-list" ref="foodList">
            <h1 class="title">{{i.name}}</h1>
            <ul>
              <!-- 具体食物 j为.foods的循环 i.foods为里面的吃的-->
            	<li v-for="j in i.foods" class="food-item border1px" @click.stop.prevent="selectFood(j, $event)">
            	  <div class="icon">
            	  	<img :src="j.icon" width="57" height="57">
            	  </div>
            	  <div class="content">
            	  	<h2 class="name">{{j.name}}</h2>
            	  	<p class="desc">{{j.description}}</p>
            	  	<div class="extra">
            	  	  <span class="count">月售{{j.sellCount}}份</span><span class="">好评率:{{j.rating}}%</span>
            	  	</div>
            	  	<div class="price">
            	  	  <span class="now">&yen;{{j.price}}</span><span class="old" v-show="j.oldPrice">&yen;{{j.oldPrice}}</span>
            	  	</div>
                  <!-- 点击购买数量按钮 -->
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="j"></cartcontrol>
                  </div>
            	  </div>
            	</li>
            </ul>
          </li>
        </ul>
  	</div>
    <!-- 购物车组件 -->
    <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopcart"></shopcar>
  </div>
  
  <!-- 商品展示页food.vue  selectFood为组件点击产生的data -->
  <food :food="foodContent" ref="food"></food>
</div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll'
  import shopcar from '../shopcar/shopcar.vue'
  import cartcontrol from '../cartControl/cartControl.vue'
  import food from '../food/food.vue'
  const errOK = 0
  export default {
    data () {
      return {
        goods: [],
        listHeight: [], // 用来存储右侧滚动区每个区间间的高度
        scrollY: 0, // 监听右侧滚动的y轴
        foodContent: {} // 存储点击产生的数据，传输给详情页
      }
    },
    components: {
      shopcar: shopcar,
      cartcontrol: cartcontrol,
      food: food
    },
    props: {
      seller: { type: Object }
    },
    computed: { // 实时计算
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i]
          let h2 = this.listHeight[i + 1]
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i
          }
          // if (this.scrollY >= 0 && this.scrollY < this.listHeight[1]) { this.menuScroll.scrollToElement(this.$refs.goodMenu[i], 100) } else { this.menuScroll.scrollToElement(this.$refs.goodMenu[i], 100) }
        }
        return 0
      },
      selectFoods () { // 将被cartcontrol组件选择的输出给shopcar
        let selectFoods = []
        this.goods.forEach((i) => {  // 遍历goods，goods为服务器传来的
          i.foods.forEach((j) => {  // 遍历拿到的food,看里面又没有count属性，count为cartcontrol Vue.set()的购买数量
            if (j.count) {
              selectFoods.push(j) // 如果有数量则push到给定的数组中并输出
            }
          })
        })
        return selectFoods
      }
    },
    methods: {
      _initScroll () {
        // this.$els.XXX 是vue的dom获取v-el:XXX
        // vue2 是 this.$refs.xxx ref="xxx"
        this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        }) // 在滚动的时候告诉滚动位置
        // .on('事件' ,回调)
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 位置的变化传入y中
          // console.log(pos) Object{x:,y:}
        })
      },
      _calculateHeight () {
        // 获取每个li的高度然后添加进 listHeight数组中
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (i, event) {
        if (!event._constructed) { return } // pc无派发事件 此为使pc与移动端一样点击会动
        let foodList = this.$refs.foodList
        let el = foodList[i]
        this.foodsScroll.scrollToElement(el, 300) // BScroll.scrollToElement(显示的li,time)  BScroll=new BScroll(整个div,{click:true,probeType:3}) 可以点击并监听
      },
      addFood (target) { // 自定义事件add的方法，targer为再组件中用vm.$emit('自定义事件add',参数)
        // this._drop(target) // tatget为参数传入
        this.$nextTick(() => { // 异步进行，优化用户体验
          this.$refs.shopcart.drop(target) // 调用shopcar中的方法drop()
        })
      },
      selectFood (i, event) { // 点击选择的详情数据
        if (!event._constructed) { return }
        this.foodContent = i
        this.$refs.food.show() // 父组件可以调用子组件的方法
      }
    },
    created () { // 创建vue实例后出发
      this.$http.get('./api/goods').then((response) => {
        response = response.body
        if (response.errno === errOK) {
          this.goods = response.data
          // this.$nextTick(() => {})解决异步加载
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
      this.classMap = [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    }
  }
</script>

<style type="text/css">
/*绝对定位布局，上下留出固定高度给header和购物车*/
/*flex: 放大 缩小 占位*/
.goods{position: absolute;width: 100%;top: 174px;bottom: 46px;display: -webkit-flex;;display: flex;overflow: hidden;}
.goods .foods-wrapper{flex: 1;}

/*左侧样式*/
.goods .menu-wrapper{flex: 0 0 80px;width: 80px;background-color: #f3f5f7;}
.goods .menu-wrapper .menu-item{display: table;height: 54px;width: 56px;line-height: 14px;padding: 0 12px;text-align: center;}
.goods .menu-wrapper .menu-item .icon{display: inline-block;vertical-align: top;width: 12px;height: 12px;margin-right:2px;background-size: 12px 12px;}
.goods .menu-wrapper .menu-item .text{font-size: 12px;display: table-cell;vertical-align: middle;width: 56px;}

/*右侧样式*/
.goods .foods-wrapper .title{padding-left: 14px;height: 26px;line-height: 26px;border-left: 2px solid #d9dde1;font-size: 12px;color:rgb(147,153,159);background-color:#f3f5f7;font-weight: bold;}
.goods .foods-wrapper .food-item{display: flex;margin: 18px;padding-bottom:18px;}
.goods .foods-wrapper .food-item .icon{flex: 0 0 57px;margin-right: 10px;}
.goods .foods-wrapper .food-item .content{flex: 1;}
.goods .foods-wrapper .food-item .content .name{margin:2px 0 8px 0;height: 14px;line-height: 14px;font-size: 14px;color: rgb(7,17,27);}
.goods .foods-wrapper .food-item .content .desc{font-size: 10px;line-height: 10px;color:rgb(147,153,159);margin-bottom:8px;line-height: 12px;}
.goods .foods-wrapper .food-item .content .extra{line-height: 10px;font-size: 10px;color: rgb(147,153,159);}
.goods .foods-wrapper .food-item .content .extra .count{margin-right: 12px;}
.goods .foods-wrapper .food-item .content .price{font-weight:700;line-height: 24px;}
.goods .foods-wrapper .food-item .content .price .now{color:rgb(240,20,20);margin-right: 8px;font-size:14px;}
.goods .foods-wrapper .food-item .content .price .old{
	text-decoration: line-through;font-size: 10px;color:rgb(147,153,159); 
}
/*购买按钮*/
.cartcontrol-wrapper{position: absolute;right: 0;bottom: 12px;}

/*公共样式*/
.menu-item .decrease{background-image: url("./sellIcon/decrease_3@2x.png"); }
.menu-item .discount{background-image: url("./sellIcon/discount_3@2x.png");}
.menu-item .guarantee{background-image: url("./sellIcon/guarantee_3@2x.png");}
.menu-item .invoice{background-image: url("./sellIcon/invoice_3@2x.png");}
.menu-item .special{background-image: url("./sellIcon/special_3@2x.png");}
@media (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3){
	.menu-item .decrease{background-image: url("./sellIcon/decrease_3@3x.png"); }
	.menu-item .discount{background-image: url("./sellIcon/discount_3@3x.png");}
	.menu-item .guarantee{background-image: url("./sellIcon/guarantee_3@3x.png");}
	.menu-item .invoice{background-image: url("./sellIcon/invoice_3@3x.png");}
	.menu-item .special{background-image: url("./sellIcon/special_3@3x.png");}
}
.current{
	position: relative;z-index: 10;margin-top:-1px;background: #fff;font-weight: 700;
}
.current .text{border: none;}
</style>
