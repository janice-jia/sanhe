<template>
  <div class="Header">
    <el-row :gutter="20" justify="space-between">
      <el-col :span="4">
        <div class="logo">
          <img src="../assets/img/logo.png" alt=""></div>
      </el-col>
      <el-col :span="14" class="nav-menu">
        <ul>
          <li class="hover"><router-link to="home" target="_blank">首页</router-link></li>
          <li><router-link to="home" target="_blank">考试中心</router-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="nav-btn">
        <router-link class="btn btn-hover" to="usermessage" target="_blank">
          个人中心
        </router-link>
        <router-link class="btn" to="home" target="_blank">
          退出
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showApp: false
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
      &:hover{
        background: #3333ff;
        color: #ffffff;
      }
    }
  }
  .nav-menu{
    ul li{
      float: left;
      padding-right: 50px;
      font-size: 24px;
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
