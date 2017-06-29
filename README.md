# sell

> vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
###2017/6/19
创建框架，更改目录结构，写好路由
./bulid/dev-serve.js --moc模拟数据，出口为 /api/xxx

###2017/6/20
引入vue-router2.0 并学习1.0写法，写到border1px的缩放明天写

###2017/6/21
写完公共样式border1px;
引入vue-resource,(
  created () {
    this.$http.get('/api/seller').then((response) => {
      response=response.body
      if(response.errno === rightNum){
        xxx
      }
    }
  }
)

###2017/6/22
header写好 浮层CSS sticky footers 内容双向绑定

###2017/6/23
算法实现star依据seller.score计算
疯涨star.vue和title.vue

###2017/6/24
goods.vue初始化

###2017/6/25
better-scroll引入
new BScroll(this.$refs.XXX , {参数} )

###2017/6/26
菜单左右联动写好.下一步购物车组件

###2017/6/27
购物车完成，点击动画进行中

###2017/6/28
goods.vue完成，今日知识点：
通过在父组件设置:data="data"，子组件props:{}引用并改变，可以双向绑定！

###2017/6/29
小球动画完成，技术栈：<transition @before-enter='xxx'>
子传父数据： 父上的子组件@自定义事件="functionXXX"
             子this.$emit(自定义事件,data子传付)//data作为事件方法的参数被传走
             父：functionXXX (data从子传来) {}
