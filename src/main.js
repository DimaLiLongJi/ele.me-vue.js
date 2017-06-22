// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router' // 引入vue-router
import VueResource from 'vue-resource' // 引入vue-resource
// 引入自定义组件
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

// 引入css
import '../static/css/media.css'

// 插件全局注册
Vue.use(VueRouter) // vue中添加VueRouter
Vue.use(VueResource) // 全局注册vue ajax

Vue.config.productionTip = false

// 使用vue路由：vue-router
let routesPath = [ // 定义路由路径
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
const router = new VueRouter({// 实例化vue-router
  routes: routesPath
})
router.push('/goods') // 初始化加载goods
// 使用，最后render: h => h(App)为App挂靠点，最后那个为index的挂靠点
new Vue({
  router,
  render: h => h(App)
}).$mount('#eleme')
