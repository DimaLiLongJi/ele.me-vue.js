<template>
  <div class="star" :class="starType"> <!-- 通过starType返回的值来决定不同的样式 -->
    <span v-for="i in itemClasses" :class="i" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/javascript">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      // 从父元素中接受一个data(要写在props中)
      size: { type: Number },
      score: { type: Number }
    },
    computed: { // vue的计算属性实时计算 使用。,dom加载好之后就触发
    // Vue检测到数据发生变动时就会执行对相应数据有引用的函数
      starType () { return 'star-' + this.size }, // 根据返回的值拼接来返回不同的class
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2 // 小算法 可以更准算出向下取整的数字
        let hasDecimal = score % 1 !== 0 // 是否为整
        let integer = Math.floor(score) // 整数部分
        for (let i = 0; i < integer; i++) { result.push(CLS_ON) }
        if (hasDecimal) { result.push(CLS_HALF) }
        while (result.length < LENGTH) { result.push(CLS_OFF) }
        console.log(result)
        return result
      }
    }
  }
</script>  

<style type="text/css">

  /*.star-size的样式*/
  /*stat-48的状态*/
  .star-48 .star-item{width: 20px;height: 20px;margin-right: 22px;background-size: 20px 20px;}
  .star-48 .on{background-image:url("./star48_on@2x.png"); }
  .star-48 .half{background-image:url("./star48_half@2x.png");}
  .star-48 .off{background-image:url("./star48_off@2x.png");}
  .star-48 .last-child{margin-right: 0;}
  /*stat-36的状态*/
  .star-36 .star-item{width: 15px;height: 15px;margin-right: 6px;background-size: 15px 15px;}
  .star-36 .on{background-image:url("./star36_on@2x.png"); }
  .star-36 .half{background-image:url("./star36_half@2x.png");}
  .star-36 .off{background-image:url("./star36_off@2x.png");}
  .star-36 .last-child{margin-right: 0;}
  /*stat-24的状态*/
  .star-24 .star-item{width: 10px;height: 10px;margin-right: 3px;background-size: 10px 10px;}
  .star-24 .on{background-image:url("./star24_on@2x.png"); }
  .star-24 .half{background-image:url("./star24_half@2x.png");}
  .star-24 .off{background-image:url("./star24_off@2x.png");}
  .star-24 .last-child{margin-right: 0;}

  /*样式*/
  .star{font-size: 0;}
  .star .star-item{display: inline-block;background-repeat:no-repeat;}
</style>
