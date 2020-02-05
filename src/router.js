import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CourseInfo from './views/Course_info.vue'
import Usermessage from './views/User_message.vue'
import Userfinish from './views/User_finish.vue'
import UserExamFinish from './views/User_exam_finish.vue'
import UserExaming from './views/User_examing.vue'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // 首页
        {
            path: '/',
            name: 'index',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/courseInfo:courseid',
            name: 'courseInfo',
            component: CourseInfo
        },
        {
            path: '/usermessage',
            name: 'usermessage',
            component: Usermessage
        },
        {
            path: '/userfinish',
            name: 'userfinish',
            component: Userfinish
        },
        {
            path: '/userexamfinish',
            name: 'userexamfinish',
            component: UserExamFinish
        },
        {
            path: '/userexaming',
            name: 'userexaming',
            component: UserExaming
        }
    ]
})