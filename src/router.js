import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exam from './views/Exam.vue'
import ExamInfo from './views/ExamInfo.vue'
import ExamQuestion from './views/ExamQuestion.vue'
import ExamSubmit from './views/ExamSubmit.vue'
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
            path: '/exam',
            name: 'exam',
            component: Exam
        },
        {
            path: '/examInfo:courseid',
            name: 'examInfo',
            component: ExamInfo
        },
        {
            path: '/examQuestion:examinationid',
            name: 'examQuestion',
            component: ExamQuestion
        },
        {
            path: '/examSubmit',
            name: 'examSubmit',
            component: ExamSubmit
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