import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exam from './views/Exam.vue'
import CourseList from './views/CourseList.vue'
import MyCourseList from './views/MyCourseList.vue'
import ExamInfo from './views/ExamInfo.vue'
import ExamQuestion from './views/ExamQuestion.vue'
import SchoolWork from './views/SchoolWork.vue'
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
        // 考试中心
        {
            path: '/exam',
            name: 'exam',
            component: Exam
        },
        // 课程列表
        {
            path: '/courseList',
            name: 'courseList',
            component: CourseList
        },
        // 我的课程列表
        {
            path: '/mycourseList',
            name: 'mycourseList',
            component: MyCourseList
        },
        // 考试详情
        {
            path: '/examInfo:courseid',
            name: 'examInfo',
            component: ExamInfo
        },
        // 考试详情页
        {
            path: '/examQuestion:examId',
            name: 'examQuestion',
            component: ExamQuestion
        },
        // 作业详情页
        {
            path: '/schoolWork:schoolworkPaperId',
            name: 'schoolwork',
            component: SchoolWork
        },
        // 提交结果页面
        {
            path: '/examSubmit',
            name: 'examSubmit',
            component: ExamSubmit
        },
        // 课程详情
        {
            path: '/courseInfo:courseid',
            name: 'courseInfo',
            component: CourseInfo
        },
        // 我的消息
        {
            path: '/usermessage',
            name: 'usermessage',
            component: Usermessage
        },
        // 用户-已完成
        {
            path: '/userfinish',
            name: 'userfinish',
            component: Userfinish
        },
        // 用户-已考试
        {
            path: '/userexamfinish',
            name: 'userexamfinish',
            component: UserExamFinish
        },
        // 用户-考试进行中
        {
            path: '/userexaming',
            name: 'userexaming',
            component: UserExaming
        }
    ]
})