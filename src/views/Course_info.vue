<template>
  <div class="classinfo">
    <div class="container">
      <!-- 面包屑 -->
      <div class="sh-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{CourseInfo.courseType}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{CourseInfo.courseName}}</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sh-classinfo-01">
        <div class="sh-classinfo-01-l">
          <!-- <img :src="GLOBAL.webUrl+CourseInfo.logoUrl" alt=""> -->
          <el-image
            style="width: 400px; height: 268px"
            :src="GLOBAL.webUrl+CourseInfo.logoUrl"
            fit="none"></el-image>
        </div> 
        <div class="sh-classinfo-01-r">
          <div class="tit">{{CourseInfo.courseName}}</div>
          <div class="desc-info">
            <el-row>
              <el-col :span="6">授课老师：{{CourseInfo.teacherName}}</el-col>
              <el-col :span="7">教程程度：{{CourseInfo.courseType}}</el-col>
              <el-col :span="5">所需基础：入门</el-col>
              <el-col :span="4">课时: {{CourseInfo.totalNum}}课时</el-col>
            </el-row>
          </div>
          <div class="desc-info">
            <el-row>
              <el-col :span="8">课程归类：{{CourseInfo.courseType}}</el-col>
              <!-- <el-col :span="8">学习分数：{{studypoints ? studypoints: '0' }} 分</el-col>
              <el-col :span="8">考试分数: {{exampoints ? exampoints : '0'}} 分</el-col>
              <el-col :span="8">学习总时长: {{studytimes ? studytimes : '0'}} 分钟</el-col> -->
            </el-row>
          </div>
          <div class="progress">
            <div class="progress-box"><el-progress :percentage="Shedule.percentage"></el-progress></div>
            <div class="progress-txt">已完成：{{Shedule.completeNum}} / {{Shedule.totalNum}}课时</div>
          </div>
          <div class="start">
            <!-- <a href="#" class="btn btn-hover">继续学习</a> -->
            <!-- <span class="btn btn-hover">去考试</span> -->
            <router-link :to="{name:'userfinish'}">
              <span class="btn btn-hover">去考试</span>
            </router-link>
          </div>
        </div> 
        <div style="clear:both"></div>
      </div>      
      <!-- 第一学期  第二学期 -->
      <div class="sh-classinfo-02">
        <div class="sh-classinfo-02-l">
          <p class="null-con" v-if="CourseInfo.periodList.length == 0">暂无内容</p>
          <el-tabs v-if="CourseInfo.periodList.length > 0" v-model="hoverPeriodname" @tab-click="GetCourseWare">
            <el-tab-pane v-for="item in CourseInfo.periodList" :key="item.id" :label="item.periodName" :name="'period'+item.periodId">
              <!-- 第一学期 -->
              <div class="sh-semester-class" v-if="item.periodId !== 'question' && item.periodId !== 'message'">
                <div class="sh-class-item" v-for="ware in CourseWare" :key="ware.id">
                  <div @click="open(ware)" :class="{'sh-class-item-l':true, video:ware.fileType=='视频', ppt:ware.fileType == 'PPT', pdf:ware.fileType == 'PDF', word:ware.fileType == 'WORD' }">{{ware.fileName}}</div>
                  <div class="sh-class-item-r">
                    <span style="font-size:16px;margin-right:10px;color:#999999">{{ware.schedule}}</span>
                    <span v-if="ware.schoolworkPaperList && ware.schoolworkPaperList.length > 0" style="font-size:16px;">
                      <router-link
                        :to="{
                          name:'schoolwork', 
                          params: {schoolworkPaperId: ware.schoolworkPaperList[0].schoolworkPaperId},
                          query:{
                            'pageuse': ware.schoolworkPaperList[0].workState,
                            'fileName': ware.fileName,
                            'questionscount': ware.questionsCount
                          }
                        }">
                      {{ware.schoolworkPaperList[0].workState == '已作完' ? '查看作业' : ware.schoolworkPaperList[0].workState}}
                      </router-link>
                    </span>
                    <span v-if="!ware.schoolworkPaperList || ware.schoolworkPaperList.length == 0" style="font-size:16px;">
                      无作业
                    </span>
                    <!-- <span style="font-size:16px;" v-if="!ware.totaltime">0分钟</span> -->
                  </div>
                </div>
                <!-- <div class="sh-class-item">
                  <div class="sh-class-item-l">L1:草图编辑</div>
                  <div class="sh-class-item-r">00:00:00</div>
                </div>
                <div class="sh-class-item">
                  <div class="sh-class-item-l">L1:草图编辑</div>
                  <div class="sh-class-item-r">00:00:00</div>
                </div> -->
              </div>

              <!-- 答疑解惑 -->
              <div class="qa-container" v-if="item.periodId == 'question'">
                <div class="qa-textarea">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="qa.question"
                    maxlength="100"
                    show-word-limit
                  >
                  </el-input>
                  <button class="btn btn-hover">提交</button>
                </div>
                <div style="clear:both"></div>
                <div class="qa-list" v-for="(item,index) in qaList" :key="index">
                  <p>全部问答  {{qaPageConfig.total}}</p>
                  <div class="qa-item">
                    <div class="Q">
                      Q：{{item.contect}}
                    </div>
                    <div class="A" v-for="(a, aindex) in item.answerVoList" :key="aindex">
                      A：{{a.contect}}
                    </div>
                  </div>
                </div>

                <div class="pagination">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    prev-text= "上一页"
                    next-text= "下一页"
                    :page-size="qaPageConfig.pageSize"
                    :current-page="qaPageConfig.pageNum"
                    @current-change="changePageQA"
                    :total="qaPageConfig.total">
                  </el-pagination>
                </div>
              </div>

              <!-- 留言评论 -->
              <div v-if="item.periodId == 'message'">
                留言评论
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="第二学期" name="second">
            </el-tab-pane> -->
          </el-tabs>
        </div>
        <div class="sh-classinfo-02-r">
          <div class="tit">课程简介</div>
          <div class="desc">{{CourseInfo.description}}</div>
        </div>
        <div style="clear:both"></div>
      </div>      
    </div>

    <el-dialog 
      width="100%" 
      height="100%"
      top="0vh" 
      custom-class="video" 
      style="height:100%;margin-top:0!important;" 
      :before-close="SetCourseWareStudySchedule" 
      :visible.sync="dialogTableVisible" 
      :destroy-on-close="true">
      <div id="video" :style="{height: clientHeight + 'px'}"></div>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'pdfobject'

