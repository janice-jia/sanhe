<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>

      <div class="sh-user-message">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部消息" name="first">
            <div class="sh-message-item" v-for="(item, index) in msgList" :key="item.id">
              <p class="m-name">发送人：{{item.senduser}}</p>
              <p class="m-receiveuser">收件人：{{item.receiveuser}}</p>
              <p class="m-con">内容：{{item.msgcontent}}</p>
              <p v-for="replay in item.replaycon" :key="replay.id" class="replay-con">
                <span>回复@{{replay.receiveuser}}：</span>{{replay.msgcontent}}
              </p>
              <div class="replay-msg" v-if="replayMsgState != null && index == replayMsgState">
                <textarea v-model="msgcontent" name="" id="" cols="30" rows="10" placeholder="请输入文字…"></textarea>
                <button class="btn btn-hover" @click="sendReplay(item.senduserid)">发表</button>
              </div>
              <p class="m-time" v-if="replayMsgState == null && index != replayMsgState">
                发送时间：{{item.createdatetime}}
                <span class="m-icon" @click="replayMsg(index)"></span>
              </p>
            </div>
            <!-- <div class="sh-message-item">
              <p class="m-name">技术系-李老师</p>
              <p class="m-con">你最近有很多课程有没有上了，有时间补上，马上就要考核了，有什么问题及时联系我</p>
              <p class="m-time">
                17小时前
                <span class="m-icon"></span>
              </p>
            </div> -->
            <!-- <div class="sh-page">
              <span class="total">共2条记录</span>
              <span class="prev">上一页</span>
              <span class="current">1</span>
              <span class="next">下一页</span>
            </div> -->
          </el-tab-pane>
          <!-- <el-tab-pane label="回复消息" name="second">
            回复消息
          </el-tab-pane> -->


        <div class="replay-msg-box">
          <span style="font-size:18px; color:#666666">请选择老师：</span>
          <el-select v-model="teacherid" placeholder="请选择">
            <el-option
              v-for="item in TeachersList"
              :key="item.id"
              :label="item.realname"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="replay-msg">
            <textarea v-model="teachermsg" name="" id="" cols="30" rows="10" placeholder="请输入文字…"></textarea>
            <button class="btn btn-hover" @click="sendMsg()">发表</button>
          </div>
        </div> 
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
      activeName: 'first',
      msgList: [],
      // 回复消息框显示状态
      replayMsgState: null,
      // 回复消息框内容
      msgcontent: '',
      teacherid: null,
      teachermsg:null,
      TeachersList: []
    }
  },
  mounted(){
    // 获取消息列表
    this.GetMsg(),
    this.getTeachers()
  },
  components: {
    UserHeader
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getTeachers(){
      this.$http.get('/API/Msg/Message.ashx?command=GetTeachers').then(function (res) {
        this.TeachersList = res.body.dataList || []
      })
    },
    // 获取消息列表
    GetMsg() {
      this.$http.get('/API/Msg/Message.ashx?command=GetMsg&userid='+this.GLOBAL.CurrentUserId).then(function (res) {
        this.msgList = res.body.dataList || []
        this.msgList = this.getTree(this.msgList)
        console.info('this.BannerList----tree', this.msgList)
      })
    },
    // 转换
    getTree(dataList, type) {
      let msgconList = []
      for(var i in dataList){
        // 第一次
        if(dataList[i].parentmsgid == 0){
          dataList[i].replaycon = []
          msgconList.push(dataList[i])
        }
      }

      for(var i in dataList){
        if(dataList[i].parentmsgid != 0){
          msgconList = this.getReplayCon(dataList[i], msgconList)
        }
      }
      return msgconList
    },
    getReplayCon(item, msgconList){
      // for(var i in dataList){
        for(var j in msgconList){
          // msgconList[j].replaycon = []
          if(msgconList[j].id == item.parentmsgid){
            msgconList[j].replaycon.push(item)
          }
        }
      // }
      return msgconList
    },
    // 回复消息
    replayMsg(itemIndex){
      this.replayMsgState = itemIndex
    },
    // 回复消息
    sendReplay(receiveuserid){
      if(!this.msgcontent){
        this.$message.error('请填写回复内容');
        return
      }
      this.$http.get('/API/Msg/Message.ashx?command=Send&userid='+this.GLOBAL.CurrentUserId+'&receiveuserid='+receiveuserid+'&msgcontent='+this.msgcontent).then(function (res) {
        if(res.body.state == 'success'){
          this.replayMsgState = null
          this.msgcontent = ''
          // this.$router.push({name: 'usermessage'})
          this.$router.go(0)
        }else{
          this.$message.error('回复失败');
          return
        }
      })
    },
    // 发送消息
    sendMsg(){
      if(!this.teacherid){
        this.$message.error('请选择老师');
        return
      }
      if(!this.teachermsg){
        this.$message.error('请输入内容');
        return
      }
      this.$http.get('/API/Msg/Message.ashx?command=Send&userid='+this.GLOBAL.CurrentUserId+'&receiveuserid='+this.teacherid+'&msgcontent='+this.teachermsg).then(function (res) {
        if(res.body.state == 'success'){
          // this.$router.push({name: 'usermessage'})
          this.$message('发送成功');
          this.$router.go(0)
        }else{
          this.$message.error('回复失败');
          return
        }
      })
    }
  }
}
</script>
