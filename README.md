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