export default {
  name: 'classinfo',
  data() {
    return {
      hoverPeriodname: 'period',
      CourseInfo: {
        courseType: '',
        periodList: []
      },
      clientHeight: 650,
      // 学期列表
      CoursePeriod: [],
      // 学期下的数据
      CourseWare:[],
      dialogTableVisible: false,
      // 当前观看的视频
      selectVideoItem:{},
      actuallytime:0,
      // 定时器
      timer: null,
      periodid: null,
      // 进度
      Shedule:{},
      exampoints:'',
      studypoints:'',
      currentTab:{index:0},
      // GetCourseStudyTimes
      // 学习总分数
      studytimes: 0,


      // 问答相关
      qaList:[],
      qa:{
        question: ''
      },
      qaPageConfig:{
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  mounted(){
    // 详细信息及获取学期
    this.GetCourseInfo(this.$route.params.courseid)
    this.getClientHeight()
  },
  components: {
  },
  methods: {
    // 考试成绩
    GetExaminationPoints(){
      this.$http.get('/API/Exam/StudentsExamination.ashx?command=GetExaminationPoints&courseid='+this.CourseInfo.id+'&periodid='+this.periodid+'&majorid='+this.GLOBAL.MajorId+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        console.info('res.body.exampoints===', res.body.exampoints)
        this.exampoints = res.body.exampoints
      })
    },
    // 获取学习分数
    GetCourseStudyPoints(){
      this.$http.get('/API/Study/Course.ashx?command=GetCourseStudyPoints&majorid=' + this.$route.query.majorid + '&courseid='+this.CourseInfo.id+'&periodid='+this.periodid+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        console.info('res.body.studypoints===', res.body.studypoints)
        this.studypoints = res.body.studypoints
      })
    },
    // 获取窗口可视高度
    getClientHeight(){
      if(document.body.clientHeight&&document.documentElement.clientHeight){
        this.clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      } else{
        this.clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      }
      console.info('this.clientHeight', this.clientHeight)
    },

    // 详细信息
    GetCourseInfo(courseid){
      // console.info('courseid', courseid)
      if(!courseid) return
      let THIS = this
      this.$http.post('/api/courseDetail/courseDetail',{
        "majorId": this.$route.query.majorId,
        "courseId": courseid,
        "studentId": this.GLOBAL.studentId
      }).then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        this.CourseInfo = res.body.data

        // 添加答疑解惑
        this.CourseInfo.periodList.push({
          periodId: 'question',
          periodName: "答疑解惑"
        })
        // 留言评论
        this.CourseInfo.periodList.push({
          periodId: 'message',
          periodName: "留言评论"
        })


        // CourseInfo.periodList---学期列表
        if(this.CourseInfo.periodList && this.CourseInfo.periodList.length > 0) {
          this.hoverPeriodname = 'period'+this.CourseInfo.periodList[0].periodId
          // 课件列表  periodid(学期id)
          THIS.GetCourseWare({index:0})
          // 学习总时长
          // this.GetCoursePeriodByCourseId();
          this.periodid = this.CourseInfo.periodList[0].periodId
        }
      })
    },
    // 课件列表  periodid(学期id)
    GetCourseWare(tab){
      // 当前选中的学期对象
      this.currentTab = tab
      let THIS = this


      // 课程id
      let periodId = this.CourseInfo.periodList[tab.index].periodId
      this.periodid = periodId
      console.info('this.periodid',  this.periodid)
      if(this.periodid == 'question'){
        // 获取问答列表
        this.getquestionAnswer()
      }else if(this.periodid == 'message'){
        // 获取留言列表
        // /api/questionAnswer/list
      }else{
        // 获取课程列表
        // console.info('periodid', periodid)
        this.findWareList(periodId)

        // 获取学习分数
        // this.GetCourseStudyPoints(periodid)

        // 获取考试成绩
        // this.GetExaminationPoints(periodid)
      }
    },
    GetCoursePeriodByCourseId(){
      this.$http.get('/API/Study/Course.ashx?command=GetCourseStudyTimes&courseid='+this.$route.params.courseid+'&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        // 总学时
        this.studytimes = res.body.studytimes
      })
    },
    open(ware){
      console.info('ware', ware)
      this.selectVideoItem = ware
      let playDom = ''
      // 视频观看定时器
      let _this = this
      this.timer = setInterval(function(){
        _this.actuallytime += 1
      },1000)
      if(ware.filetype != '视频' && ware.filetype != 'PDF'){
        playDom = `<iframe src="https://view.officeapps.live.com/op/view.aspx?src=${ware.fileurl}" scrolling="auto" frameborder="0"  style="width: 100%;height: 100%;min-height:${this.clientHeight-150}px;"></iframe>`
        this.$alert(playDom, ware.filetname, {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true,
          callback: action => {
            // console.info('action===',action)
            // 移除元素
            document.getElementsByClassName('el-message-box__wrapper')[0].remove();
            this.SetCourseWareStudySchedule()
          }
        });
      }else if(ware.filetype == 'PDF'){
        this.dialogTableVisible = true
        let options = {
          //禁用工具栏代码
          pdfOpenParams: { 
            zoom: '120',
            scrollbars: 0, 
            toolbar: 0, 
            statusbar: '0'
          },  
          width: "100%",
          height: "100%"   
        }; 

        setTimeout(function(){
          pdf.embed(ware.fileurl, "#video", options);  
        }, 300)
      } else {
        // 视频
        this.dialogTableVisible = true
        let fileType = ware.fileurl.substring(ware.fileurl.length-3,ware.fileurl.length);
        setTimeout(function(){
          var videoObject = {
            container: '#video', //容器的ID或className
            variable: 'player', //播放函数名称
            //loop: true, //播放结束是否循环播放
            autoplay: true,//是否自动播放
            timeScheduleAdjust: 5, 
            // poster: 'material/poster.jpg', //封面图片
            //flashplayer:true,
            //live:true,
            //debug:true,
            wh:'16:9',
            video:[
                [ware.fileurl, 'video/'+fileType, '中文标清', 0],
            ]
          };
          var player = new ckplayer(videoObject);
        }, 500)
        // playDom = `<video src="${ware.fileurl}" width="100%" height="92%" style="max-width:100%;max-height:100%" controls="controls">
        //         您的浏览器不支持 video 标签。
        //         </video>`
      }
      
    },
    getquestionAnswer(){
      // 获取问答列表
      this.$http.post('/api/questionAnswer/list', {
        "pageNum": this.qaPageConfig.pageNum,
        "pageSize": this.qaPageConfig.pageSize,
        "topicId": this.$route.params.courseid
      }).then(function(res){
        console.info('res.data', res.data)
        this.qaList = res.data.data.rows || []
        this.qaPageConfig.total = res.data.data.total
      })
    },
    changePageQA(val){
      // QA分页查询
      this.pageNum = val
      this.getquestionAnswer()
    },
    findWareList(periodId){
      // 获取课程列表
      let THIS = this
      this.$http.post('/api/courseDetail/findWareList', {
        'majorId': THIS.$route.query.majorId,
        'periodId': periodId,
        'courseId': this.$route.params.courseid,
        'studentId': THIS.GLOBAL.studentId
      }).then(function (res) {
        this.CourseWare = res.body.data || []

        // 查询学习进度
        setTimeout(function(){
          THIS.$http.post('/api/courseDetail/getStudySchedule', {
            'majorId': THIS.$route.query.majorId,
            // 'periodId': periodId,
            'courseId': THIS.$route.params.courseid,
            'studentId': THIS.GLOBAL.studentId
          }).then(function (res) {
            THIS.Shedule = res.data.data
            if(THIS.Shedule.completeNum == 0 ){
              THIS.Shedule.percentage = 0
            }else{
              THIS.Shedule.percentage =  parseInt(THIS.Shedule.completeNum / THIS.Shedule.totalNum * 100) 
            }
            // console.info('res.body', res.body)
          })
        },300)
      })
    },
    // 设置课件学习进度
    SetCourseWareStudySchedule(done){
      clearInterval(this.timer);
      console.info('this.actuallytime', this.actuallytime)
      if(!this.actuallytime) {
        if(done()) done();
        return
      }
      let actuallytime = parseInt(this.actuallytime / 60)
      if(actuallytime < 1) actuallytime = 1
      // console.info('this.selectVideoItem', this.selectVideoItem)
      // console.info('actuallytime', actuallytime)
      let _this = this
      this.$http.post('/api/courseDetail/saveStudySchedule', {
        'actuallyTime': actuallytime,
        'courseId': this.$route.params.courseid,
        'majorId': this.$route.query.majorId,
        'periodId': this.selectVideoItem.periodId,
        'studentId': this.GLOBAL.studentId,
        'wareId': this.selectVideoItem.wareId
      }).then(function (res) {
        console.info('res.body', res.body)
        if(res.body.state == 'success'){
          // 更新当前详情
          _this.GetCourseWare(_this.currentTab)
        }
      })
      if(done()) done();
    }
  }
}
</script>
<style lang="scss">
.classinfo{
  .sh-classinfo-01{
    padding: 20px;
    background: #ffffff;
    .sh-classinfo-01-l{
      // width: 500px;
      // height: 335px;
      width: 400px;
      height: 268px;
      float: left;
      margin-right: 40px;
      background-color: #d3dce6;
      img{
        max-width: 100%;
      }
    }
    .sh-classinfo-01-r{
      width: 700px;
      float: left;
      .tit{
        font-size: 32px;
        height: 32px;
        margin: 20px 0 30px 0;
        color: #333333;
      }
      .desc-info{
        font-size: 18px;
        color: #666666;
        font-weight: 400;
        .el-col{
          margin-bottom: 20px;
        }
      }
      // 进度条
      .progress{
        height: 50px;
        .progress-box{
          width: 306px;
          float: left;
          padding: 6px 0 0 0;
          .el-progress-bar__outer{
            height: 9px!important;
          }
          .el-progress-bar__inner{
            background-color: #3333ff;
          }
          .el-progress__text{
            font-size: 16px;
            color: #333333;
            font-weight: 400;
            padding-left: 5px;
          }
        }
        .progress-txt{
          font-size: 16px;
          color: #333333;
          width: 230px;
          float: left;
          padding-left: 60px;
        }
      }
      .start{
        .btn{
          width: 257px;
          text-align: center;
        }
      }
    }
  }

  // 课程介绍 
  .sh-classinfo-02{
    clear: both;
    margin-top: 30px;
    .sh-classinfo-02-l{
      padding: 0 30px;
      width: 750px;
      min-height: 180px;
      background: #ffffff;
      float: left;
      .null-con{
        font-size: 18px;
        font-weight: 400;
        color: #999999;
        margin-top: 20px;
      }
      .el-tabs__item{
        font-size: 18px;
        font-weight: 400;
        &:hover{
          color: #3333ff;
        }
        // padding: 0 50px 0 30px!important;
      }
      .el-tabs__item.is-active{
        height: 50px;
        line-height: 50px;
        color: #3333ff;
      }
      .el-tabs__active-bar{
        // padding: 0 30px!important;
        background-color: #3333ff;
      }
      .el-tabs__nav-wrap::after{
        background-color: none;
        height: 1px;
      }
    }
    .sh-classinfo-02-r{
      float: left;
      width: 410px;
      margin-left: 20px;
      background: #ffffff;
      .tit{
        height: 50px;
        line-height: 50px;
        padding: 0 30px;
        border-bottom: 1px solid #bcbcbc;
        color: #333333;
        font-size: 18px;
      }
      .desc{
        padding: 30px 30px 70px 30px;
        font-size: 18px;
        color: #999999;
        line-height: 30px;
        text-indent: 2em;
      }
    }

    .sh-semester-class{
      padding: 0 0 60px 0;
      min-height: 86px;
      .sh-class-item{
        clear: both;
        padding: 0 10px;
        // height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #333333;
        margin: 10px 0;
        &:hover{
          background: rgba(51, 51, 255, 0.15);
          color: #2121bc;
          .sh-class-item-l{
            &::before{
              background: url(../assets/img/tit-v.png) no-repeat;
            }
          }
          .video{
            &::before{
              background: url(../assets/img/tit-v.png) no-repeat!important;
            }
          }
          .ppt{
            &::before{
              background: url(../assets/img/tit-p.png) no-repeat!important;
            }
          }
          .pdf{
            &::before{
              background: url(../assets/img/tit-pdf.png) no-repeat!important;
            }
          }
          .word{
            &::before{
              background: url(../assets/img/tit-w.png) no-repeat!important;
            }
          }
        }
        .sh-class-item-l{
          width: 65%;
          float: left;
          position: relative;
          padding: 0 0 0 37px;
          cursor: pointer;
          &::before{
            content: '';
            width: 18px;
            height: 18px;
            position: absolute;
            left: 0;
            top: 9px;
          }
        }
        .video{
          &::before{
            background: url(../assets/img/tit-v-default.png) no-repeat!important;
          }
        }
        .ppt{
          &::before{
            background: url(../assets/img/tit-p-default.png) no-repeat!important;
          }
        }
        .pdf{
          &::before{
            background: url(../assets/img/tit-pdf-default.png) no-repeat!important;
          }
        }
        .word{
          &::before{
            background: url(../assets/img/tit-w-default.png) no-repeat!important;
          }
        }
        .sh-class-item-r{
          width: 30%;
          float: right;
          text-align: right;
          span{
            display: inline-block;
            width: 4em;
            cursor: pointer;
          }
        }
      }
    }
  }
}

// 弹窗
.el-message-box{
  width: 100%!important;
  // max-width: 1200px;
  min-height:100%;
}

.el-dialog{
  width: 100%!important;
  // max-width: 1200px;
  min-height: 100%;
  max-width: 100%;
}
#video{
  height: 100%;
  width: 100%;
}

// 答疑解惑
.qa-container{
  padding: 10px 0 30px 0;
  .qa-textarea{
    .el-textarea__inner{
      min-height: 110px!important;
    }
    .btn{
      float: right;
      margin-top: 10px;
    }
  }
  .qa-list{
    margin-top: 10px;
    .qa-item{
      margin: 10px 0 5px 0;
      .Q{
        font-size:16px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      .A{
        font-size:16px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:30px;
      }
    }
  }
}
</style>

