import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import 'lib-flexible'
import './plugins/element.js'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueDirectiveImagePreviewer) 
Vue.use(VueCookies) 

// 测试---设置cookie
// Vue.$cookies.set("CurrentUserId","3773")
// Vue.$cookies.set("CurrentUserName","131028200111240035")
// Vue.$cookies.set("MajorId","20")

let CurrentUserId = Vue.$cookies.get('CurrentUserId')
let CurrentUserName = Vue.$cookies.get('CurrentUserName')
let MajorId = Vue.$cookies.get('MajorId') || 20

Vue.prototype.GLOBAL = {
  'CurrentUserId': CurrentUserId,
  'CurrentUserName': CurrentUserName,
  'MajorId': MajorId
}

// 验证是否登录
if(!CurrentUserId || !CurrentUserName) 
window.location.href='http://124.238.153.171:82/school-cas/login?service=http://47.92.34.245:9000/AuthUser.aspx'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
