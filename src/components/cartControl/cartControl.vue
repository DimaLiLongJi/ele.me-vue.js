<template>
  <div class="cartcontrol">
    <transition name="move">
	  	<div class="cart-decrease decrease" v-show="food.count>0" @click="decreaseCart($event)"> 
	  	</div>
	</transition>
  	<div class="cart-count" v-show="food.count>0">
  	  {{food.count}}
  	</div>
  	<div class="cart-add add" @click="addCart($event)">
    
  	</div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
export default {
  props: {
    food: { type: Object }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) { return } // 动端触发两次，已经判断了e._constructed，如果不判断是移动端两次PC端3次
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) // 引用vue.set(this.data,key,value)可以设置data里的属性
      } else { this.food.count ++ }
      this.$emit('add', event.target) // 派发事件，将dom对象作为参数传入自定义事件add,add为自定义事件
    },
    decreaseCart (event) {
      if (!event._constructed) { return }
      if (this.food.count) {
        this.food.count --
      }
    }
  }
}
</script>

<style type="text/css">
.decrease{background-image: url("./decrease.png");background-size: 16px 16px;background-repeat: no-repeat;}
.add{background-image: url("./add.png");background-size: 16px 16px;background-repeat: no-repeat;}
.cartcontrol{font-size: 0;}
.cartcontrol .cart-decrease{display: inline-block;
      line-height: 16px;
      font-size: 16px;width: 16px;height: 16px;
      transition:all 0.4s linear;
      transform:translate3d(0,0,0); /* 硬件加速，动画更流程 */
      transform:rotate(0); 
  }
/*动画*/
.move-enter,.move-leave-active{opacity:0;transform:rotate(180deg);transform: translate3d(24px,0,0);}
.move-enter-active,.move-leave-active{transition:all 0.4s linear;}

.cartcontrol .cart-count{display: inline-block; vertical-align: top; width: 24px; line-height: 16px; text-align: center; font-size: 16px; color: rgb(147, 153, 159);height: 16px;}
.cartcontrol .cart-add{display: inline-block; line-height: 16px; font-size: 16px;width: 16px;height: 16px;}
</style>
