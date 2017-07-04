<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="food">
		    <div class="food-content">
		        <!-- 头图 -->
		    	<div class="image-header">
		    		<img :src="food.image" :alt="food.name">
		    		<span class="back" @click.stop.prevent="back"></span>
		    	</div>
		    	<div class="content">
		    	    <h1 class="title">{{food.name}}</h1>
		    	    <div class="detail">
		    	    	<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}&#37;</span>
		    	    </div>
		    	    <div class="price">
		    	    	<span class="now">&yen;{{food.price}}</span><span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
		    	    </div>
		    	    <!-- 购物车组件 在同一位置，加入z-index高，并通过v-show:food.count来控制显示与否 -->
		    	    <div class="cartcontrol-wrapper" v-show="food.count">
		    	    	<cartcontrol :food="food"></cartcontrol>
		    	    </div>
		    	    <transition name="fade">
		    	    	<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)">
		    	        加入购物车
		    	    	</div>
		    	    </transition>
		    	</div>
		    	
		    </div>
		</div>
	</transition>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartControl/cartControl.vue'
  export default {
    props: {
      food: { type: Object }
    },
    components: {
      cartcontrol: cartcontrol
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () { // 页面站时候添加better-scroll
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.foodScroll.refresh()
          }
        })
      },
      back () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) { return }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else { this.food.count = 1 }
        this.$emit('add', event.target)
      }
    }
  }
</script>

<style type="text/css">
	.food{position:fixed;left:0;top:0;bottom:48px;z-index:30px;width:100%;background:#fff;transform: translate3d(0, 0, 0);transition:all 0.3s linear;}
	.move-enter-active,.move-leave-active{transition: all 1s linear;}
	.move-enter,.move-leave{transform: translate3d(100%, 0, 0);}
	.fade-enter-active,.fade-leave-active{transition: all 0.2s;}
	.fade-enter,.fade-leave-active{opacity: 0; z-index: -100;transform:translate3d(100%,0,0);} /*限定高度的方法：父元素relative子元素absolute,父元素height0padding-top为100%就会把子元素撑开*/
	.food .food-content .image-header{position:relative;width:100%;height:0;padding-top:100%;}
	.food .food-content .image-header img{position:absolute;top:0;left:0;width:100%;height:100%;}
	.food .food-content .image-header .back{display: block;position: absolute;top: 10px;left:0;padding:10px;background:url('./back.png');background-repeat:no-repeat;width:20px;height:20px;background-size:20px 20px;text-align: center;vertical-align: center;background-position: center;}
	.food .food-content .content{padding:18px;}
	.food .food-content .content .title{line-height:14px;margin-bottom:8px;font-size:14px;font-weight:700;color:rgb(7,17,27);}
	.food .food-content .content .detail{margin-bottom:18px;line-height:10px;font-size:0;height:10px;}
	.food .food-content .content .detail .sell-count{font-size:10px;color:rgb(147,153,159);margin-right:12px;}
	.food .food-content .content .detail .rating{font-size:10px;color:rgb(147,153,159);}
	.food .food-content .content .price{font-weight:700;line-height:24px;}
	.food .food-content .content .price .now{margin-right:8px;font-size:14px;color:rgb(240,153,159);}
	.food .food-content .content .price .old{text-decoration:line-through;font-size:10px;color:rgb(147,153,159);}
	.food .food-content .cartcontrol-wrapper{position:absolute;right:18px;bottom:18px;}
	.food .food-content .buy{position: absolute; right: 18px; bottom: 18px; z-index: 10; height: 24px; line-height: 24px; padding: 0 12px; box-sizing: border-box; border-radius: 12px; font-size: 10px; color: #fff; background: rgb(0, 160, 220); opacity: 1;}
</style>
