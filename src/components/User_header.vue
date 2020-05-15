<template>
  <div class="userheader">
      <!-- 用户信息 -->
      <div class="user-box">
        <div class="avatars-info">
          <div class="avatars">
            <img src="../assets/img/avatars.jpg" alt="">
          </div>
          <div class="info">
            <p class="name">{{myInfo.gradename}}-{{myInfo.name}}</p>
            <p class="s-info">
              <span>学号：{{myInfo.xh}}</span>
              <span>班级：{{myInfo.executiveclass}}</span>
              <span>专业：{{myInfo.majorinreading}}</span>
            </p>
          </div>
        </div>
        <div class="user-nav">
          <ul>
            <li :class="{hover:$route.name == 'userfinish'}"><router-link :to="{name:'userfinish'}">已完成</router-link></li>
            <li :class="{hover:$route.name == 'userexaming'}"><router-link :to="{name:'userexaming'}">考试中</router-link></li>
            <li :class="{hover:$route.name == 'userexamfinish'}"><router-link :to="{name:'userexamfinish'}">已考试</router-link></li>
            <li :class="{hover:$route.name == 'userspace'}"><router-link :to="{name: 'userspace', params: {'studentSpaceId': 0}}">个人空间</router-link></li>
            <li :class="{hover:$route.name == 'usermessage'}"><router-link to="usermessage">个人空间</router-link></li>
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
      myInfo: {}
    }
  },
  mounted(){
    this.GetUserInfo()
  },
  components: {
  },
  methods: {
    GetUserInfo(){
      this.$http.post('/api/index/getStudentById',{
        'studentId': this.GLOBAL.studentId
      }).then(function (res) {
        this.myInfo = res.body.data || {}
      })
    }
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
        width: 1000px;
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

.usermessage{
  min-height: 600px;
  .sh-user-message{
    .sh-exam-item{
      margin-top: 0;
    }
    .el-tabs__item{
      font-size: 18px;
      color: #333333;
      &.is-active{
        color: #3333ff;
      }
    }
    .el-tabs__header{
      padding-left: 40px;
    }
    .el-tabs__active-bar{
      background: none;
    }
    .el-tabs__nav-wrap::after{
      background: none;
    }

    .sh-message-item{
      padding: 30px 40px;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      .m-name{
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        color: #333333;
      }
      .m-receiveuser{
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        margin-top: 10px;
        color: #333333;
      }
      .m-con{
        font-size: 16px;
        line-height: 25px;
        padding: 20px 0 5px 0;
        color: #666666;
      }
      .m-time{
        margin-top: 15px;
        padding-top: 5px;
        font-size: 12px;
        color: #999999;
        .m-icon{
          display: inline-block;
          width: 32px;
          height: 26px;
          background: url(../assets/img/m-d.png) no-repeat;
          cursor: pointer;
          float: right;
          &:hover{
            background: url(../assets/img/m-h.png) no-repeat;
          }
        }
      }
      // 回复消息内容
      .replay-con{
        padding-left: 2em;
        font-size: 16px;
        color: #666666;
        span{
          color: #3333ff;
        }
      }
      
    }
  } 
  
  .sh-page{
    background: #ffffff;
    text-align: center;
    padding: 40px 0  50px 0;
    position: relative;
    .current{
      display: inline-block;
      height: 26px;
      line-height: 26px;
      background: #3333ff;
      color: #ffffff;
      width: 30px;
      text-align: center;
      margin: 0 15px;
      border-radius: 3px;
    }
    .prev,.next{
      display: inline-block;
      padding: 0 10px;
      height: 26px;
      line-height: 26px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    }
    .total{
      position: absolute;
      left: 60px;
      top: 45px;
      font-size: 12px;
      color: #999999;
      letter-spacing: 3px;
    }
  }

  // 回复消息--编辑框
  .replay-msg-box{
    background: #ffffff;
    margin-top: 30px;
    padding: 20px;
    .el-select .el-input.is-focus .el-input__inner,
    .el-select .el-input__inner:focus,
    .el-select-dropdown__item.selected{
      border-color: #3333ff;
    }
  }
  .replay-msg{
    margin-top: 15px;
    textarea{
      height: 110px;
      width: 100%;
      border: 1px solid #e5e5e5;
      padding: 20px;
      font-size: 16px;
      line-height: 22px;
      color: #999999;
      resize: none;
      border-radius: 5px;
    }
    button{
      margin-top: 17px;
    }
  }
}
</style>

