<template>
  <div class="home">
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
            :label="item.majorname" 
            :name="'name'+item.id">

            <!-- 视频 -->
            <div class="sh-video-tab">
              <el-tabs v-model="activeVideoType" @tab-click="handleClick">
                <!--专业课程 基础课程 -->
                <el-tab-pane v-for="(citem, index) in CourseList" :key="index" :label="citem.typename" :name="'activeVideoType'+index">
                  <!-- 视频 -->
                  <div class="sh-video">
                    <el-row :gutter="20">
                      <el-col :span="6" v-for="clist in citem.children" :key="clist.id">
                        <router-link :to="{name:'courseInfo', params: {courseid: clist.id}, query: {majorid: item.id}}" target="_blank">
                          <div class="grid-content bg-purple">
                            <img :src="clist.logo_url" :alt="clist.coursename">
                          </div>
                          <!-- tit-v  tit-p tit-w -->
                          <div class="tit ">{{clist.coursename}}</div>
                          <!-- <div class="desc">授课老师：杨华</div> -->
                        </router-link>
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
  name: 'home',
  data() {
    return {
      activeNavName: 'name1',
      activeVideoType: 'activeVideoType0',
      menuid: null,
      BannerList:[],
      CourseList: [],
      MajorList: []
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 切换专业选项卡
    changeCourse(tab, event) {
      // console.log('tab', tab);
      // console.log('event', event);
      this.GetCourseList(this.MajorList[tab.index].id)
    },
    GetBanner(){
      this.$http.get('/API/Advertisement.ashx?command=GetBanner').then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        this.BannerList = res.body.dataList || []
        // console.info('this.BannerList', this.BannerList)
      })
    },
    // 课程列表
    GetCourseList(menuid){
      if(!menuid) return;
      this.$http.get('/API/Index.ashx?command=GetCourseListByMajorId&majorid=' + menuid).then(function (res) {
        // res.body = this.formatterNavVal(res.body, 'shipcompany')
        this.CourseList = res.body.dataList
        // console.info('this.CourseList', res.body)
        if(this.CourseList && this.CourseList.length > 0) this.CourseList = this.formatterTagType(this.CourseList, 'coursetype')
        this.activeVideoType = 'activeVideoType0'
        //  console.info('this.CourseList', this.CourseList)
      })
    },
    // 专业列表
    GetMajorList(){
      this.$http.get('/API/Index.ashx?command=GetMajorList').then(function (res) {
        this.MajorList = res.body.dataList
        if(this.MajorList[0].id){
          this.activeNavName = 'name'+this.MajorList[0].id
          this.GetCourseList(this.MajorList[0].id)
        }
        // console.info('this.MajorList', this.MajorList[0].majorname)
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
// menu菜单
.sh-menu{
  // height: 60px;
  // overflow: hidden;
  margin: 60px 0;
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
      height: 214px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .tit{
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      color: #333333;
      background: #ffffff;
      overflow: hidden;
      padding: 0 30px 0 10px;
      a{
        color: #333333;
        display: inline-block;
      }
      &:hover{
        color: #3333ff;
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
}
</style>

