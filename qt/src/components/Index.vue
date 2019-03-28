<template>
  <div class="index" v-loading="loading"    
    element-loading-text="正在创建任务，请稍等"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
      <Head></Head>
      <div class="head-content">
        <div class="head-content-center">
          <!-- <div class="my-task">
            <span>我的任务</span>
            <span>></span>
            <span class="new-task">创建任务</span>
          </div> -->
          <div class="task-concent">
            <p class="language">语音质检</p>
            <div class="name"><span class="task-name">任务名称：</span> <el-input v-model="dataInfoTaskName" :maxlength="15" placeholder="请输入任务名称,长度不超过15个字" class="task-name-input"></el-input></div>

            <el-form>
            <span class="upload-task-name">上传音频：</span>
              <div class="upload">
                <!-- <el-upload
                  action="/merchant/v2.0/inspection/audio_upload?audio_transfer"
                  class="upload-demo"
                  accept=".mp3,.wav,.m4a,.opus,.flac"
                  ref="upload"
                  multiple
                  name="audio_transfer"
                  :show-file-list="true"
                  :limit="10"
                  :auto-upload="false"
                  :on-success="Done"
                  :on-error="ErrorEv"
                  :on-preview="preview"
                  :on-change="change"
                  :before-remove="remove"
                  :on-progress="Progress">
                  <el-button size="small" type="primary" class="task-button">选择文件</el-button>
                </el-upload>-->
              </div> 
                <!-- <div class="block" @click="uploadMusic()" v-show="!dataInfoTaskName||!dataInfoSort"></div> -->
                <uploader :options="options" class="uploader" @file-success="onFileSuccess" @file-added="onFileAdded" @file-removed="onFileRemove" >
                  <uploader-unsupport></uploader-unsupport>
                  <uploader-drop>
                    <uploader-btn :attrs="attrs">选择录音</uploader-btn>
                  </uploader-drop>
                  <uploader-list></uploader-list>
                </uploader>
            </el-form>
            <!-- <div class="showSong">
              <ul>
                <li v-for="(item,index) in fileListNum" :key="index">
                   <img class="music" src="../assets/music.png" alt="">
                   <p class="name">{{item.name}}</p>
                   <img class="delete" src="../assets/close.png" alt="" @click="Close(item)">
                   <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="item.percentage|capitalize" color="rgba(142, 113, 199, 0.7)"></el-progress>
                </li>
              </ul>
            </div> -->
            <div class="language-sort">
              <div class="name"><span class="task-name">录音类型选择：</span> 
                <el-radio v-model="dataInfoSort" label="电销外呼" style="color:#666;">电销外呼</el-radio>
                <el-radio v-model="dataInfoSort" label="现场查勘" style="color:#666;">现场查勘</el-radio>
              </div>
              <div v-show="isSuccess" style="margin-left:130px;">
                <el-radio v-model="dataInfoSort2" label="交易成功录音" style="color:#666;">交易成功录音</el-radio>
                <el-radio v-model="dataInfoSort2" label="未交易成功录音" style="color:#666;">未交易成功录音</el-radio>
              </div>
            </div>
            <div class="upload-tips">
              <p class="main">上传提示：</p>
              <p class="small">每条音频不能超过500M(音频时长不能超过5小时),可同时支5个音频文件上传。</p>
              <p class="small">目前支持wav、flac、opus、mp3、m4a的音频格式。</p>
            </div>
            <!-- <div class="sumit"><router-link to="/Task"><el-button>创建任务</el-button></router-link></div> -->
            <div class="sumit" @click="submitUpload()"><el-button type="primary" style="background-color: #524AE7;border-color:#524AE7;color: #fff;">创建任务</el-button></div>
          </div>
          
        <!-- <button @click="login()">登录</button> -->
        </div>
      </div>
  </div>
</template>

