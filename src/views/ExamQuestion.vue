<template>
  <div class="examQuestion">
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

      <div class="sh-examquestion">
        <!-- 题目类型 -->
        <div class="sh-examquestion-info">
          <div class="nav">
            <span class="q-type">{{examCon.questionType}}题</span>
            <span class="q-back">
              <router-link :to="{name:'userfinish'}">返回 ></router-link>
            </span>
          </div>
        </div>
        
        <!-- 题目 -->
        <div class="sh-examquestion-con">
            <div class="q-name">{{examCon.orderValue}}、{{examCon.question}}</div>
            <div class="q-list">
              <p><el-radio v-model="selectedAnswer" label="A">A: {{examCon.option1}}</el-radio><span v-if="$route.query.pageuse=='see' && examCon.answer=='A'" class="answer">正确答案 A: {{examCon.option1}}</span></p>
              <p><el-radio v-model="selectedAnswer" label="B">B: {{examCon.option2}}</el-radio><span v-if="$route.query.pageuse=='see' && examCon.answer=='B'" class="answer">正确答案 B: {{examCon.option2}}</span></p>
              <p v-if="examCon.questionType == '单选'"><el-radio v-model="selectedAnswer" label="C">C: {{examCon.option3}}</el-radio><span v-if="$route.query.pageuse=='see' && examCon.answer=='C'" class="answer">正确答案 C: {{examCon.option3}}</span></p>
              <p v-if="examCon.questionType == '单选'"><el-radio v-model="selectedAnswer" label="D">D: {{examCon.option4}}</el-radio><span v-if="$route.query.pageuse=='see' && examCon.answer=='D'" class="answer">正确答案 D: {{examCon.option4}}</span></p>
            </div>
            <div class="q-progress">
              <el-progress :percentage="progress" :text-inside="true" :color="customColor" :format="format"></el-progress>
            </div>
            <div class="q-curent">
              <el-row type="flex"  justify="space-between">
                <el-col :span="6" class="prev">
                  <span v-if="examCon.orderValue !== 1 && examCon.orderValue !== 0" @click="GetPrev">上一题</span>
                </el-col>
                <el-col :span="6">{{examCon.orderValue}}/{{$route.query.questionscount}}</el-col>
                <el-col :span="6" class="next">
                  <span v-if="examCon.orderValue != $route.query.questionscount"  @click="GetNext">下一题</span>
                  <span v-if="examCon.orderValue == $route.query.questionscount"  @click="submitExam">交卷</span>
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
  name: 'examQuestion',
  data() {
    return {
      examCon: {},
      selectedAnswer: null,
      customColor: '#3333ff',
      progress: 0
    }
  },
  mounted(){
    this.getFirst()
  },
  components: {
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    format(percentage) {
      return percentage === 100 ? '' : ``;
    },
    // 获取试卷第一题
    getFirst(){
      // 
      this.$http.post('/api/examPaper/getFirst',{
        'examId': this.$route.params.examId,
        'studentId': this.GLOBAL.studentId
      }).then(function (res) {
        this.examCon = res.body.data || {}
        this.progress = (this.examCon.orderValue) * 100 / this.$route.query.questionscount
        this.selectedAnswer = null
        if(this.$route.pageuse == 'see') this.selectedAnswer = this.examCon.selectedAnswer
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.post('/api/examPaper/getCurrentAnswer', {
            'examId': this.$route.params.examId,
            'questionId': this.examCon.examQuestionId,
            'userId': + this.GLOBAL.studentId
          }).then(function (res) {
            this.selectedAnswer = res.body.data.selectdAnswer || ''
            // console.info('this.selectedAnswer',this.selectedAnswer)
          })
        }
      })
    },
    // 获取试卷下一题
    GetNext(){
      if(!this.selectedAnswer){
        this.$message.error('选择答案不能为空');
        return
      }
      
      this.$http.post('/api/examPaper/getNext',{
        'examId': this.$route.params.examId,
        'questionId': this.examCon.examQuestionId,
        'selectedAnswer': this.selectedAnswer,
        'userId': + this.GLOBAL.studentId
      }).then(function (res) {
        if(res.body.code != 0){
          this.$message.error(res.body.msg || '获取下一题失败');
          return
        }
        this.examCon = res.body.data || {}
        this.progress = (this.examCon.orderValue) * 100 / this.$route.query.questionscount
        this.selectedAnswer = null
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.post('/api/examPaper/getCurrentAnswer', {
            'examId': this.$route.params.examId,
            'questionId': this.examCon.examQuestionId,
            'userId': + this.GLOBAL.studentId
          }).then(function (res) {
            this.selectedAnswer = res.body.data.selectdAnswer || ''
            // console.info('this.selectedAnswer',this.selectedAnswer)
          })
        }
      })
      
    },
    // 获取试卷上一题
    GetPrev(){
      this.$http.post('/api/examPaper/getPrev',{
        'examId': this.$route.params.examId,
        'questionId': this.examCon.examQuestionId,
        'userId': + this.GLOBAL.studentId
      }).then(function (res) {
        this.examCon = res.body.data || {}
        console.info('this.examCon', this.examCon)
        this.progress = (this.examCon.orderValue) * 100 / this.$route.query.questionscount
        // console.info('this.progress', this.progress)
        this.selectedAnswer = this.examCon.selectdAnswer || null
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.post('/api/examPaper/getCurrentAnswer', {
            'examId': this.$route.params.examId,
            'questionId': this.examCon.examQuestionId,
            'userId': + this.GLOBAL.studentId
          }).then(function (res) {
            this.selectedAnswer = res.body.data.selectdAnswer || ''
            // console.info('this.selectedAnswer',this.selectedAnswer)
          })
        }
      })
    },
    // 提交试卷
    submitExam(){
      this.$http.post('/api/examPaper/submit',{
        'examId': this.$route.params.examId,
        'userId': + this.GLOBAL.studentId
      }).then(function (res) {
        console.info('res', res)
        if(res.status == 200){
          this.$router.push({name: 'examSubmit', query:{type:this.$route.query.type,currentPageName: this.$route.query.currentPageName}})
        }else{
          this.$message.error('提交失败');
          return
        }
      })
    }
  }
}
</script>
<style lang="scss">
.examQuestion{
  min-height: 520px;
  .sh-examquestion{
    background: #ffffff;
    .sh-examquestion-info{
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 30px;
      font-size: 20px;
      .q-type{
        color: #3333ff;
      }
      .q-back{
        color: #333333;
        float: right;
        a{
          color: #333333;
        }
      }
    }

    .sh-examquestion-con{
      padding: 30px;
      .q-name{
        line-height: 30px;
        font-size: 20px;
        color: #333333;
        margin-bottom: 2px;
      }
      .q-list{
        p{
          margin: 20px 0;
          font-size: 18px;
          color: #333333;
          position: relative;
          .el-radio__inner{
            border-color: #3333ff;
          }
          .answer{
            position: absolute;
            right: 0;
            border: 0;
            color: red;
          }
          .is-checked{
            .el-radio__inner{
              background: #3333ff;
            }
            .el-radio__label{
              color: #3333ff;
            }
          }
        }
      }
      .q-curent{
        text-align: center;
        padding-top:30px;
        font-weight: 22px;
        color: #333333;
        .prev{
          text-align: left;
          color: #3333ff;
          cursor: pointer;
        }
        .next{
          text-align: right;
          color: #3333ff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

