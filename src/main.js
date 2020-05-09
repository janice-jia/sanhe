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
Vue.$cookies.set("studentId","50000")
Vue.$cookies.set("CurrentUserName","王娇")
Vue.$cookies.set("MajorId","22")

let studentId = Vue.$cookies.get('studentId')
let CurrentUserName = Vue.$cookies.get('CurrentUserName')
let MajorId = Vue.$cookies.get('MajorId') || 20
// let webUrl = window.location.host
let webUrl = 'http://39.106.82.162:9088'
// console.info('webUrl', webUrl)

Vue.prototype.GLOBAL = {
  'CurrentUserId': 'test',

  'studentId': studentId,
  'CurrentUserName': CurrentUserName,
  'MajorId': MajorId,
  'webUrl': webUrl

}

// 验证是否登录
if(!studentId || !CurrentUserName) 
window.location.href='http://124.238.153.171:82/school-cas/login?service=http://47.92.34.245:9000/AuthUser.aspx'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
