import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import 'lib-flexible'
import './plugins/element.js'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueDirectiveImagePreviewer) 


// let setCookie = function(name,value){
//   var Days = 30;
//   var exp = new Date();
//   exp.setTime(exp.getTime() + Days*24*60*60*1000);
//   document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
// }
// setCookie('CurrentUserId','1465')
// setCookie('CurrentUserName','306201903000100187')

// 获取cookie
let getCookie = function (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

let CurrentUserId = getCookie('CurrentUserId')
let CurrentUserName = getCookie('CurrentUserName')
let MajorId = getCookie('MajorId') || 20

Vue.prototype.GLOBAL = {
  'CurrentUserId': CurrentUserId,
  'CurrentUserName': CurrentUserName,
  'MajorId': MajorId
}

// 验证是否登录
if(!CurrentUserId || !CurrentUserName) 
window.location.href='http://124.238.153.171:82/school-cas/login?service=http://47.92.34.245:9000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
