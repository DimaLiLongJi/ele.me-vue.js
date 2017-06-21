// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// 自定义组件
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

Vue.config.productionTip = false

// 使用vueRouter
Vue.use(VueRouter) // vue中添加VueRouter
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

// 引入css
import '../static/css/media.css'
