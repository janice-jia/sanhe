<template>
  <div class="exam">
    <div class="container">
      <!-- 幻灯片 -->
      <div class="sh-slide">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in BannerList" :interval="5000" :key="item.id">
            <!-- <h3>{{ item }}</h3> -->
            <img :src="GLOBAL.webUrl+item.logoUrl" :alt="item.bannername">
          </el-carousel-item>
        </el-carousel>
      </div>
      
      <!-- 导航 -->
      <div class="sh-menu">

      <div class="sh-video-tab">
        <div class="sh-exam-item">
          <el-row :gutter="20">
            <el-col :span="12" v-for="clist in myExamList" :key="clist.id">
              <div class="sh-exam-item-box">
                <div class="grid-content bg-purple">
                  <img v-if="!clist.logoUrl" src="../assets/img/exam-default.jpg" alt="">
                  <img v-if="clist.logoUrl" :src="GLOBAL.webUrl+clist.logoUrl" :alt="clist.courseName">
                </div>
                <div class="info">
                  <!-- tit-v  tit-p tit-w -->
                  <div class="tit ">{{clist.courseName}}</div>
                  <div class="desc">授课老师：杨华</div>
                  <div class="num">
                    <span>得分：{{clist.points ? clist.points : 0}}</span>
                    <span>试题量：{{clist.questionsCount}}道</span>
                  </div>
                  <div class="link">
                    <router-link v-if="clist.examState != '已考试'" class="btn btn-hover" 
                      :to="{name:'examInfo', params: {courseid: clist.id},query:{'type':clist.examState,'currentPageName': clist.courseName}}" target="_blank">
                      <span v-if="clist.examState == '未考试'">去考试</span>    
                      <span v-if="clist.examState == '考试中'">继续考试</span>    
                    </router-link>
                    <router-link v-if="clist.examState == '已考完'" class="btn btn-hover" 
                      :to="{name:'examInfo', params: {courseid: clist.id},query:{'type':clist.examState,pageuse:'see','currentPageName': clist.courseName}}" target="_blank">
                      <span v-if="clist.examState == '已考完'">考题查看</span>    
                    </router-link>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
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
      myExamList: [],
      studentId: this.GLOBAL.studentId
    }
  },
  mounted(){
    // 幻灯片
    // this.GetBanner()
    // 考试列表列表
    this.GetMyExamList()
  },
  components: {
  },
  methods: {
    GetBanner(){
      this.$http.get('/API/Advertisement.ashx?command=GetBanner').then(function (res) {
        this.BannerList = res.body.dataList || []
        console.info('this.BannerList', this.BannerList)
      })
    },
    // 课程列表
    GetMyExamList(){
      this.$http.post('/api/examPaper/myExamList', {
        'examState': '已考完',
        'studentId': this.GLOBAL.studentId,
      }).then(function (res) {
        this.myExamList = res.body.data
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

