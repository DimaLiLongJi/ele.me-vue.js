<template>
  <div class="titleDemo">
	<div class="line"></div>
	<div class="text">{{content}}</div>
	<div class="line"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: { content: { type: String } }
  }
</script>

<style type="text/css">
.titleDemo{display:flex;display: -webkit-flex;width: 80%;margin:28px auto 24px auto;}
.titleDemo{flex: 1 ;position: relative;top: -6px;border-bottom:1px solid rgba(255,255,255,0.2);}
.titleDemo .text{padding: 0 12px;font-size: 14px;font-weight: 700px;}  	
</style>
