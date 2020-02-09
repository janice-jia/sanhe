<template>
  <div class="classinfo">
    <div class="container">

      <!-- 面包屑 -->
      <div class="sh-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{CourseInfo.coursetype}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{CourseInfo.coursename}}</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sh-classinfo-01">
        <div class="sh-classinfo-01-l">
          <img :src="CourseInfo.logo_url" alt="">
        </div> 
        <div class="sh-classinfo-01-r">
          <div class="tit">{{CourseInfo.coursename}}</div>
          <div class="desc-info">
            <el-row>
              <!-- <el-col :span="8">授课老师：</el-col>
              <el-col :span="8">教程程度：</el-col>
              <el-col :span="8">所需基础：无要求</el-col> -->
              <el-col :span="8">课程归类：{{CourseInfo.coursetype}}</el-col>
            </el-row>
          </div>
          <div class="progress">
            <div class="progress-box"><el-progress :percentage="70"></el-progress></div>
            <div class="progress-txt">已完成：2/4课时</div>
          </div>
          <div class="start">
            <!-- <a href="#" class="btn btn-hover">继续学习</a> -->
            <span class="btn btn-hover">继续学习</span>
          </div>
        </div> 
        <div style="clear:both"></div>
      </div>      
      <!-- 第一学期  第二学期 -->
      <div class="sh-classinfo-02">
        <div class="sh-classinfo-02-l">
          <p class="null-con" v-if="CoursePeriod.length == 0">暂无内容</p>
          <el-tabs v-model="hoverPeriodname" @tab-click="GetCourseWare">
            <el-tab-pane v-for="item in CoursePeriod" :key="item.id" :label="item.periodname" :name="'period'+item.id">
              <!-- 第一学期 -->
              <div class="sh-semester-class">
                <div class="sh-class-item" @click="open(ware)" v-for="ware in CourseWare" :key="ware.id">
                  <div :class="{'sh-class-item-l':true, video:ware.filetype=='视频', ppt:ware.filetype == 'PPT', word:ware.filetype == 'WORD' }">{{ware.filename}}</div>
                  <div class="sh-class-item-r">00:00:00</div>
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
  </div>
</template>

<script>
export default {
  name: 'classinfo',
  data() {
    return {
      hoverPeriodname: 'period',
      CourseInfo: {
        coursetype: '',
      },
      clientHeight: 650,
      // 学期列表
      CoursePeriod: [],
      // 学期下的数据
      CourseWare:[]
    }
  },
  mounted(){
    // console.info('$state', this.$route)
    this.GetCourseInfo(this.$route.params.courseid)
    //获取学期
    this.GetCoursePeriod()
    this.getClientHeight()
  },
  components: {
  },
  methods: {
    // 获取窗口可视高度
    getClientHeight(){
      if(document.body.clientHeight&&document.documentElement.clientHeight){
        this.clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      } else{
        this.clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      }
    },

    // 详细信息
    GetCourseInfo(courseid){
      // console.info('courseid', courseid)
      if(!courseid) return
      this.$http.get('/API/Study/Course.ashx?command=GetCourseById&courseid='+courseid).then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        this.CourseInfo = res.body.data
      })
    },
    // 课件列表  periodid(学期id)
    GetCourseWare(tab){
      let periodid = this.CoursePeriod[tab.index].id
      // console.info('periodid', periodid)
      this.$http.get('/API/Study/CourseWare.ashx?command=GetCourseWareByCourseId&periodid='+periodid+'&courseid='+this.$route.params.courseid).then(function (res) {
        this.CourseWare = res.body.dataList || []
      })
    },
    // 学期列表
    GetCoursePeriod(){
      this.$http.get('/API/Study/Course.ashx?command=GetCoursePeriodByCourseId&courseid='+this.$route.params.courseid).then(function (res) {
        this.CoursePeriod = res.body.dataList || []
        if(this.CoursePeriod && this.CoursePeriod.length > 0) {
          this.hoverPeriodname = 'period'+this.CoursePeriod[0].id
          this.GetCourseWare({index:0})
        }
        console.info('this.CoursePeriod',this.CoursePeriod)
      })
    },
    open(ware){
      console.info('ware', ware)
      let playDom = ''
      var timer = setInterval(function(){

      },1000)
      if(ware.filetype != '视频'){
        playDom = `<iframe src="https://view.officeapps.live.com/op/view.aspx?src=${ware.fileurl}" scrolling="auto" frameborder="0"  style="width: 100%;height: 100%;min-height:${this.clientHeight-150}px;"></iframe>`
      } else {
        playDom = `<video src="${ware.fileurl}" width="100%" controls="controls">
                您的浏览器不支持 video 标签。
                </video>`
      }
      this.$alert(playDom, ware.filetname, {
        confirmButtonText: '关闭',
        dangerouslyUseHTMLString: true,
        callback: action => {
          // console.info('action===',action)
          // 移除元素
          document.getElementsByClassName('el-message-box__wrapper')[0].remove();
          clearInterval(timer);
        }
      });
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
      width: 500px;
      height: 335px;
      float: left;
      margin-right: 40px;
      background-color: #d3dce6;
    }
    .sh-classinfo-01-r{
      width: 600px;
      float: left;
      .tit{
        font-size: 32px;
        height: 32px;
        margin: 40px 0 30px 0;
        color: #333333;
      }
      .desc-info{
        font-size: 18px;
        color: #666666;
        font-weight: 400;
        padding-right: 60px;
        .el-col{
          margin-bottom: 20px;
        }
      }
      // 进度条
      .progress{
        height: 101px;
        padding: 24px 0 0 0;
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
            padding-left: 10px;
          }
        }
        .progress-txt{
          font-size: 16px;
          color: #333333;
          width: 200px;
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
        padding: 0 10px;
        // height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #333333;
        margin: 10px 0;
        cursor: pointer;
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
              background: url(../assets/img/tit-v-default.png) no-repeat!important;
            }
          }
          .ppt{
            &::before{
              background: url(../assets/img/tit-p.png) no-repeat!important;
            }
          }
          .word{
            &::before{
              background: url(../assets/img/tit-w.png) no-repeat!important;
            }
          }
        }
        .sh-class-item-l{
          width: 50%;
          float: left;
          position: relative;
          padding: 0 0 0 37px;
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
        .word{
          &::before{
            background: url(../assets/img/tit-w-default.png) no-repeat!important;
          }
        }
        .sh-class-item-r{
          width: 30%;
          float: right;
          text-align: right;
        }
      }
    }
  }
}

// 弹窗
.el-message-box{
  width: 92%!important;
  // max-width: 1200px;
  min-height:92%;
}
</style>

