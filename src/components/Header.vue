<template>
  <div class="Header">
    <el-row :gutter="20" justify="space-between">
      <el-col :span="4">
        <div class="logo">
          <img src="../assets/img/logo.png" alt=""></div>
      </el-col>
      <el-col :span="14" class="nav-menu">
        <ul>
          <li :class="{hover:($route.name == 'home' || $route.path == '/')}"><router-link :to="{name:'home'}" target="_blank">首页</router-link></li>
          <li :class="{hover:$route.name == 'courseList'}"><router-link :to="{name:'courseList'}" target="_blank">课程列表</router-link></li>
          <li :class="{hover:$route.name == 'mycourseList'}"><router-link :to="{name:'mycourseList'}" target="_blank">我的课程</router-link></li>
          <li :class="{hover:$route.name == 'exam'}"><router-link :to="{name:'userfinish'}" target="_blank">考试中心</router-link></li>
          <!-- <li :class="{hover:$route.name == 'exam'}"><router-link :to="{name:'exam'}" target="_blank">考试中心</router-link></li> -->
        </ul>
      </el-col>
      <el-col :span="6" class="nav-btn">
        <router-link class="btn btn-hover" to="userfinish" target="_blank">
          个人中心
        </router-link>
        <button class="btn" @click="logout">
          退出
        </button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      hoveIndex: 0
    }
  },
  mounted(){
    if(this.$route.name == 'exam') this.hoveIndex = 1
  },
  methods: {
    logout(){
      console.info('logout')
      // 清除cookie 
      this.$cookies.remove("studentId");
      this.$cookies.remove("CurrentUserName");
      this.$cookies.remove("MajorId");
      let _this = this
      setTimeout(function(){
        _this.$router.go(0)
      },300)
    }
  }
}
</script>

<style lang="scss">
.Header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #ffffff;
  padding: 0 80px;
  .logo{
    padding: 12px 86px 0 0;
  }
  .nav-btn{
    text-align: right;
    .btn{
      margin-left: 30px;
      cursor: pointer;
      border: none;
      // &:hover{
      //   background: #3333ff;
      //   color: #ffffff;
      // }
    }
    button{
      cursor: pointer;
    }
  }
  .nav-menu{
    ul li{
      float: left;
      padding-right: 50px;
      font-size: 22px;
      color: #333333;
      cursor: pointer;
      font-weight: 400;
      a{
        color: #333333;
      }
      &:hover{
        color: #3333ff
      }
      &.hover{
        color: #3333ff;
        a{
          color: #3333ff;
        }
      }
    }
  }
}
@media screen and (max-width: 1500px) {
    .Header{
        padding: 0 40px;
    }
}
</style>
