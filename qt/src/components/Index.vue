<template>
  <div class="index" v-loading="loading"    
    element-loading-text="正在创建任务，请稍等"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
      <Head></Head>
      <div class="head-content">
        <div class="head-content-center">
          <div class="my-task">
            <span>我的任务</span>
            <span>></span>
            <span class="new-task">创建任务</span>
          </div>
          <div class="task-concent">
            <p class="language">语音质检</p>
            <el-form>
              <div class="name"><span class="task-name">任务名称：</span> <el-input v-model="dataInfo.taskName" placeholder="请输入任务名称" class="task-name-input"></el-input></div>
              <div class="upload">
                <span class="task-name">上传音频：</span>
                <el-upload
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
                </el-upload>
              </div>
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
            <div class="upload-tips">
              <p class="main">上传提示：</p>
              <p class="small">每条音频不能超过500M(音频时长不能超过5小时),可同时支持10个音频文件上传。</p>
              <p class="small">目前支持wav、flac、opus、mp3、m4a的音频格式。</p>
            </div>
            <div class="language-sort">
              <div class="name"><span class="task-name">录音类型选择：</span> 
                <el-radio v-model="dataInfo.sort" label="电销外呼">电销外呼</el-radio>
                <el-radio v-model="dataInfo.sort" label="现场查勘">现场查勘</el-radio>
              </div>
            </div>
            <!-- <div class="sumit"><router-link to="/Task"><el-button>创建任务</el-button></router-link></div> -->
            <div class="sumit" @click="submitUpload()"><el-button>创建任务</el-button></div>
          </div>
        <button @click="login()">登录</button>
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
      dataInfo:{
        sort:'',
        taskName:'',
      },
      fileListNum:'',
      loading:''
    }
  },
  filters: {
    capitalize: function (value) {
      return parseInt(value)
    }
  },
  methods:{
    login(){//查看更多
        this.axios.post('/merchant/v1.0/sessions',
          Qs.stringify({
            mobile:18320863946,
            password:12345678
          })
        )
        .then(response => {  
          console.log(response)
        }) 
    },
    submitUpload() {
      if(!this.dataInfo.taskName){
        this.$message('请输入任务内容');
      }else if(!this.dataInfo.sort){
        this.$message('请选择录音类型');
      }else{
        this.loading = true
        this.$refs.upload.submit();
      }
    },
    Done(response, file, fileList){
      console.log(response.data.all_transfer_number)
      console.log('成功了')
        this.axios.put('/merchant/v2.0/inspection/audio_upload',
          Qs.stringify({
            task_name:this.dataInfo.taskName,
            record_type:this.dataInfo.sort,
            all_transfer_number:JSON.stringify(response.data.all_transfer_number)
          })
        )
        .then(response => {  
          console.log(response)
        }) 
      this.loading = false
      this.$router.push({ name: 'Task' })
    },
    ErrorEv(err, file, fileList){
      console.log(err)
      console.log('失败了')
      this.loading = false
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
    height: 100%;
    position: relative;
    background: #f8f8f8;
    .head-content-center{
      width: 1200px;
      min-height: 870px;
      position: relative;
      top: 4px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #dddddd;
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
        width: 600px;
        height: 800px;
        position: relative;
        top: 20px;
        margin: 0 auto;
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
        .task-name-input{
          position: relative;
          width: 480px;
        }
        .language-sort{
          position: relative;
          top: 50px;
        }
        .sumit{
          position: relative;
          top: 50px;
          text-align: center;
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
