<template>
  <div class="examInfo">
    <div class="container">
      <!-- 面包屑 -->
      <div class="sh-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="home">首页</el-breadcrumb-item>
          <el-breadcrumb-item to="exam">考试中心</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.type}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.currentPageName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sh-exam-info">
        <div class="sh-exam-info-l">
          <div class="tit">{{examInfo.examinationname}}</div>
          <div class="info">
            <!-- <p>授课老师：杨华</p>
            <p>课程归类：基础</p>
            <p>教程程度：入门</p> -->
            <p>试题总分：{{examInfo.totalpoints}}分</p>
            <p>试题量：{{examInfo.questionscount}}道</p>
            <router-link v-if="examInfo.examstate=='未考试'" class="btn btn-hover" 
              :to="{name:'examQuestion', params: {examinationid: examInfo.id},query:{'type':$route.query.type,'currentPageName': $route.query.currentPageName,'questionscount': examInfo.questionscount}}">
              开始考试
            </router-link>
            <router-link v-if="examInfo.examstate=='考试中'" class="btn btn-hover" 
              :to="{name:'examQuestion', params: {examinationid: examInfo.id},query:{'type':$route.query.type,'currentPageName': $route.query.currentPageName,'questionscount': examInfo.questionscount}}">
              继续考试
            </router-link>
            <router-link v-if="examInfo.examstate=='已考试'" class="btn btn-hover" 
              :to="{name:'examQuestion', params: {examinationid: examInfo.id},query:{'type':$route.query.type,pageuse:'see','currentPageName': $route.query.currentPageName,'questionscount': examInfo.questionscount}}">
              考题查看
            </router-link>
          </div>
        </div>
        <div class="sh-exam-info-r">
          <div class="tit">试卷简介</div>
          <div class="con" v-if="!examInfo.description">本大题共{{examInfo.questionscount}}小题，每小题2分，共{{examInfo.totalpoints}}分。在每小题列出的四个备选项中只有一个符合题目要求，错选、多选或未选均无分。</div>
          <div class="con" v-if="examInfo.description">{{examInfo.description}}</div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examInfo',
  data() {
    return {
      examInfo: {
        courseid: this.$route.params.courseid
      }
    }
  },
  mounted(){
    // 获取试卷详情
    this.GetExamination()
  },
  components: {
  },
  methods: {
    // 获取试卷详情
    GetExamination(){
      this.$http.get('/API/Exam/ExaminationPaper.ashx?command=GetExaminationByExamId&examinationid='+this.$route.params.courseid+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.examInfo = res.body.dataList[0] || {}
      })
    }
  }
}
</script>
<style lang="scss">
.examInfo{
  .sh-exam-info{
    .tit{
      padding: 0 30px;
      font-size: 28px;
      color: #333333;
      font-weight: 400;
      border-bottom: 1px solid #e5e5e5;
      height: 90px;
      line-height: 90px;
    }
    .sh-exam-info-l{
      width: 780px;
      float: left;
      background: #ffffff;
      height: 370px;
      position: relative;
      .info{
        padding: 30px;
        p{
          font-size: 18px;
          color: #666666;
          line-height: 45px;
        }
        a.btn{
          position: absolute;
          right: 30px;
          bottom: 44px;
        }
      }
    }
    .sh-exam-info-r{
      width: 380px;
      float: right;
      background: #ffffff;
      min-height: 370px;
      .con{
        font-size: 18px;
        color: #666666;
        padding: 20px 25px;
        line-height: 34px;
      }
    }
  }
}
</style>

