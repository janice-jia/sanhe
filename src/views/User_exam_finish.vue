<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-user-message">
        <el-tabs v-model="currentCouse" @tab-click="handleClick">
          <el-tab-pane v-for="item in MajorList" :key="item.id" :label="item.coursename" :name="'course'+item.id">
            <div class="sh-exam-item">
              <el-row :gutter="20">
                <el-col :span="12" v-for="clist in CourseList" :key="clist.id">
                  <div class="sh-exam-item-box">
                    <div class="grid-content bg-purple">
                      <img v-if="!clist.logo_url" src="../assets/img/exam-default.jpg" alt="">
                      <img v-if="clist.logo_url" :src="clist.logo_url" :alt="clist.coursename">
                    </div>
                    <div class="info">
                      <!-- tit-v  tit-p tit-w -->
                      <div class="tit ">{{clist.coursename}}</div>
                      <div class="desc">授课老师：杨华</div>
                      <div class="num">
                        <span>得分：{{clist.points ? clist.points : 0}}</span>
                        <span>试题量：{{clist.questionscount}}道</span>
                      </div>
                      <div class="link">
                        <router-link class="btn btn-hover" 
                          :to="{name:'examInfo', params: {courseid: clist.id},query:{'type':item.coursename,'currentPageName': clist.examinationname}}" target="_blank">
                          考题查看
                        </router-link>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="回复消息" name="second">
            回复消息
          </el-tab-pane> -->
        </el-tabs>
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
      // 专业列表
      MajorList:[],
      // 课程列表
      CourseList:[],
      currentCouse:null
    }
  },
  mounted(){
    // 获取已考试的专业课程
    this.GetMajorList()
  },
  components: {
    UserHeader
  },
  methods: {
    handleClick(tab, event) {
      this.GetCourseList(this.MajorList[tab.index].id)
    },
    // 获取已考试的专业列表
    GetMajorList(){
      this.$http.get('/API/My/MyInfo.ashx?command=GetCourseListByState&userid='+this.GLOBAL.CurrentUserId+'&state=已考试').then(function (res) {
        this.MajorList = res.body.dataList || []
        // console.info('this.CourseList', this.CourseList)
        if(this.MajorList && this.MajorList.length > 0){
          this.currentCouse = 'course'+this.MajorList[0].id
          this.GetCourseList(this.MajorList[0].id)
        }
      })
    },
    // 课程列表
    GetCourseList(courseid){
      if(!courseid) return;
      this.$http.get('/API/Exam/ExaminationPaper.ashx?command=GetExaminationsByCourseId&majorid=' + this.GLOBAL.MajorId + '&courseid='+courseid +'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.CourseList = res.body.dataList
      })
    }
  }
}
</script>

