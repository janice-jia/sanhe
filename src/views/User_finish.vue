<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-video-tab">
        <!-- 视频 -->
        <div class="sh-video">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}"  v-for="clist in myExamList" :key="clist.id">
              <router-link :to="{name:'courseInfo', params: {courseid: clist.courseId}, query: {majorId: clist.majorId}}" target="_blank">
                <div class="grid-content bg-purple">
                  <!-- <img :src="GLOBAL.webUrl+clist.logoUrl" :alt="clist.logoUrl"> -->
                  <el-image
                  style="width: 220px; height: 147px"
                  :src="GLOBAL.webUrl+clist.logoUrl"
                  fit="none"></el-image>
                </div>
                <!-- tit-v  tit-p tit-w -->
                <div class="tit">{{clist.courseName}}</div>
                <div class="type">授课类型：{{clist.courseType}}</div>
                <div class="type">所属学期：{{clist.periodName}}</div>
                <div class="type">得分:无  试题量:{{clist.questionsCount}}道</div>
                <!-- <div class="teacher">授课老师：{{clist.teacherName}}</div> -->
              </router-link>
              <router-link
                :to="{
                  name:'examQuestion', 
                  params: {examId: clist.examId},
                  query:{
                    'type': clist.courseType,
                    'currentPageName': clist.courseName,
                    'questionscount': clist.questionsCount
                  }
                }">
                <div class="btn">
                    <button class="blue">去考试</button>
                </div>
              </router-link>
                <!-- <div class="desc">授课老师：杨华</div> -->
              
            </el-col>
          </el-row>
          
          <div class="nullListCon" v-if="myExamList.length == 0">
            内容为空
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserHeader from '../components/User_header'
export default {
  name: 'usermessage',
  data() {
    return {
      // 课程列表
      myExamList: []
    }
  },
  mounted(){
    // 考试列表列表
    this.GetMyExamList()
  },
  components: {
    UserHeader
  },
  methods: {
    // 课程列表
    GetMyExamList(){
      this.$http.post('/api/examPaper/myExamList', {
        'examState': '已学完',
        'studentId': this.GLOBAL.studentId,
      }).then(function (res) {
        this.myExamList = res.body.data
      })
    },
    goExamTest(){

    }
  }
}
</script>

