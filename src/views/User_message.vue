<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-user-message">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部消息" name="first">
            <div class="sh-message-item">
              <p class="m-name">技术系-李老师</p>
              <p class="m-con">你最近有很多课程有没有上了，有时间补上，马上就要考核了，有什么问题及时联系我</p>
              <p class="m-time">
                17小时前
                <span class="m-icon"></span>
              </p>
            </div>
            <div class="sh-message-item">
              <p class="m-name">技术系-李老师</p>
              <p class="m-con">你最近有很多课程有没有上了，有时间补上，马上就要考核了，有什么问题及时联系我</p>
              <p class="m-time">
                17小时前
                <span class="m-icon"></span>
              </p>
            </div>
            <div class="sh-page">
              <span class="total">共2条记录</span>
              <span class="prev">上一页</span>
              <span class="current">1</span>
              <span class="next">下一页</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="回复消息" name="second">
            回复消息
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '../components/User_header'
export default {
  name: 'usermessage',
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted(){
  },
  components: {
    UserHeader
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style lang="scss">
.usermessage{
  .sh-user-message{
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
      .m-con{
        font-size: 16px;
        line-height: 25px;
        padding: 20px 0;
        color: #666666;
      }
      .m-time{
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
}
</style>

