<template>
  <div class="ExamSubmit">
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

      <div class="ExamSubmit">
        <p>
          <img src="../assets/img/sub.png" alt="">
        </p>
        <p class="sh-sucess">已提交成功</p>
        <p class="sh-go">三秒后自动跳转至首页</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamSubmit',
  data() {
    return {
      examCon: {},
      currentanswer: null,
      customColor: '#3333ff',
      progress: 0
    }
  },
  mounted(){
    let _this = this;
    setTimeout(function(){
      _this.$router.push({name:'exam'})
    },3000)
  },
  components: {
  },
  methods: {
   
  }
}
</script>
<style lang="scss">
.ExamSubmit{
  .ExamSubmit{
    background: #ffffff;
    padding: 80px 0;
    p{
      text-align: center;
      &.sh-sucess{
        font-size: 30px;
        color: #333333;
        padding: 40px 0 20px 0;
      }
      &.sh-go{
        font-size: 22px;
        color: #999999;
      }
    }
  }
}
</style>

