<template>
  <div class="home">
    <div class="container">
      <!-- 搜索条件 -->
      <div class="listSearch">
        <div style="clear:both"></div>
        <el-form ref="form" style="word-break: keep-all">
          <el-form-item label="课程:" class="searchBox">
            <el-input style="width:500px" v-model="courseName" placeholder="请输入搜索词" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="GetCourseList"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="专业:">
            <!-- <span :class="{marjorText: true, marjorHover:majorId==''}" @click="majorId=''">
              全部
            </span> -->
            <span :class="{marjorText: true, marjorHover:majorId==item.majorId}" v-for="(item, i) in majorList" :key="i" @click="changeMajorId(item.majorId)">
              {{item.name}}
            </span>
          </el-form-item>
          <el-form-item label="类型:">
            <!-- <span :class="{marjorText: true, marjorHover:courseType==''}" @click="courseType=''">
              全部
            </span> -->
            <span :class="{marjorText: true, marjorHover:courseType=='基础课程'}" @click="changeCourseType('基础课程')">
              基础课程
            </span>
            <span :class="{marjorText: true, marjorHover:courseType=='专业课程'}" @click="changeCourseType('专业课程')">
              专业课程
            </span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 课程 -->
      <div class="sh-video-tab">
        <!-- 视频 -->
        <div class="sh-video">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}"  v-for="clist in CourseList" :key="clist.id">
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
                  <button v-if="clist.isSignUp == 0" class="gray">已定制</button>
                </div>
                <!-- <div class="desc">授课老师：杨华</div> -->
              
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="nullListCon" v-if="CourseList.length ==0">
        内容为空
      </div>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text= "上一页"
          next-text= "下一页"
          :page-size="pageSize"
          :current-page="pageNum"
          @current-change="changePage"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courseList',
  data() {
    return {
      CourseList: [],
      majorList: [],
      total: 0,
      majorId: '',
      courseName:'',
      pageNum: 1,
      pageSize: 20,
      courseType: '基础课程'
    }
  },
  mounted(){
    this.GetMajorList()
  },
  components: {
  },
  methods: {
    changePage(val){
      this.pageNum = val
      this.GetCourseList()
    },
    // 课程列表
    GetCourseList(menuid){
      let postParams = this.getParams()
      this.$http.post('/api/course/myCourseList',postParams).then(function (res) {
        this.CourseList = res.body.data.rows
        this.total = res.body.data.total
      })
    },
    // 专业列表
    GetMajorList(){
      this.$http.post('/api/course/majorList',{}).then(function (res) {
        this.majorList = res.body.data
        this.majorId = this.majorList[0].majorId
        // 课程列表
        this.GetCourseList()
      })
    },
    // 更改类型
    changeCourseType(val){
      this.courseType = val
      this.pageNum = 1
      this.GetCourseList()
    },
    // 更改类型
    changeMajorId(val){
      this.majorId = val
      this.pageNum = 1
      this.GetCourseList()
    },
    getParams(){
      var params = {}
      if(this.majorId) params.majorId = this.majorId
      if(this.courseName) params.courseName = this.courseName
      if(this.courseType) params.courseType = this.courseType
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      if(this.GLOBAL.studentId) params.studentId = this.GLOBAL.studentId
      return params
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
        if(res.data.code == 0){
          this.$message.success('定制成功');
        }else{
          this.$message.error(res.data.msg || '定制失败');
          info.isSignUp = 1
        }
      })
    }
  }
}
</script>
<style lang="scss">
.nullListCon{
  background: #ffffff;
  padding: 40px;
  font-size: 20px;
  margin-bottom: 40px;
}
.el-form-item__label{
  font-size:16px!important;
  font-weight:400!important;
  color:rgba(153,153,153,1)!important;
}
.pagination{
  text-align: center;
}
.marjorText{
  font-size:16px;
  font-weight:400;
  padding: 0 10px;
  color:rgba(153,153,153,1);
  cursor: pointer;
}
.marjorHover{
  background:rgba(51,51,255,1);
  border-radius:14px;
  color: #ffffff;
  display: inline-block;
  height:28px;
  line-height: 28px;
}
.listSearch{
  padding: 30px 30px 20px 30px;
  background: #ffffff;
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.15);
  border-radius:5px;
  margin: 30px 0;
  .el-form-item{
    margin-bottom: 10px!important;
  }
}
.searchBox{
  .el-input-group{
    width:500px;
    height:28px!important;
  }
  .el-input__inner{
    background:rgba(237,237,240,1)!important;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    border-right: 0!important;
    font-size:14px;
    font-weight:400;
    color:rgba(153,153,153,1);
    border: none;
  }
  .el-input-group__append, .el-input-group__prepend{
    background:rgba(237,237,240,1)!important;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    border: none;
    .el-icon-search{
      font-size: 20px;
    }
  }
}
</style>

