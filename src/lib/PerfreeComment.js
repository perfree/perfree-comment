import vuePerfreeComment from './PerfreeComment.vue'
const PerfreeComment = {
  install (Vue, options) {
    Vue.component(vuePerfreeComment.name, vuePerfreeComment)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(PerfreeComment)
}
export default PerfreeComment