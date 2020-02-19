<template>
  <div class="exam">
    <div class="container">
      <!-- 幻灯片 -->
      <div class="sh-slide">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in BannerList" :interval="5000" :key="item.id">
            <!-- <h3>{{ item }}</h3> -->
            <img :src="item.imgurl" :alt="item.bannername">
          </el-carousel-item>
        </el-carousel>
      </div>
      
      <!-- 导航 -->
      <div class="sh-menu">
        <el-tabs v-model="activeNavName" type="card" @tab-click="changeCourse">
          <el-tab-pane 
            v-for="item in MajorList" 
            :key="item.id" 
            :label="item.coursename" 
            :name="'name'+item.id">

            <!-- 视频 -->
            <div class="sh-video-tab">
              <el-tabs v-model="currentPeriodid" @tab-click="handelGetCourseList">
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
                            <div class="tit ">{{clist.examinationname}}</div>
                            <div class="desc">授课老师：杨华</div>
                            <div class="num">
                              <span>得分：{{clist.points ? clist.points : 0}}</span>
                              <span>试题量：{{clist.questionscount}}道</span>
                            </div>
                            <div class="link">
                              <router-link v-if="clist.examstate != '已考试'" class="btn btn-hover" 
                                :to="{name:'examInfo', params: {courseid: clist.id},query:{'type':item.coursename,'currentPageName': clist.examinationname}}" target="_blank">
                                <span v-if="clist.examstate == '未考试'">去考试</span>    
                                <span v-if="clist.examstate == '考试中'">继续考试</span>    
                              </router-link>
                              <router-link v-if="clist.examstate == '已考试'" class="btn btn-hover" 
                                :to="{name:'examInfo', params: {courseid: clist.id},query:{'type':item.coursename,pageuse:'see','currentPageName': clist.examinationname}}" target="_blank">
                                <span v-if="clist.examstate == '已考试'">考题查看</span>    
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>


          </el-tab-pane>
        </el-tabs>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'exam',
  data() {
    return {
      activeNavName: 'name1',
      // activeVideoType: 'activeVideoType0',
      menuid: null,
      BannerList:[],
      // 课程列表
      CourseList: [],
      MajorList: [],
      // 学期列表
      PeriodList:[],
      marjorId:null,
      CurrentUserId: this.GLOBAL.CurrentUserId,
      currentPeriodid:null
    }
  },
  mounted(){
    // 幻灯片
    this.GetBanner()
    // 课程列表
    this.GetMajorList()
  },
  components: {
  },
  methods: {
    // 学期点击事件
    handelGetCourseList(tab, event){
      console.log(tab, event);
      // 获取学期下的列表
      this.GetCourseList(this.marjorId, this.PeriodList[tab.index].id)
    },
    // 切换专业选项卡
    changeCourse(tab, event) {
      // console.log('tab', tab);
      // console.log('event', event);
      // 获取课程下的学期列表
      this.marjorId = this.MajorList[tab.index].id
      this.GetPeriodList(this.MajorList[tab.index].id)
    },
    GetBanner(){
      this.$http.get('/API/Advertisement.ashx?command=GetBanner').then(function (res) {
        this.BannerList = res.body.dataList || []
        console.info('this.BannerList', this.BannerList)
      })
    },
    // 课程列表
    GetCourseList(courseid,periodid){
      if(!courseid) return;
      this.$http.get('/API/Exam/ExaminationPaper.ashx?command=GetExaminationsByCourseId&majorid=' + this.GLOBAL.MajorId +'&courseid='+courseid+'&periodid='+periodid+'&userid='+this.GLOBAL.CurrentUserId
).then(function (res) {
        this.CourseList = res.body.dataList
        // this.activeVideoType = 'activeVideoType0'
        //  console.info('this.CourseList', this.CourseList)
      })
    },
    // 专业列表
    GetMajorList(){
      this.$http.get('/API/Exam/Course.ashx?command=GetCourseListByMajorId&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.MajorList = res.body.dataList
        if(this.MajorList[0].id){
          this.activeNavName = 'name'+this.MajorList[0].id

          // 获取学期列表
          this.marjorId = this.MajorList[0].id
          this.GetPeriodList(this.MajorList[0].id)
        }
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
<style lang="scss">
.exam{
  // 幻灯片
  .sh-slide{
    margin: 30px 0 0px 0;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  
}

.sh-exam-item{
  margin-top: 25px;
  .el-col{
    .sh-exam-item-box{
      border-radius: 5px;
      background: #ffffff;
      height: 214px;
      padding: 20px 10px 0 20px;
      .grid-content{
        width: 260px;
        height: 174px;
        float: left;
        border-radius: 5px;
      } 
      .bg-purple{
        background: #d3dce6;
        img{
          max-width: 100%;
        }
      }
                    
      .info{
        float: left;
        padding: 0 0 0 20px;
        width: 280px;
        .tit{
          font-size: 24px;
          color: #333333;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          margin-bottom: 5px
        }
        .desc ,
        .num{
          font-size: 16px;
          color: #666666;
          height: 31px;
          line-height: 31px;
          margin-bottom: 5px;
          span{
            padding-right: 20px;
          }
        }
        .link{
          margin-top: 20px;
        }
      }
    }
    
  }
}
</style>

