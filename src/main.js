import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import PerfreeComment from './lib/PerfreeComment.js'
Vue.use(iView)
Vue.use(PerfreeComment)
new Vue({
  el: '#app',
  render: h => h(App)
})
