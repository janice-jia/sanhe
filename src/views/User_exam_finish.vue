<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-user-message">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-if="item in CourseList" :label="item.coursetype" name="first">
            <div class="sh-exam-item">
              <el-row :gutter="20">
                <el-col :span="12" v-for="clist in CourseList" :key="clist.id">
                  <div class="sh-exam-item-box">
                    <div class="grid-content bg-purple">
                      <img :src="clist.logo_url" :alt="clist.coursename">
                    </div>
                    <div class="info">
                      <!-- tit-v  tit-p tit-w -->
                      <div class="tit ">{{clist.examinationname}}</div>
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
      activeName: 'first',
      CourseList:[]
    }
  },
  mounted(){
    // 获取已考试的课程
    this.GetCourseList()
  },
  components: {
    UserHeader
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取已考试的课程
    GetCourseList(){
      this.$http.get('/API/My/MyInfo.ashx?command=GetCourseListByState&userid='+this.GLOBAL.CurrentUserId+'state=已考试').then(function (res) {
        this.CourseList = res.body.dataList || []
        console.info('this.CourseList', this.CourseList)
      })
    }
  }
}
</script>

