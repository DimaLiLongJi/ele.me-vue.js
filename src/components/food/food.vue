<template>
	<transition name="move">
		<div v-show="showFlag" class="food">
		    <div class="food-content">
		        <!-- 头图 -->
		    	<div class="image-header">
		    		<img :src="food.image" :alt="food.name">
		    		<span class="back" @click.stop.prevent="back"></span>
		    	</div>
		    	<div class="content">
		    	    <h1 class="title">{{food.name}}</h1>
		    	    <div class="detail">
		    	    	<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">{{food.rating}}</span>
		    	    </div>
		    	    <div class="price">
		    	    	<span class="now">&yen;{{food.price}}</span><span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
		    	    </div>
		    	    
		    	</div>
		    </div>
		</div>
	</transition>
</template>

<script type="text/javascript">
  export default {
    props: {
      food: { type: Object }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      back () {
        this.showFlag = false
      }
    }
  }
</script>

<style type="text/css">
.food{position:fixed;left:0;top:0;bottom:48px;z-index:30px;width:100%;background:#fff;transform: translate3d(0, 0, 0);transition:all 0.2s linear;}
.move-enter-active,.move-leave-active{transition: all 1s linear;}
.move-enter,.move-leave{transform: translate3d(100%, 0, 0);}
/*限定高度的方法：父元素relative子元素absolute,父元素height0padding-top为100%就会把子元素撑开*/
.food .food-content .image-header{position:relative;width:100%;height:0;padding-top:100%;}
.food .food-content .image-header img{position:absolute;top:0;left:0;width:100%;height:100%;}
.food .food-content .image-header .back{display: block;position: absolute;top: 10px;left:0;padding:10px;background:url('./back.png');background-repeat:no-repeat;width:20px;height:20px;background-size:20px 20px;text-align: center;vertical-align: center;background-position: center;}
</style>
