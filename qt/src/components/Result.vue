<template>
  <div class="index">
      <Head></Head>
      <div class="head-content">
        <div class="head-content-center">
          <!-- <div class="my-task">
            <span>我的任务</span>
            <span>></span>
            <span class="new-task">查看结果</span>
          </div> -->
          <div class="task-concent">
            <p class="language">质检结果</p>
            <div class="result">
                <div class="head">
                    <span class="name">任务名称：{{task_name}}</span>
                    <!-- <span class="name01">音频名称：{{record_name}}</span> -->
                    <span class="time">录音时长：{{record_time}}</span>
                </div>
                <div class="talk">
                    <ul>
                        <li v-for="(item,index) in tra_res_list" :key="index">
                            <p :class="item.direction==2?'guesthead02':'guesthead01'">{{item.speaker | clearString}}</p>
                            <span :class="{'guestcontext02':item.direction==2,'guestcontext01':item.direction!==2}" v-html="item.content"></span>
                        </li>
                    </ul>
                </div>
                <div class="how">
                    <ul class="one">
                        <li v-if="customer_emotion>7">客户情绪：<span style="color:red">高涨</span></li>
                        <li v-if="customer_emotion<8">客户情绪：<span style="color:#8691a5">正常</span></li>
                        <li v-if="service_emotion>7">客服情绪：<span style="color:red">高涨</span></li>
                        <li v-if="service_emotion<8">客服情绪：<span style="color:#8691a5">正常</span></li>
                        <!-- <li v-if="talk_number==0" style="color:#8691a5">抢话次数：无</li>
                        <li v-if="talk_number>0">抢话次数：<span style="color:red">{{talk_number}}次</span></li>
                        <li v-if="talk_time==0" style="color:#8691a5">抢话时长：无</li>
                        <li v-if="talk_time>0">抢话时长：<span style="color:red">{{talk_time}}秒</span></li> -->
                        <li v-if="speed>119">语速：<span style="color:red">{{speed}}字/分</span></li>
                        <li v-if="speed<120" style="color:#8691a5">语速：{{speed}}字/分</li>
                        <li v-if="silence_number==0" style="color:#8691a5">静默次数：无</li>
                        <li v-if="silence_number>0">静默次数：<span style="color:red">{{silence_number}}次</span></li>
                        <li v-if="silence_duration==0" style="color:#8691a5">静默时长：无</li>
                        <li v-if="silence_duration>0">静默时长：<span style="color:red">{{silence_duration}}秒</span></li>
                        <li>敏感词：</li>
                        <ul class="two" v-show="sensitive_word.length>0">
                            <li v-for="(item,index) in sensitive_word" :key='index'>{{item}}</li>
                        </ul>
                    </ul>
                </div>
                <div class="judge">
                    <p>质检评分</p>
                    <ul class="one">
                        <li>评分结果：<span :class="score_result=='及格'?'judgeresult01':'judgeresult02'">{{score_result}}</span></li>
                        <li>违禁结果:</li>
                        <ul class="two" v-show="violate_result.length>0">
                            <li v-for="(item,index) in violate_result" :key='index'>{{item}}</li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div class="voice">
                <span class="name01" :title="record_name">音频名称：{{record_name.length>10 ? record_name.substring(0,10)+'...'  : record_name}}</span>
                <audio :src="record_url" controls="controls" loop="loop" class="voicecss" controlslist="nodownload"></audio>
                <a :href="record_url_download" download>下载</a>
                <router-link to="/Task" class="return"><button style="font-size: 14px;">返回上一页</button></router-link>
                <!-- <aplayer autoplay controls class="voicecss"
                :music="{
                    title: record_name,
                    artist: ' ',
                    src: record_url,
                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                }"
                /> -->
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Head from '@/components/Head'
import Aplayer from 'vue-aplayer'
export default {
    name: 'Index',
    data () {
        return {
        checked1:true,
        checked2:false,
        customer_emotion:'无',
        service_emotion:'无',
        talk_number:'',
        talk_time:'',
        speed:'',
        sensitive_word:[],
        score_result:'',
        violate_result:[],
        record_time:'',
        task_name:'',
        record_url:'',
        tra_res_list:[],
        ins_id:'',
        record_name:'',
        silence_number:'',
        silence_duration:'',
        record_url_download:''
        }
    },
    filters: {
        clearString: function (value) {
            if (value == '客服') {
                return ''
            } else {
                return ''
            }
        }
    },
    mounted(){
        let url = window.location.href;
        document.title = url;
        this.ins_id = this.$route.params.id
        this.GetResult()
    },
    methods:{
        GetResult(){
            this.axios.get('/merchant/v2.0/inspection/transfer_result?ins_id='+this.ins_id)
            .then(response => {  
                if(response.data.status == 200){
                    this.customer_emotion = response.data.data.ins_res_dict.customer_emotion
                    this.service_emotion = response.data.data.ins_res_dict.service_emotion
                    this.talk_number = parseInt(response.data.data.ins_res_dict.talk_number) 
                    this.talk_time = parseInt(response.data.data.ins_res_dict.talk_time) 
                    this.speed = parseInt(response.data.data.ins_res_dict.speed)  
                    this.sensitive_word = response.data.data.ins_res_dict.sensitive_word
                    this.score_result = response.data.data.ins_res_dict.score_result
                    this.violate_result = response.data.data.ins_res_dict.violate_result
                    this.record_time = response.data.data.int_ins_dict.record_time
                    this.task_name = response.data.data.int_ins_dict.task_name
                    this.record_url = response.data.data.int_ins_dict.xunfei_wav_url
                    this.record_url_download = response.data.data.int_ins_dict.record_url
                    this.tra_res_list = response.data.data.tra_res_list
                    this.record_name = response.data.data.int_ins_dict.record_name
                    this.silence_duration = parseInt(response.data.data.ins_res_dict.silence_duration) 
                    this.silence_number = parseInt(response.data.data.ins_res_dict.silence_number)
                    if(this.sensitive_word.length==1){
                        if(this.sensitive_word[0] ==''){
                            this.sensitive_word[0] = '无'
                        }
                    }
                    if(this.sensitive_word.length==1){
                        if(this.violate_result[0] ==''){
                            this.violate_result[0] = '无'
                        }
                    }

                } 
            }) 
        }
    },
    components:{
        Head,
        Aplayer
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
        width: 1100px;
        height: 780px;
        position: relative;
        top: 20px;
        margin: 0 auto;
        border: 1px solid #d6d6d6;
        .language{
          width: 100%;
          text-align: center;
          font-size: 24px;
          padding-top: 30px;
          padding-bottom: 30px;
          background: #fff;
        }
        .result{
            width: 1099px;
            height: 630px;
            border-top: 1px solid #d6d6d6;
            border-bottom: 1px solid #d6d6d6;
            position: absolute;
            .head{
                width: 1099px;
                height: 63px;
                background: #fff;
                font-family: '微软雅黑';
                .name{
                    line-height: 65px;
                    color: #666;
                    font-size: 18px;
                    position: absolute;
                    left: 60px;
                    font-family: '微软雅黑';
                }
                .time{
                    line-height: 65px;
                    color: #666;
                    font-size: 18px;
                    position: absolute;
                    right: 60px;
                    font-family: '微软雅黑';
                }
            }
            .talk{
                width: 680px;
                height: 563px;
                display: inline-block;
                border-top: 1px solid #d6d6d6;
                position: absolute;
                top: 63px;
                left: 0px;
                ul{
                    width: 678px;
                    height: 526px; 
                    background: #f5f5f5;
                    overflow: auto;
                    padding-top:40px;
                    li{
                        width: 660px;
                        height: auto;
                        display:inline-block;
                        line-height:24px;
                        font-family: '微软雅黑';
                        .guesthead01{
                            width: 36px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            left: 16px;
                            background: #fff;
                            background: url(../assets/customer.png);
                            background-size:36px 36px;
                            border-radius: 20px;
                        }
                        .guestcontext01{
                            max-width: 300px;
                            word-wrap: break-word;word-break: break-all;
                            height: auto;
                            position: relative;
                            left: 60px;
                            top: -34px;
                            background: #fff;
                            border-radius: 6px;
                            line-height: 24px;
                            border: 1px solid #ededed;
                            float:left;
                            padding: 6px;
                            display: block;
                            font-size: 16px;
                            font-family: '微软雅黑';
                        }
                        .guesthead02{
                            width: 36px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            top: -10px;
                            left: 623px;
                            background: url(../assets/aimi.png);
                            background-size:36px 36px;
                            border-radius: 20px;
                        }
                        .guestcontext02{
                            max-width: 300px;
                            word-wrap: break-word;word-break: break-all;
                            height: auto;
                            position: relative;
                            right: 44px;
                            top: -45px;
                            background: #9eea6a;
                            border-radius: 6px;
                            line-height: 24px;
                            border: 1px solid #ededed;
                            float:right;
                            padding: 6px;
                            font-size: 16px;
                            font-family: '微软雅黑';  
                        }
                        
                        .guestcontext01:before,.guestcontext02:after{   /*用伪类写出小三角形*/
                            content: '';
                            display: block;
                            width: 0;
                            height: 0;
                            border: 8px solid transparent;
                            position: absolute;
                            top: 11px;
                        }
                        /*分别给左右两边的小三角形定位*/
                        .guestcontext01:before{    
                            border-right: 8px solid #fff;
                            left: -16px;
                        }
                        .guestcontext02:after{    
                            border-left: 8px solid #9EEA6A;
                            right: -16px;
                        }
                    }
                }
            }
            .how{
                width: 419px;
                height: 345px;
                display: inline-block;
                position: absolute;
                top: 63px;
                right: -1px;
                border: 1px solid #d6d6d6;
                border-right:none;
                background: #fff;
                font-family: '微软雅黑';
                .one{
                  width: 416px;
                  height: 322px;
                  padding-top:16px;
                  li{
                      font-size: 16px;
                      padding: 10px;
                      padding-left: 20px;
                      color: #8691a5;
                  }  
                }
                .two{
                  width: 330px;
                  height: 102px;
                  font-size: 16px;
                  position: relative;
                  left: 86px;
                  top: -30px;
                  overflow: auto;
                  li{
                      float: left;
                      margin: 4px;
                      margin-right: 12px;
                      padding-right: 20px;
                      width: auto;
                      height: auto;
                      text-align: center;
                      background:rgb(243, 55, 55);
                      border-radius: 16px;
                      color: #fff;
                      padding: 4px;
                      padding-left: 10px;
                      padding-right: 10px;
                  }
                }
            }
            .judge{
                width: 419px;
                height: 220px;
                display: inline-block;
                position: absolute;
                right: -1px;
                top: 410px;
                border-left: 1px solid #d6d6d6;
                background: #fff;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    padding-top: 30px;
                    padding-bottom: 30px;
                    font-weight: bold;
                }
                .one{
                  width: 416px;
                  height: 134px;
                  position: relative;
                  top: -14px;
                  li{
                      font-size: 16px;
                      padding: 10px;
                      padding-left: 20px;
                      color: #8691a5;
                  }
                    .judgeresult01{
                        color:#8691a5;
                        font-weight: bold;
                    }
                    .judgeresult02{
                        color:red;
                        font-weight: bold;
                    }  
                }
                .two{
                  width: 320px;
                  height: 102px;
                  font-size: 18px;
                  position: relative;
                  left: 96px;
                  top: -32px;
                  overflow: auto;
                  li{
                      float: left;
                      margin: 4px;
                      margin-right: 12px;
                      padding-right: 20px;
                      width: auto;
                      height: auto;
                      text-align: center;
                      background:rgb(243, 55, 55);
                      border-radius: 16px;
                      color: #fff;
                      padding: 4px;
                      padding-left: 10px;
                      padding-right: 10px;
                  }
                }
            }
        }

        .voice{
            width: 1100px;
            height: 70px;
            position: absolute;
            bottom: 0px;
            .name01{
                display: inline-block;
                line-height: 55px;
                color: #8691a5;
                font-size: 16px;
                position: relative;
                width: 200px;
                height: 54px;
                left: 10px;
                top: 11px;
                border-radius: 20px;
                text-align: center;
                overflow: hidden;
                background: #f1f3f4;
                font-family: '微软雅黑';
            }
            .voicecss{
                width: 736px;
                height: 52px;
                position: absolute;
                left: 220px;
                top: 12px;
            }
            a{
                position: relative;
                left: 756px;
                top: -12px;
                width: 40px;
                height: 52px;
                font-size: 16px!important;
                font-family: '微软雅黑';
                color: #8691a5;
                background: #f1f3f4;
                display: inline-block;
                line-height: 50px;
                padding-left: 2px;
                border-radius: 8px;
            }
            .return{
                position: relative;
                right: 14px;
                top: -12px;
                width: 80px;
                height: 40px;
                cursor: pointer;
                border-radius: 8px;
                font-size: 16px!important;
                font-family: '微软雅黑';
                button{
                    font-size: 16px!important;
                    width: 90px;
                    height: 52px;
                    cursor: pointer;
                    background: #f1f3f4;
                    color: #8691a5;
                    border-radius: 8px;
                    font-family: '微软雅黑';
                    padding-left: 4px;
                    padding-right: 4px;
                }
                button:hover{
                    color: #000;
                }
            }
        }
      }
    }
  }
}
.aplayer{
  color: #fff;
}
.aplayer .aplayer-body .aplayer-info .aplayer-music .aplayer-author{
  color: #fff;
}
.aplayer-icon .aplayer-icon-mode{
    display: none;
}
</style>
