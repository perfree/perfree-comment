import Vue from 'vue'
import App from './App.vue'
import PerfreeComment from './lib/PerfreeComment.js'

Vue.use(PerfreeComment)
new Vue({
  el: '#app',
  render: h => h(App)
})
