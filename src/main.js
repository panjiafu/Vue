import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vantConfig from './vant.config.js'
import VueTouch from 'vue-touch'
import BScroll from 'better-scroll'
Vue.prototype.$BScroll=BScroll
Vue.use(VueTouch,{name:'v-touch'})
Vue.use(vantConfig)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
