<template>
  <div class="userheader">
      <!-- 用户信息 -->
      <div class="user-box">
        <div class="avatars-info">
          <div class="avatars">
            <img src="../assets/img/avatars.jpg" alt="">
          </div>
          <div class="info">
            <p class="name">19系-兰兰</p>
            <p class="s-info">
              <span>基础信息</span>
              <span>学号等内容</span>
              <span>学号等内容</span>
            </p>
          </div>
        </div>
        <div class="user-nav">
          <ul>
            <li><router-link to="userfinish">已完成</router-link></li>
            <li><router-link to="userexaming">考试中</router-link></li>
            <li><router-link to="userexamfinish">已考试</router-link></li>
            <li class="hover"><router-link to="usermessage">我的消息</router-link></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'userheader',
  data() {
    return {
    }
  },
  mounted(){
  },
  components: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.userheader{
  .user-box{
    height: 260px;
    background: #ffffff;
    margin: 30px 0;
    // 用户头像及信息等
    .avatars-info{
      height: 190px;
      .avatars{
        width: 130px;
        height: 130px;
        margin: 30px 20px 0 30px;
        float: left;
        border-radius: 50%;
      }
      .info{
        width: 500px;
        float: left;
        padding-top:60px;
        p{
          &.name{
            font-size: 28px;
            color: #333333;
            height: 30px;
            margin-bottom: 20px;
            line-height: 30px;
            overflow: hidden;
          }
          &.s-info{
            font-size: 18px;
            color: #666666;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            span{
              padding-right: 20px;
            }
          }
        }
      }
    }
    // 用户导航
    .user-nav{
      clear: both;
      border-top: 1px solid #e5e5e5;
      height: 70px;
      line-height: 70px;
      ul{
        padding: 0 40px;
        li{
          float: left;
          font-size: 20px;
          padding:0 60px 0 0;
          a{
            color: #333333;
            &:hover{
              color: #3333ff;
            }
          }
          &.hover{
            a{
              color: #3333ff;
            }
          }
        }
      } 
    }
  }
}
</style>

