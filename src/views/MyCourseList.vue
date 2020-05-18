<template>
  <div class="home">
    <div class="container">
      <!-- 搜索条件 -->
      <!-- 课程 -->
      <div class="sh-video-tab" style="min-height:700px">
        <!-- 视频 -->
        <div class="sh-video" style=" margin-bottom:0"  v-for="(item, i) in CourseList" :key="i">
          <p class="majorName">{{item.name}}</p>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" v-for="(clist, j) in item.courseVoList" :key="j">
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
                  <button v-if="clist.isSignUp == 0"  class="gray">已定制</button>
                </div>
                <!-- <div class="desc">授课老师：杨华</div> -->
              
            </el-col>
          </el-row>
        </div>
        <div style="clear:both"></div>
      </div>

      <div class="nullListCon" v-if="CourseList.length ==0">
        内容为空
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
    this.GetMyCourseList()
  },
  components: {
  },
  methods: {
    // 课程列表
    GetMyCourseList(menuid){
      this.$http.post('/api/course/myCourseList', {
        studentId: this.GLOBAL.studentId
      }).then(function (res) {
        this.CourseList = res.body.data
      })
    },
    // 定制
    changeSignUp(info){
      if(!this.GLOBAL.studentId){
        this.$message.error('请登录后定制课程！');
        return false
      }
      this.$http.post('/api/course/customized',{
        "courseId": info.courseId,
        "majorId": info.majorId,
        "studentId": this.GLOBAL.studentId
      }).then(function (res) {
        // console.info('res', res)
        if(res.data.code == 0){
          info.isSignUp = 0
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
.majorName{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding-left: 20px;
  color: #3333ff;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 10px;
  position: relative;
  &::before{
    content: '';
    width: 5px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 6px;
    background: #3333ff;
  }
}
</style>

