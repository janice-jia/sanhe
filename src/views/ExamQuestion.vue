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
            <span class="q-type">{{examCon.questionstype}}题</span>
            <span class="q-back">
              <router-link :to="{name:'exam'}">返回 ></router-link>
              </span>
          </div>
        </div>
        
        <!-- 题目 -->
        <div class="sh-examquestion-con">
            <!-- 题目 -->
            <div class="q-name flex-item">
              <div class="flex-item-ele">{{examCon.ordervalue}}、</div>
              <div class="flex-item-ele" v-html="examCon.question"></div>
            </div>

            <div class="q-list">
              <!-- A -->
              <div class="flex-item">
                <div class="flex-item-ele"><el-radio v-model="currentanswer" label="A">A: </el-radio></div>
                <div class="flex-item-ele" v-html="examCon.option1"></div>
              </div>
              <div class="flex-item flex-right" v-if="$route.query.pageuse=='see' && examCon.answer=='A'">
                <div class="flex-item-ele answer">正确答案 A:</div>
                <div class="flex-item-ele answer" v-html="examCon.option1"></div>
              </div>
              <!-- B -->
              <div class="flex-item">
                <div class="flex-item-ele"><el-radio v-model="currentanswer" label="B">B: </el-radio></div>
                <div class="flex-item-ele" v-html="examCon.option2"></div>
              </div>
              <div class="flex-item-ele" v-if="$route.query.pageuse=='see' && examCon.answer=='B'" >
                <div class="flex-item-ele answer">正确答案 B:</div>
                <div class="flex-item-ele answer" v-html="examCon.option2"></div>
              </div>

              <!-- C -->
              <div class="flex-item" v-if="examCon.questionstype == '单选'">
                <div class="flex-item-ele"><el-radio v-model="currentanswer" label="C">C: </el-radio></div>
                <div class="flex-item-ele" v-html="examCon.option3"></div>
              </div>
              <div class="flex-item-ele" v-if="$route.query.pageuse=='see' && examCon.answer=='C'">
                <div class="flex-item-ele answer">正确答案 C: </div>
                <div class="flex-item-ele answer" v-html="examCon.option3"></div>
              </div>

              <!-- D -->
              <div class="flex-item" v-if="examCon.questionstype == '单选'">
                <div class="flex-item-ele"><el-radio v-model="currentanswer" label="D">D: </el-radio></div>
                <div class="flex-item-ele" v-html="examCon.option4"></div>
              </div>
              <div class="flex-item-ele" v-if="$route.query.pageuse=='see' && examCon.answer=='D'">
                <div class="flex-item-ele answer">正确答案 D: </div>
                <div class="flex-item-ele answer" v-html="examCon.option4"></div>
              </div>

            </div>
            <div class="q-progress">
              <el-progress :percentage="progress" :text-inside="true" :color="customColor" :format="format"></el-progress>
            </div>
            <div class="q-curent">
              <el-row type="flex"  justify="space-between">
                <el-col :span="6" class="prev">
                  <span v-if="examCon.ordervalue !== 1 || examCon.ordervalue !== 0" @click="GetPrev">上一题</span>
                </el-col>
                <el-col :span="6">{{examCon.ordervalue}}/{{$route.query.questionscount}}</el-col>
                <el-col :span="6" class="next">
                  <span v-if="examCon.ordervalue != $route.query.questionscount"  @click="GetNext">下一题</span>
                  <span v-if="examCon.ordervalue == $route.query.questionscount"  @click="submitExam">交卷</span>
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
      currentanswer: null,
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
      this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetFirst&examinationid='+this.$route.params.examinationid+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.examCon = res.body.data || {}
        this.progress = (this.examCon.ordervalue) * 100 / this.$route.query.questionscount
        this.currentanswer = null
        if(this.$route.pageuse == 'see') this.currentanswer = this.examCon.currentanswer
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetCurrentAnswer&userid='+this.GLOBAL.CurrentUserId+'&currentid='+this.examCon.id+'&examinationid='+this.$route.params.examinationid).then(function (res) {
            this.currentanswer = res.body.data.selectedanswer || ''
            // console.info('this.currentanswer',this.currentanswer)
          })
        }
      })
    },
    // 获取试卷下一题
    GetNext(){
      if(!this.currentanswer && this.$route.query.pageuse != 'see'){
        this.$message.error('请选择答案');
        return
      }
      
      this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetNext&examinationid='+this.$route.params.examinationid+'&currentid='+this.examCon.id+'&currentanswer='+this.currentanswer+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.examCon = res.body.data || {}
        this.progress = (this.examCon.ordervalue) * 100 / this.$route.query.questionscount
        this.currentanswer = null
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetCurrentAnswer&userid='+this.GLOBAL.CurrentUserId+'&currentid='+this.examCon.id+'&examinationid='+this.$route.params.examinationid).then(function (res) {
            this.currentanswer = res.body.data.selectedanswer || ''
            // console.info('this.currentanswer',this.currentanswer)
          })
        }
      })
      
    },
    // 获取试卷上一题
    GetPrev(){
      this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetPrev&examinationid='+this.$route.params.examinationid+'&currentid='+this.examCon.id+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.examCon = res.body.dataList[0] || {}
        // console.info('this.examCon', this.examCon)
        this.progress = (this.examCon.ordervalue) * 100 / this.$route.query.questionscount
        // console.info('this.progress', this.progress)
        this.currentanswer = this.examCon.selectedanswer || null
        // 获取当前题目选项
        if(this.$route.query.pageuse == 'see'){
          this.$http.get('/API/Exam/ExaminationQuestion.ashx?command=GetCurrentAnswer&userid='+this.GLOBAL.CurrentUserId+'&currentid='+this.examCon.id+'&examinationid='+this.$route.params.examinationid).then(function (res) {
            this.currentanswer = res.body.data.selectedanswer || ''
            // console.info('this.currentanswer',this.currentanswer)
          })
        }
      })
    },
    // 提交试卷
    submitExam(){
      this.$http.get('/API/Exam/StudentsExamination.ashx?command=Submit&examinationid='+this.$route.params.examinationid+'&userid='+this.GLOBAL.CurrentUserId+'&currentid='+this.examCon.id+'&currentanswer='+this.currentanswer).then(function (res) {
        if(res.body.state == 'success'){
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
          
          .is-checked{
            .el-radio__inner{
              background: #3333ff;
            }
            .el-radio__label{
              color: #3333ff;
            }
          }
        }
        .answer{
          color: red;
        }
      }
      .flex-item{
        display: flex;
        margin:5px 0 10px 0;
        .flex-item-ele{
          padding-right: 10px;
          p{
            margin: 0!important;
            padding: 0!important;
          }
        }
      }
      .flex-right{
        justify-content:flex-end;
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

