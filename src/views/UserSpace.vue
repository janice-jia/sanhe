<template>
  <div class="usermessage">
    <div class="container">
      <UserHeader></UserHeader>
        <div class="space-file-getlist">
            <!-- <span :class="{'blue':fileType=='全部文件'}" @click="changeFileType('全部文件')">全部文件</span> -->
            <span :class="{'blue':fileType=='图片'}" @click="changeFileType('图片')">图片</span>
            <span :class="{'blue':fileType=='视频'}" @click="changeFileType('视频')">视频</span>
            <span :class="{'blue':fileType=='文档'}" @click="changeFileType('文档')">文档</span>
        </div>

      <div class="sh-user-space">
          <el-row style="border-bottom:1px solid #ccc">
                <el-breadcrumb separator="/">
                    <!-- <el-breadcrumb-item :to="{name: 'userspace', params: {'studentSpaceId': 0}}" :if="fileType == '全部文件'">全部文件</el-breadcrumb-item> -->
                    <el-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i" :to="{ name:'userspace', params:{studentSpaceId: item.id}}">
                        {{item.name}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
          </el-row>
        
        <div class="spce-btns">
            <button @click="backurl" v-if="breadcrumbList.length > 1" class="btn btn-hover">
                返回
            </button>
            <button class="btn btn-hover">上传</button>
            <!-- <button class="btn">下载</button> -->
            <button class="btn" @click="dialogFormVisible = true">新建文件夹</button>
        </div>

        <div class="space-list">
            <el-row :gutter="40">
                <el-col :span="4">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="/api/common/upload"
                        name="fileurl"
                        accept=".xls,.xlsx,.bmp,.gif,.jpg,.jpeg,.png,.doc,.docx,.txt,.ppt,.pptx,.pdf,.AVI,.avi,.mov,.rmvb,.rm,.FLV,.mp4,3GP,.rar,.zip,.gz,.bz2"
                        :before-upload="beforeUpload"
                        :on-success="handleUploadSuccess"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">上传文件</div>
                        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-col>
                <el-col :span="4" v-for="(item, i) in spaceList" :key="i">
                    <div class="space-file">
                        <div class="space-hand">
                            <i class="download" v-if="item.fileType !== '文件夹'" @click="fileDownload" title="下载">
                                <a :href="GLOBAL.webUrl+item.fileUrl">
                                    <img src="../assets/img/file-download.png" alt="">
                                </a>
                            </i>
                            <i class="del" @click="fileDel(item.studentSpaceId)" title="删除">
                                <img src="../assets/img/file-del.png" alt="">
                            </i>
                        </div>
                        <div @click="goPath(item)" :class="{
                            'space-file-png':item.fileType=='图片', 
                            'space-file-video':item.fileType=='视频', 
                            'space-file-path':item.fileType=='文件夹', 
                            'space-file-defult':item.fileType=='文档'
                        }">
                            
                            <p class="tit">{{item.fileName}}</p>
                        </div>
                    </div>
                    
                </el-col>
            </el-row>
        </div>


        <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="100px">
                <el-form-item label="上级目录">
                    {{parentName}}
                </el-form-item>
                <el-form-item label="文件夹名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPath">确 定</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '../components/User_header'