<script>
import Head from '@/components/Head'
import Qs from 'qs'
export default {
  name: 'Index',
  data () {
    return {
      fileListNum:'',
      loading:'',
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: '/merchant/v2.0/inspection/audio_upload',
        testChunks: false,
        fileParameterName: 'audio_transfer',
        chunkSize:1*1024*1024*1000
      },
      attrs: {
        accept: '.mp3,.wav,.m4a,.opus,.flac,.amr,.WAV,.MP3,.M4A,.OPUS,.FLAC,.AMR',
      },
      arrUser:[],
      arrSongs:[],
      objArr:{},
      uploadNum:0,//上传的次数
      successNum:0,//成功的次数
      isSuccess:false,
      dataInfoSort:'',
      dataInfoSort2:'',
      dataInfoTaskName:''
    }
  },
  filters: {
    capitalize: function (value) {
      return parseInt(value)
    }
  },
  mounted(){
    let url = window.location.href;
    document.title = url;
  },
  watch:{
    dataInfoSort:function(){
      if(this.dataInfoSort=='电销外呼'){
        this.isSuccess = true
      }else{
        this.isSuccess = false
      }
    }
  },
  methods:{
    // phone(){
    //   this.isSuccess = true
    // },
    // notPhone(){
    //   this.isSuccess = false
    // },
    uploadMusic(){
      if(!this.dataInfoTaskName){
        this.$message('请输入任务名称');
      }else if(!this.dataInfoSort){
        this.$message('请选择录音类型');
      }
    },
    onFileRemove(file,filelist){
      let id = file.id
      delete this.objArr[id]
      this.uploadNum = this.uploadNum-1
      this.successNum = this.successNum-1
    },
    login(){//查看更多
        this.axios.post('/merchant/v1.0/sessions',
          Qs.stringify({
            mobile:18320863946,
            password:12345678
          })
        )
        .then(response => {  
          var value=response.data.data.name+'&&'+response.data.data.company+'&&'+response.data.data.customer_service_status+'&&'+response.data.data.user_xa_status+'&&'+response.data.data.robot_hopper+'&&'+response.data.data.user_id;
					this.setCookie('user',value,1);
        }) 
    },
    submitUpload() {
      if(!this.dataInfoTaskName){
        this.$message('请输入任务名称');
      }else if(!this.dataInfoSort){
        this.$message('请选择录音类型');
      }else if(this.dataInfoSort=='电销外呼' && !this.dataInfoSort2){
        this.$message('请选择电销外呼类型');
      }else if(this.uploadNum!==this.successNum-1 && this.uploadNum!==this.successNum){
        this.$message('录音正在上传中，请稍等...');
      }else if(this.successNum>5){
        this.$message('上传次数超过限制，请删除超过项目');
      }
      else{
      this.$store.commit('GetRoute', 1)
        // this.loading = true      
      for (var property in this.objArr){
        this.arrSongs.push(this.objArr[property]);
      }
        this.axios.put('/merchant/v2.0/inspection/audio_upload',
          Qs.stringify({
            task_name:this.dataInfoTaskName,
            company_label:this.dataInfoSort2,
            record_type:this.dataInfoSort,
            all_transfer_number:JSON.stringify(this.arrSongs)
          })
        )
        .then(response => {  
          if(response.data.status == 200){
              this.$router.push({ name: 'Index' })
          }
        }) 
      }
    },
    onFileSuccess(rootFile, file, message, chunk){
      let smessage = JSON.parse(message)
      let obj = {} 
      let key = file.id;
      let value = smessage.data.all_transfer_number[0]
      obj[key] = value
      Object.assign(this.objArr,obj);
      this.successNum = this.successNum+1
    },
    onFileAdded(files,fileList){
      this.uploadNum = this.uploadNum+1
      if(this.successNum>5){
        files.ignored = true
        this.$message('上传次数超过限制');
      }
    },
    ErrorEv(err, file, fileList){
      this.$router.push({ name: 'Task' })
    },
    Progress(event, file, fileList){
      this.fileListNum = fileList
    },
    preview(file){
    },
    change(file, fileList){
      this.$nextTick(
        function(){
          this.fileListNum = fileList
        }
      )
    },
    remove(file, fileList){
      this.$nextTick(
        function(){
          this.fileListNum = fileList
        }
      )
    }
  },
  components:{
    Head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F5F5F5;
    .upload-demo{
      padding-bottom:20px;
    }
  .head-content{
    width: 100%;
    min-height: auto;
    flex: 1;
    position: relative;
    background: #f8f8f8;
    .head-content-center{
      width: 1200px;
      _height:200px; 
      min-height:200px;
      position: relative;
      top: 4px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #dddddd;
      padding-bottom:200px;
      .my-task{
        width: 1100px;
        height: 15px;
        margin: 0 auto;
        padding: 20px;
        border-bottom: 1px solid #dddddd;
        color: #989898;
        .new-task{
          color: #362389;
        }
      }
      .task-concent{
        width: 800px;
        _height:200px; 
        min-height:200px;
        flex: 1;
        position: relative;
        top: 20px;
        margin: 0 auto;
        display: block;
        .block{
          width: 100px;
          height: 50px;
          position: absolute;
          left: 96px;
          top: 186px;
          z-index: 1000;
        }
        .uploader{
          margin-top: 10px;
          border-radius: 10px;
          width:678px;
          height: auto;
          position: relative;
          left: 94px;
          top: -25px;
        }
        .uploader-drop{
          background: #fff;
          border: none;
        }
        .uploader-btn{
          color: #fff;
          background:#524AE7;
          position: relative;
          left: -10px;
        }
        .showSong{
          width: 600px;
          height: auto;
          position: relative;
          ul{
            width: 580px;
            height: auto;
            position: relative;
            top: -30px;
            li{
              width: 540px;
              height:40px;
              z-index: 1000;
              padding: 15px;
              padding-top:5px;
              border-radius: 10px;
              margin-top:10px;
              background: #f8f8f8;
              .name{
                display: inline-block;
                width:300px;
                position: relative;
                top: 10px;
                left: 6px;
              }
              .delete{
                width: 15px;
                height:15px;
                position: relative;
                top: -13px;
                left: 150px;
                cursor: pointer;
                z-index: 1000;
              }
              .progress{
                width: 470px;
                height:40px;
                position: relative;
                top: -23px;
                left: 60px;
              }
            }
          }
        }
        .language{
          width: 100%;
          text-align: center;
          font-size: 24px;
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .name{
          margin-bottom: 20px;
        }
        .upload-tips{
          position: relative;
          top: 30px;
          left: 90px;
          .main{
            font-size: 18px;
            margin-bottom: 10px;
          }
          .small{
            margin-bottom: 2px;
            color: #666;
          }
        }
        .task-name{
          position: relative;
          font-size: 18px;
          color: #666;
          font-family: 'SimSun';
        }
        .upload-task-name{
          position: relative;
          font-size: 18px;
          color: #666;
          font-family: 'SimSun';
          top: 16px;
        }
        .task-name-input{
          position: relative;
          width: 680px;
        }
        .language-sort{
          position: relative;
          top: 8px;
        }
        .sumit{
          position: relative;
          top: 80px;
          text-align: center;
          height: 30px;
        }
        .task-button{
          position: relative;
          left: 90px;
          top: -25px;
        }
      }
    }
  }
}

</style>
