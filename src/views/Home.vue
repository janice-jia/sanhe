<template>
  <div class="home">
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
      <div class="sh-hot">热门课程</div>
      <div class="sh-menu">
        <el-tabs v-model="activeNavName" type="card" @tab-click="changeCourse">
          <el-tab-pane 
            v-for="item in MajorList" 
            :key="item.majorId" 
            :label="item.name" 
            :name="'name'+item.majorId">

            <!-- 视频 -->
            <div class="sh-video-tab">
              <el-tabs v-model="activeVideoType" @tab-click="handleClick">
                <!--专业课程 基础课程 -->
                <el-tab-pane v-for="(citem, index) in CourseList" :key="index" :label="citem.typename" :name="'activeVideoType'+index">
                  <!-- 视频 -->
                  <div class="sh-video">
                    <el-row :gutter="20">
                      <el-col :xs="12" :sm="12" :lg="{span: '4-8'}"  v-for="clist in citem.children" :key="clist.id">
                        <router-link :to="{name:'courseInfo', params: {courseid: clist.courseId}, query: {majorId: clist.majorId}}" target="_blank">
                          <div class="grid-content bg-purple">
                            <!-- <img :src="GLOBAL.webUrl+clist.logoUrl" :alt="clist.logoUrl"> -->
                            <el-image
                              style="width: 220px; height: 147px"
                              :src="GLOBAL.webUrl+clist.logoUrl"
                              fit="none"></el-image>
                          </div>
                          <!-- tit-v  tit-p tit-w -->
                          <div class="tit">{{clist.courseName}}</div>
                          <div class="type">授课类型：{{clist.courseType}}</div>
                          <!-- <div class="teacher">授课老师：{{clist.teacherName}}</div> -->
                        </router-link>
                        <div class="btn">
                          <button v-if="clist.isSignUp == 1" @click="changeSignUp(clist)">定制</button>
                          <button v-if="clist.isSignUp == 0" @click="changeSignUp(clist)" class="gray">已定制</button>
                        </div>
                        <!-- <div class="desc">授课老师：杨华</div> -->
                        
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <!-- 排行榜 -->
      <div class="sh-hot">排行榜</div>
      <div class="sh-video-tab rankList">
        <el-tabs v-model="activeHotName" @tab-click="handleClick">
          <!-- 学习时长排名   start -->
          <el-tab-pane label="学习时长排名" name="first">
            <el-row>
              <el-col :span="12">
                <!-- 昨日 -->
                <p class="tit"><span class="blue">今日学习时长排行榜</span><span>（仅展示部分排名靠前学生）</span></p>
                <table style="width:80%" class="rankTable">
                  <colgroup>
                    <col style="width:30%">
                    <col style="width:12%">
                    <col style="width:38%">
                    <col style="width:20%">
                  </colgroup>
                  <thead>
                    <th align="left">排名数值</th>
                    <th></th>
                    <th align="left">昵称</th>
                    <th align="right">学习时长</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in todayList" :key="i">
                      <td :class="{first:i == 0, second:i == 1, third:i == 2, pl17:i > 2}">
                        <span v-if="i > 2">{{i}}</span>  
                      </td>
                      <td>
                        <el-avatar size="large" src="circleUrl">
                          {{item.studentName}}
                        </el-avatar>
                      </td>
                      <td>
                        <p>{{item.studentName}}</p>
                      </td>
                      <td align="right">{{item.totalTime}} 分钟</td>
                    </tr>
                  </tbody>
                </table>
                <p class="nullCon" v-if="!todayList || todayList.length == 0">暂无数据</p>
              </el-col>
              <el-col :span="12">
                <p class="tit">昨日学习时长排行榜<span>（仅展示部分排名靠前学生）</span></p>
                <table style="width:80%" class="rankTable">
                  <colgroup>
                    <col style="width:30%">
                    <col style="width:12%">
                    <col style="width:38%">
                    <col style="width:20%">
                  </colgroup>
                  <thead>
                    <th align="left">排名数值</th>
                    <th></th>
                    <th align="left">昵称</th>
                    <th align="right">学习时长</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in yestodayList" :key="i">
                      <td :class="{first:i == 0, second:i == 1, third:i == 2, pl17:i > 2}">
                        <span v-if="i > 2">{{i}}</span>  
                      </td>
                      <td>
                        <el-avatar size="large" src="circleUrl">
                          {{item.studentName}}
                        </el-avatar>
                      </td>
                      <td>
                        <p>{{item.studentName}}</p>
                      </td>
                      <td align="right">{{item.totalTime}} 分钟</td>
                    </tr>
                  </tbody>
                </table>
                <p class="nullCon" v-if="!yestodayList || yestodayList.length == 0">暂无数据</p>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 学习时长排名   end -->
          <el-tab-pane label="活跃度排名" name="second">活跃度排名</el-tab-pane>
          <el-tab-pane label="课件点击率排名" name="third">课件点击率排名</el-tab-pane>
          <el-tab-pane label="最受欢迎课程排名" name="fourth">最受欢迎课程排名</el-tab-pane>
        </el-tabs>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      activeNavName: 'name1',
      activeVideoType: 'activeVideoType0',
      activeHotName:'first',
      menuid: null,
      BannerList:[],
      CourseList: [],
      MajorList: [],
      // 今日学习时长
      todayList:[],
      // 昨日学习时长
      yestodayList: [],
      // 活跃度排名
      activityList: [],
      // 受欢迎的课件
      coursePopularList:[]
    }
  },
  mounted(){
    // 幻灯片
    this.GetBanner()
    // 课程列表
    this.GetMajorList()
    // 学习时长
    this.getStudyTimeList()
    // 活跃度排名
    this.getActivityList()
    // 收欢迎的课件
    this.getCoursePopularList()
  },
  components: {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 切换专业选项卡
    changeCourse(tab, event) {
      // console.log('tab', tab);
      // console.log('event', event);
      this.GetCourseList(this.MajorList[tab.index].majorId)
    },
    GetBanner(){
      this.$http.post('/api/index/bannerList').then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        this.BannerList = res.body.data || []
        // console.info('this.BannerList', this.BannerList)
      })
    },
    // 课程列表
    GetCourseList(menuid){
      if(!menuid) return;
      this.$http.post('/api/index/courseList', {
        'majorId': menuid,
        'studentId': this.GLOBAL.studentId
      }).then(function (res) {
        this.CourseList = res.body.data.rows
        // console.info('this.CourseList', res.body)
        if(this.CourseList && this.CourseList.length > 0) {
          this.CourseList = this.formatterTagType(this.CourseList, 'courseType')
        }
        this.activeVideoType = 'activeVideoType0'
        //  console.info('this.CourseList', this.CourseList)
      })
    },
    // 定制
    changeSignUp(info){
      if(!this.GLOBAL.studentId){
        this.$message.error('请登录后定制课程！');
        return false
      }
      info.isSignUp = 0
      this.$http.post('/api/course/customized',{
        "courseId": info.courseId,
        "majorId": info.majorId,
        "studentId": this.GLOBAL.studentId
      }).then(function (res) {
        // console.info('res', res)
        if(res.status == 200){
          this.$message.success('定制成功');
        }else{
          this.$message.error(res.data.msg || '定制失败');
          info.isSignUp = 1
        }
      })
    },
    // 专业列表
    GetMajorList(){
      this.$http.post('/api/index/majorList').then(function (res) {
        this.MajorList = res.body.data
        if(this.MajorList && this.MajorList[0].majorId){
          this.activeNavName = 'name'+this.MajorList[0].majorId
          this.GetCourseList(this.MajorList[0].majorId)
        }
        // console.info('this.MajorList', this.MajorList[0].majorname)
      })
    },
    // 获取学习时长
    getStudyTimeList(){
      this.$http.post('/api/index/courseWareStudyTimeList').then(function (res) {
        this.todayList = res.body.data.todayList
        this.yestodayList = res.body.data.yestodayList
      })
    },
    // 活跃度
    getActivityList(){
      this.$http.post('/api/index/activityList').then(function (res) {
        this.activityList = res.body.data
      })
    },
    // 收欢迎的课件
    getCoursePopularList(){
      this.$http.post('/api/index/coursePopularList').then(function (res) {
        this.coursePopularList = res.body.data
      })
    },
    // 格式化分类类型二维数组
    formatterTagType(dataList,type){
      let newDataList = []
      // 1,,,,,,追加分配
      dataList.forEach(v => {
        // 判断是否有分类标识
        let isType = false;
        newDataList.forEach((nv, index) => {
          if(nv.typename == v[type]) {
            isType = true;
          }
        })
        if(!isType){
          // 新增
          newDataList.push({
            typename:v[type],
            children: []
          })
        }
      })

      // 2,,,,,,追加分类下的数据
      dataList.forEach(v => {
        // 判断是否有分类标识
        let addIndex = null;
        newDataList.forEach((nv, index) => {
          if(nv.typename == v[type]) {
            addIndex = index
          }
        })

        if(addIndex !== null){
          newDataList[addIndex].children.push(v)
        }
      });
      // console.info('newDataList======', newDataList)
      return newDataList;
    }
  }
}
</script>
<style lang="scss">
.home{
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
.sh-hot{
  padding: 30px 0;
  font-size:24px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
}

// menu菜单
.sh-menu{
  // height: 60px;
  // overflow: hidden;
  // margin: 60px 0;
  // line-height: 60px;
  // background: #ffffff;
  border-radius: 10px;
  .el-tabs__header{
    background: #ffffff;
    border-radius: 10px;
    box-shadow:5px 5px 5px rgba(0,0,0,.15);
  }
  .el-tabs__item{
    height: 60px;
    line-height: 60px;
    border: none!important;
    font-size: 24px;
    background: #ffffff;
    &:hover{
      color: #3333ff;
    }
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav{
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
    background: #3333ff;
    color: #ffffff;
  }
  .el-tabs__nav-next, .el-tabs__nav-prev{
    line-height: 60px;
    z-index: 9999;
  }
}

// 视频 
.sh-video-tab{
  .el-tabs__item{
    font-size: 20px;
    font-weight: 400;
    background: none;
    &:first-child{
      border-top-left-radius: 10px;
    }
    &:hover{
      color: #3333ff;
    }
    // padding: 0 50px 0 30px!important;
  }
  .el-tabs__item.is-active{
    color: #3333ff;
  }
  .el-tabs__active-bar{
    // padding: 0 30px!important;
    background-color: #3333ff;
  }
  .el-tabs__header{
    background: none;
    box-shadow: none;
  }
  .sh-video{
    padding: 20px 0;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
      display: flex;
      align-items: center;
      // vertical-align: middle;
      // text-align: center;
      img{
        max-width: 100%;
      }
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      height: 147px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .tit{
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      color:rgba(51,51,255,1);
      background: #ffffff;
      overflow: hidden;
      padding: 0 30px 0 10px;
      a{
        color:rgba(51,51,255,1);
        display: inline-block;
      }
      &:hover{
        color: #3333ff;
      }
    }
    .type,.teacher{
      background: #ffffff;
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      padding: 0 10px;
      line-height: 22px;
    }
    .btn{
      background: #ffffff;
      width: 100%;
      height: 50px;
      padding: 0 10px 0 10px;
      button{
        width:60px;
        height:25px;
        border: none;
        background:rgba(241,0,0,1);
        border-radius:5px;
        color: #ffffff;
        font-size: 12px;
        cursor: pointer;
        &.gray{
          background:rgba(153,153,153,1);
        }
        &.blue{
          background:#3333FF;
        }
      }
    }
    .tit-v,.tit-p,.tit-w{
      position: relative;
      &::after{
        content: "";
        width: 18px;
        height: 18px;
        right: 10px;
        top: 10px;
        position: absolute;
        
      }
    }
    .tit-v{
      &::after{
        background: url(../assets/img/tit-v.png) no-repeat;
      }
    }
    .tit-p{
      &::after{
        background: url(../assets/img/tit-p.png) no-repeat;
      }
    }
    .tit-w{
      &::after{
        background: url(../assets/img/tit-w.png) no-repeat;
      }
    }
    .desc{
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #666666;
      background: #ffffff;
      overflow: hidden;
      padding: 0 10px;
    }
  }
  .el-col-lg-4-8 {
		width: 20%;
	}
}

.rankList{
  .tit{
    font-size:22px;
    font-weight:400;
    color: #333333;
    margin-top: 40px;
    margin-bottom: 30px;
    span{
      font-size: 14px;
      &.blue{
        color:rgba(51,51,255,1);
        font-size: 22px;
      }
    }
  }

  .nullCon{
    padding: 30px 0;
    font-size: 20px;
    color: #666666;
  }
  .rankTable{
    td{
      padding: 12px 0;
    }
    th,td{
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      &.first{
        background: url(../assets/img/1.png) no-repeat 17px center;
      }
      &.second{
        background: url(../assets/img/2.png) no-repeat 17px center;
      }
      &.third{
        background: url(../assets/img/3.png) no-repeat 17px center;
      }
      &.pl17{
        padding-left: 17px;
        span{
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>