export default {
  name: 'userspace',
  data() {
    return {
        spaceList: [],
        dialogFormVisible: false,
        form: {},
        breadcrumbList: [{
            "id": "0",
            "name": "全部文件"
        }],
        parentName: '全部文件',
        fileType:'全部文件',
        parentId: 0
    }
  },
  mounted(){
    //   this.getSpaceMeum()
      this.getSpace()
  },
  components: {
    UserHeader
  },
  methods: {
    backurl(){
        // 返回上一级
        var queryD = {}
        if(this.$route.query.parentId != 0){
            queryD.parentId = this.breadcrumbList[this.breadcrumbList.length-1].id
        }
        this.$router.push({
            name: 'userspace', 
            params: {studentSpaceId: this.$route.query.parentId},
            query: queryD
        })
    },
    getSpaceMeum(id){
        if(this.$route.params.studentSpaceId == 0) return
        this.$http.post('/api/studentSpace/getSpaceMeum',{
            studentSpaceId: this.$route.params.studentSpaceId
        }).then(function(res){
            if(res.data.code == 0){
                this.breadcrumbList = res.body.data
                if(this.breadcrumbList && this.breadcrumbList.length > 0) {
                    var i = this.breadcrumbList.length - 1
                    this.parentName = this.breadcrumbList[i].name
                }
            }
        })
    },
    changeFileType(fileType){
        this.fileType = fileType
        this.getSpace()
    },
    // 个人空间列表
    getSpace(){

        let studentSpaceId = this.$route.params.studentSpaceId
        var paramsD = {
            "parentId": studentSpaceId,
            "studentId": this.GLOBAL.studentId
        }
        // 文件类型
        if(this.fileType !=='全部文件') {
            paramsD.fileType = this.fileType
        }
        // 获取路径
        this.getSpaceMeum()
        this.$http.post('/api/studentSpace/list', paramsD).then(function(res){
            if(res.data.code == 0){
                this.spaceList = res.body.data.rows
            }else{
                this.spaceList = []
            }
        })
    },
    // 新建文件夹
    addPath(){
        this.$http.post('/api/studentSpace/subStudentSpace', {
            "parentId": this.$route.params.studentSpaceId,
            // "parentName": '全部文件',
            "fileName": this.form.name,
            "fileType": "文件夹",
            "studentId": this.GLOBAL.studentId,
            "studentName": this.GLOBAL.CurrentUserName
        }).then(function(res){
            console.info('res', res)
            if(res.body.code == 0){
                this.$message.success('创建成功');
                this.dialogFormVisible = false
                this.form.name = ''
                // 重新获取文件夹
                this.getSpace()
            }else{
                this.$message.error(res.body.msg);
            }
        })
    },
    beforeUpload(fileurl){
    },
    handleUploadSuccess(res){
        console.info('res', res)
        if(res.code == 0){
            this.$message.success('上传成功');
            this.doUploadSubmit(res.data)
        }else{
            this.$message.error(res.msg || '上传失败');
        }
    }, 
    // 文件上传成功回调，，指定文件夹，，默认文件夹-全部文件
    doUploadSubmit(fileParams){
        var paramsD = {
            "parentId": this.parentId,
            "fileName": (fileParams.fileName ? fileParams.fileName : '全部文件夹'),
            "fileType": fileParams.fileType,
            // "fileType": fileParams.fileType,
            "studentId": this.GLOBAL.studentId,
        }
        if(fileParams.url) paramsD.fileUrl = fileParams.url
        this.$http.post('/api/studentSpace/subStudentSpace', paramsD).then(function(res){
            console.info('res', res)
            if(res.body.code == 0){
                this.$message.success('创建成功');
                this.dialogFormVisible = false
                // 重新获取文件夹
                this.getSpace()
            }else{
                this.$message.error(res.body.msg);
            }
        })
    },
    // 删除
    fileDel(studentSpaceId){
        this.$http.post('/api/studentSpace/deleteStudentSpace', {
            "studentSpaceId": studentSpaceId,
        }).then(function(res){
            console.info('res', res)
            if(res.body.code == 0){
                this.$message.success('删除成功');
                this.getSpace();
            }else{
                this.$message.error(res.body.msg);
            }
        })
    },
    fileDownload(){},
    goPath(info){
        if(info.fileType == '文件夹'){
            var queryData = {studentSpaceId:info.studentSpaceId}
            this.$router.push({
                name: 'userspace', 
                params: {studentSpaceId:info.studentSpaceId},
                query: {
                    parentId: this.parentId
                }
            })
        }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "getSpace"
  }
}
</script>

<style lang="scss">
.space-file-getlist{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin: 30px;
    span{
        padding: 0 20px;
        cursor: pointer;
        &.hover{
            background: rgba(51,51,255,1);
        }
        &.blue{
            color: rgba(51,51,255,1);
        }
    }
    
}
.sh-user-space{
    background: #ffffff;
    padding: 20px 40px 40px 40px;

    .el-dialog__wrapper{
        .el-dialog{
            width: 800px!important;
            min-height:auto;
        }
    }
    
    .spce-btns{
        margin-top: 20px;
        .btn{
            height:40px;
            border: none;
            line-height: 40px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius:5px;
            margin-right: 20px;
            &:hover{
                background: rgba(51,51,255,1);
                color: #ffffff;
            }
        }
        .btn-hover{
            background:rgba(51,51,255,1);
        }
    }
    .space-list{
        margin-top: 30px;
        .space-file{
            height: 170px;
            position: relative;
            cursor: pointer;
            &:hover{
                background-color: #ECF0FF;
                .space-hand{
                    display: inline-block;
                }
            }
            .tit{
                font-size:18px;
                font-weight:400;
                text-align: center;
                color:rgba(51,51,51,1);
            }
            .space-hand{
                position: absolute;
                height: 50px;
                width: 100%;
                background: rgba(0, 0, 0, 0.3);
                top: 0;
                left: 0;
                height: 40px;
                text-align: right;
                display: none;
                z-index: 2;
                i{
                    display: inline-block;
                    padding: 0 5px;
                    &.del{
                        padding-top: 5px;
                        float: right;
                    }
                    &.download{
                        margin: 5px;
                        padding-top: 5px;
                        float: left;
                    }
                }
                
            }
        }
        .space-file-png{
            height: 100%;
            padding-top: 120px;
            background:  url('../assets/img/file-png.png') no-repeat center 10px;
        }
        .space-file-video{
            height: 100%;
            padding-top: 120px;
            background:  url('../assets/img/file-video.png') no-repeat center 10px;
        }
        .space-file-path{
            height: 100%;
            padding-top: 120px;
            background:  url('../assets/img/filePath.png') no-repeat center 10px;
        }
        .space-file-defult{
            height: 100%;
            padding-top: 120px;
            background:  url('../assets/img/file-default.png') no-repeat center 10px;
        }
    }

    // 上传按++start
    .el-upload-dragger{
        width: 154px;
        height: 170px;
    }
    // 上传按++end

    .el-breadcrumb{
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
    }
}
</style>