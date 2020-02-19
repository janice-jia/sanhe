<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-user-message">
        <el-tabs v-model="currentCouse" @tab-click="handleClick">
          <el-tab-pane v-for="item in MajorList" :key="item.id" :label="item.coursename" :name="'course'+item.id">
            

            <el-tabs type="card" v-model="currentPeriodid" @tab-click="handelGetCourseList">
              <el-tab-pane v-for="examItem in PeriodList"  :key="examItem.id" :label="examItem.periodname" :name="'periodid'+examItem.id">
                <!-- 考试item -->
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
                              去考试
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
            



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
      marjorId: null,
      // 课程列表
      CourseList:[],
      // 学期列表
      PeriodList:[],
      currentCouse:null,
      currentPeriodid:null
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
    // 课程点击事件
    handleClick(tab, event) {
      // console.log(tab, event);
      // 获取课程下的学期列表
      this.marjorId = this.MajorList[tab.index].id
      this.GetPeriodList(this.MajorList[tab.index].id)
    },
    // 学期点击事件
    handelGetCourseList(tab, event){
      console.log(tab, event);
      // 获取学期下的列表
      this.GetCourseList(this.marjorId, this.PeriodList[tab.index].id)
    },
    // 获取已考试的专业列表
    GetMajorList(){
      this.$http.get('/API/My/MyInfo.ashx?command=GetCourseListByState&userid='+this.GLOBAL.CurrentUserId+'&state=已学完').then(function (res) {
        this.MajorList = res.body.dataList || []
        // console.info('this.MajorList', this.MajorList)
        if(this.MajorList && this.MajorList.length > 0){
          this.currentCouse = 'course'+this.MajorList[0].id
          
          // 获取学期列表
          this.marjorId = this.MajorList[0].id
          this.GetPeriodList(this.MajorList[0].id)
        }
      })
    },
    // 课程列表
    GetCourseList(courseid, periodid){
      if(!courseid) return;
      this.$http.get('/API/Exam/ExaminationPaper.ashx?command=GetExaminationsByCourseId&majorid=' + this.GLOBAL.MajorId + '&courseid='+courseid +'&periodid='+periodid+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.CourseList = res.body.dataList
        console.info('课程列表', this.CourseList)
      })
    },
    // 学期列表
    GetPeriodList(courseid){
      this.$http.get('/API/Study/Course.ashx?command=GetCoursePeriodByCourseId&courseid=' + courseid  +'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.PeriodList = res.body.dataList
        this.currentPeriodid = 'periodid'+this.PeriodList[0].id
        console.info('this.currentPeriodid', this.currentPeriodid)

        // 获取课程列表
        this.GetCourseList(courseid, this.PeriodList[0].id)
      })
    }
  }
}
</script>

