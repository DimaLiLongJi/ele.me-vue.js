<template>
  <div class="star" :class="starType"> <!-- 通过starType返回的值来决定不同的样式 -->
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      // 从父元素中接受一个data(要写在props中)
      size: {
    	type: Number
      },
      score: {
    	type: Number
      }
    },
    computed: { // vue的计算属性
      starType () { return 'star-' + this.size } // 根据返回的值拼接来返回不同的class
    }
  }
</script>  

<style type="text/css">
  /*.star-size的样式*/
  .star-48{}
  .star-36{}
  .star-24{}
  /*样式*/
  .star{font-size: 0;}
  .star .star-item {display: inline-block;background-repeat:no-repeat;}
</style>
