<template>
  <div class="index">
      <Head></Head>
      <div class="head-content">
        <div class="head-content-center">
          <div class="my-task">
              <router-link to="/Qt">
                <img src="../assets/back.png">
                <span class="new-task">返回上一层</span>
            </router-link>
          </div>
          <div class="task-concent">
            <!-- <p class="language">质检结果</p> -->
            <div class="result">
                <div class="head">
                    <span class="name">任务名称：{{task_name}}</span>
                    <span class="name01" :title="record_name">音频名称：{{record_name.length>6 ? record_name.substring(0,6)+'...'  : record_name}}</span>
                    <span class="name02" v-if="!customer_name">客户姓名： - - -</span>
                    <span class="name02" v-if="customer_name">客户姓名：{{customer_name}}</span>
                    <span class="time">{{record_time}}</span>
                </div>
                <div class="talk">
                    <ul class="talkul">
                        <li v-for="(item,index) in tra_res_list" :key="index" class="talkUlLi" @click="clickText(item.start_time)">
                            <p :class="item.direction==2?'guesthead02':'guesthead01'">{{item.speaker | clearString}}</p>
                            <div :class="{'guestcontext02':item.direction==2,'guestcontext01':item.direction!==2}" :style="index==selectIndex?'background:#143352;color:#fff':''"><span v-html="item.content"></span></div>
                            <span v-show="item.direction==2 && item.str_violate_word" class="stop">{{item.str_violate_word}}</span>
                        </li>
                    </ul>
                </div>
                <div class="how">
                    <p>语音特征</p>
                    <ul class="one">
                        <li v-if="customer_emotion>7">客户情绪：<span style="color:#FF5252">高涨</span></li>
                        <li v-if="customer_emotion<8">客户情绪：<span style="color:#525252">正常</span></li>
                        <li v-if="service_emotion>7">客服情绪：<span style="color:#FF5252">高涨</span></li>
                        <li v-if="service_emotion<8">客服情绪：<span style="color:#525252">正常</span></li>
                        <!-- <li v-if="talk_number==0" style="color:#525252">抢话次数：无</li>
                        <li v-if="talk_number>0">抢话次数：<span style="color:red">{{talk_number}}次</span></li>
                        <li v-if="talk_time==0" style="color:#525252">抢话时长：无</li>
                        <li v-if="talk_time>0">抢话时长：<span style="color:red">{{talk_time}}秒</span></li> -->
                        <li v-if="silence_number==0" style="color:#525252">静默次数：无</li>
                        <li v-if="silence_number>0">静默次数：<span style="color:#FF5252">{{silence_number}}次</span></li>
                        <li v-if="silence_duration==''" style="color:#525252">静默时长：无</li>
                        <li v-if="silence_duration>0">静默时长：<span style="color:#FF5252">{{silence_duration}}秒</span></li>
                        <li v-if="speed>119">语速：<span style="color:#FF5252">{{speed}}字/分</span></li>
                        <li v-if="speed<120" style="color:#525252">语速：{{speed}}字/分</li>
                    </ul>
                </div>
                <div class="judge">
                    <p>质检结果</p>
                    <ul class="one">
                        <li>评分结果：<span :class="score_result=='及格'?'judgeresult01':'judgeresult02'">{{score_result}}</span></li>
                        <!-- <ul class="two" v-show="violate_result.length>0">
                            <li v-for="(item,index) in violate_result" :key='index'>{{item}}</li>
                        </ul> -->
                        <!-- <table>
                            <tr>
                                <td>违禁词</td>
                                <td>扣分结果</td>
                            </tr>
                            <tr v-for="(item,index) in violate_result" :key='index'>
                                <td>{{index}}</td>
                                <td v-if="item==''">无</td>
                                <td v-else style="color:red;">有</td>
                                
                            </tr>
                        </table> -->
                        <ul class="tableUl">
                            <li><span class="tableone">扣分类型</span><span class="tabletwo" style="color:#525252">扣分结果</span></li>
                            <li v-for="(item,index) in violate_result" :key='index'>
                                <!-- <span class="tableone" :style="item==''?'background:#fff;color:#525252':'color:#ff5252'">{{index}}</span> -->
                                <span class="tableone" v-if="item==''" style='background:#fff;color:#525252'>{{index}}</span>
                                <span class="tableone" v-if="item!==''" style='background:#fff;color:#FF5252;'>{{index}}</span>
                                <span class="tabletwo" v-if="item==''" style='background:#fff;color:#525252'>无</span>
                                <span class="tabletwo" v-if="item!==''" style='background:#fff;color:#FF5252;'>{{item}}</span>
                                <!-- <span class="tabletwo" :style="item==''?'background:#fff;color:#525252':''">{{item==''?'无':'有'}}</span> -->
                            </li>
                        </ul>
                        <li style="margin-top:26px">敏感词：</li>
                        <ul class="two2" v-show="sensitive_word.length>0">
                            <li v-for="(item,index) in sensitive_word" :key='index' :style="item=='无'?'background:#fff;color:#525252':''">{{item}}</li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div class="voice">
                <!-- <span class="name01" :title="record_name">音频名称：{{record_name.length>10 ? record_name.substring(0,10)+'...'  : record_name}}</span> -->
                <audio :src="record_url" controls="controls" loop="loop" class="voicecss" controlslist="nodownload" @click="UpdateProgress()"></audio>
                    
                    <a :href="record_url_download" download><img src="../assets/download.png"></a>

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
// import { setInterval } from 'timers';
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
        record_url_download:'',
        customer_name:'',
        audioMsg:'',
        currentAudioTime:'',
        selectIndex:'',
        timeIndex:''
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
        this.timeIndex = setInterval(() => this.UpdateProgress(),100)
        if(screen.width>1500){
            // document.getElementsByClassName('head-content-center')[0].setAttribute('style','padding-top:100px;padding-bottom:100px')
        }else{
            console.log('ok')
        }
    },
    beforeDestroy() {
        clearInterval(this.timeIndex);        
        this.timeIndex = null;
    },
    watch:{
        currentAudioTime:function(){
             let this_ = this
             let audioTime =document.getElementsByTagName('audio')[0].currentTime*1000;
             let audioDuration = document.getElementsByTagName('audio')[0].duration*1000;
             let scrollTop =document.getElementsByClassName('talkUlLi');
            //  console.log(document.getElementsByClassName('talkUlLi'))
             this_.tra_res_list.map(
                 function(key,value){
                     if(key.start_time<audioTime&&key.end_time>audioTime){
                        this_.selectIndex = value
                        }
                 }
             )
        },
        selectIndex:function(){
            let this_ = this
            let audioTime =document.getElementsByTagName('audio')[0].currentTime*1000;
            let audioDuration = document.getElementsByTagName('audio')[0].duration*1000;
            let scrollTop =document.getElementsByClassName('talkUlLi');
            this_.tra_res_list.map(
                 function(key,value){
                     if(key.start_time<audioTime&&key.end_time>audioTime){
                        let maxHeight = document.getElementsByClassName('talkUlLi')[value-1].offsetTop
                        let minHeight = document.getElementsByClassName('talkul')[0].scrollTop
                        let middleHeight = maxHeight -minHeight
                        var otherValue = value
                        console.log(maxHeight)
                        console.log(minHeight)
                        // if(middleHeight>=700){
                        //     otherValue = otherValue + 1
                        // }else if(middleHeight<700 && middleHeight>=600){
                        //     otherValue = otherValue + 1
                        // }else if(middleHeight<600 && middleHeight>=560){
                        //     otherValue = otherValue
                        // }else if(middleHeight<560 && middleHeight>=270){
                        //     otherValue = otherValue -1
                        // }else if(middleHeight<270 && middleHeight>=110){
                        //     otherValue = otherValue - 2
                        // }else if(middleHeight<120 && middleHeight>=0){
                        //     otherValue = otherValue - 3
                        // }else{
                        //     otherValue = otherValue - 3
                        // }
                        let howDouble = middleHeight/100
                            document.getElementsByClassName('talkul')[0].scrollTop = maxHeight
                        }
                 }
             )
        }
    },
    methods:{
        clickText(time){
            let timer =parseInt(time/1000) + 1.5; //js获取的方式
            document.getElementsByTagName('audio')[0].currentTime = timer
        },
        UpdateProgress() {
            this.currentAudioTime = document.getElementsByTagName('audio')[0].currentTime
        },
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
                    this.record_time = '录音时长：' + response.data.data.int_ins_dict.record_time
                    this.task_name = response.data.data.int_ins_dict.task_name
                    this.record_url = response.data.data.int_ins_dict.xunfei_wav_url
                    this.record_url_download = response.data.data.int_ins_dict.record_url
                    let head = this.record_url_download.substring(0,23)
                    // if(head == 'http://open.qb-tech.net'){
                    //     this.record_url_download =  this.record_url_download.substring(23)
                    // }else{
                    //     this.record_url_download =  this.record_url_download.substring(28)
                    // }
                    this.tra_res_list = response.data.data.tra_res_list
                    this.record_name = response.data.data.int_ins_dict.record_name
                    this.silence_duration = parseInt(response.data.data.ins_res_dict.silence_duration) 
                    this.silence_number = parseInt(response.data.data.ins_res_dict.silence_number)
                    this.customer_name = response.data.data.int_ins_dict.customer_name
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
    .select-li{
        display: block;
        width: 100%;
        height: 100%;
        background: #d4d3d6!important;
        color: #000!important;
        border-radius: 6px;
    }
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #fff;
  .head-content{
    width: 100%;
    min-height: 920px;
    position: relative;
    margin-bottom: -50px;
    background: #fff;
    .head-content-center{
      width: 1200px;
      min-height: 780px;
      position: relative;
      top: 0px;
      margin: 0 auto;
      background: #fff;
    //   border: 1px solid #dddddd;
      .my-task{
        width: 1200px;
        height: 15px;
        margin: 0 auto;
        padding: 0px;
        // border-bottom: 1px solid #dddddd;
        color: #868686;
        position: relative;
        top: 27px;
        font-size:18px;
        font-family:FZY4JW--GB1-0;
        font-weight:550;
        cursor: pointer;
        .new-task{
            position: relative;
            top: 2px;
            left: 9px;
            font-size:18px;
            color: #868686;
        }
      }
      .task-concent{
        width: 1200px;
        height: 770px;
        position: relative;
        top: 65px;
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
            width: 1200px;
            height: 712px;
            border-bottom: 1px solid #d6d6d6;
            position: absolute;
            .head{
                width: 1200px;
                height: 90px;
                background: #fff;
                font-family: '微软雅黑';
                .name{
                    display: inline-block;
                    width: 250px;
                    line-height: 50px;
                    color: #666;
                    font-size: 18px;
                    position: relative;
                    left: 35px;
                    top: 20px;
                    font-family: 'PingFangRegular';
                    font-weight:550;
                
                }
                .name01{
                    display: inline-block;
                    color: #666;
                    font-size: 18px;
                    position: relative;
                    width: 250px;
                    left: 90px;
                    top: 20px;
                    font-family: 'PingFangRegular';
                    font-weight:550;
                }
                .name02{
                    display: inline-block;
                    color: #666;
                    font-size: 18px;
                    position: relative;
                    width: 250px;
                    left: 190px;
                    top: 20px;
                     font-family: 'PingFangRegular';
                     font-weight:550;
                }
                .time{
                    width: 250px;
                    color: #666;
                    font-size: 18px;
                    position: relative;
                    left: 245px;
                    top: 20px;
                    font-family: 'PingFangRegular';
                    font-weight:550;
                }
            }
            .talk{
                width: 683px;
                height: 786px;
                display: inline-block;
                border-top: 1px solid #d6d6d6;
                position: absolute;
                top: 90px;
                left: 0px;
                ul{
                    width: 689px;
                    height: 581px; 
                    background: #f5f5f5;
                    overflow: auto;
                    padding-top:40px;
                    li{
                        width: 660px;
                        height: auto;
                        display:inline-block;
                        line-height:24px;
                        .stop{
                            width: auto;
                            height:auto;
                            background:#FF5252;
                            padding-top:6px;
                            padding-bottom:6px;
                            padding-left:12px;
                            padding-right:12px;
                            border-radius: 10px;
                            color: #fff;
                            font-size: 16px;
                            float: right;
                            margin-right: 120px;
                            margin-top: -72px;
                            word-wrap: break-word;
                            max-width: 160px;
                        }
                        .guesthead01{
                            width: 68px;
                            height: 68px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            left: 33px;
                            background: #fff;
                            background: url(../assets/customer.png);
                            background-size:68px 68px;
                            border-radius: 20px;
                        }
                        .guestcontext01{
                            max-width: 300px;
                            word-wrap: break-word;
                            height: auto;
                            position: relative;
                            left: 130px;
                            top: -68px;
                            background: #fff;
                            border-radius:0px 12px 12px 12px;
                            line-height: 24px;
                            float:left;
                            padding: 20px;
                            display: block;
                            font-size: 20px;
                            color: #2F2F2F;
                            font-family: 'PingFangRegular';
                            font-weight:550;
                            box-shadow:0px 3px 9px 0px rgba(82, 82, 82, 0.35);
                        }
                        .guesthead02{
                            width: 68px;
                            height: 68px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            top: -10px;
                            left: 573px;
                            background: url(../assets/aimi.png);
                            background-size:68px 68px;
                            border-radius: 20px;
                        }
                        .guestcontext02{
                            max-width: 300px;
                            word-wrap: break-word;
                            height: auto;
                            position: relative;
                            right: 110px;
                            top: -77px;
                            background: #5795D2;
                            border-radius:12px 0px 12px 12px;
                            line-height: 24px;
                            float:right;
                            padding: 20px;
                            font-size: 20px;
                            color: #fff;
                            font-family: 'PingFangRegular';
                            font-weight:550;
                            box-shadow:0px 3px 9px 0px rgba(82, 82, 82, 0.35);
                            display: inline-block;
                        }
                        
                        // .guestcontext01::before,.guestcontext02::after{   /*用伪类写出小三角形*/
                        //     content: '';
                        //     display: block;
                        //     width: 0;
                        //     height: 0;
                        //     border: 8px solid transparent;
                        //     position: absolute;
                        //     top: 8px;
                        // }
                        // /*分别给左右两边的小三角形定位*/
                        // .guestcontext01::before{    
                        //     border-right: 8px solid #fff;
                        //     left: -16px;
                        // }
                        // .guestcontext02::after{    
                        //     border-left: 8px solid #9EEA6A;
                        //     right: -16px;
                        // }
                    }
                }
                ul::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 271px;
                }
                ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px #D5DCE4;
                    background: #D5DCE4;
                }
                ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px #D5DCE4;
                    border-radius: 10px;
                    background: #EDEDED;
                }
            }
            .how{
                width: 510px;
                height: 243px;
                display: inline-block;
                position: absolute;
                top: 90px;
                right: -1px;
                border-top: 1px solid #d6d6d6;
                border-right: 1px solid #d6d6d6;
                background: #fff;
                font-family: 'PingFangRegular';
                font-weight:550;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 26px;
                    padding-top: 33px;
                    padding-bottom: 29px;
                    font-weight: bold;
                    color: #525252;
                }
                .one{
                  width: 448px;
                  height: 160px;
                  padding-top:6px;
                  position: relative;
                  top: -16px;
                  left: 38px;
                  border-bottom: 1px solid #d6d6d6;
                  li{
                      float: left;
                      width: 210px;
                      font-size: 20px;
                      padding: 14px;
                      padding-left: 0px;
                      color: #525252;
                      font-family: 'PingFangRegular';
                      font-weight:550;
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
                width: 510px;
                height: 378px;
                display: inline-block;
                position: absolute;
                right: -1px;
                top: 334px;
                background: #fff;
                border-right: 1px solid #d6d6d6;
                font-family: 'PingFangRegular';
                font-weight:550;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 26px;
                    padding-top: 33px;
                    padding-bottom: 29px;
                    font-weight: bold;
                    color: #525252;
                }
                .one{
                  width: 476px;
                  height: 304px;
                  position: relative;
                  top: -14px;
                  left: 34px;
                  border-bottom: 1px solid #d6d6d6;
                  color: #525252;
                  font-family: 'PingFangRegular';
                  font-weight:550;
                  overflow: auto;
                  table{
                    width: 423px;
                    height: 106px;
                    position: relative;
                    left: 0px;
                    top: 12px;
                    tr{
                        border: 1px solid #d6d6d6;
                        td{
                            border-left: 1px solid #d6d6d6;
                            text-align: center;
                            font-size: 20px!important;
                            color: #525252;
                            font-family: 'PingFangRegular';
                            font-weight:550;
                            padding: 10px;
                        }
                    }
                  }
                  .tableUl{
                      width: 423px;
                      height: auto;
                      border:1px solid rgba(160,160,160,1);
                      border-radius:10px;
                      position: relative;
                      left: 10px;
                      top: 10px;
                      li{
                          height: 18px;
                          text-align: center;
                          margin-left: 20px;
                          margin-right:20px;
                          .tableone{
                              width: 240px;
                              display: inline-block;
                              border-right: 1px solid rgba(160,160,160,1);
                          }
                          .tabletwo{
                              padding-left: 10px;
                              width: 100px;
                              display: inline-block;
                              color: #FF5252;
                          }
                      }
                      li:first-child{
                          border-bottom:1px solid rgba(160,160,160,1);
                      }

                  }
                  li{
                      font-size: 20px;
                      padding: 10px;
                      color: #525252;
                      font-family: 'PingFangRegular';
                      font-weight:550;
                  }
                    .judgeresult01{
                      font-size: 20px;
                      color: #525252;
                      font-family: 'PingFangRegular';
                      font-weight:550;
                    }
                    .judgeresult02{
                      font-size: 20px;
                      color: #525252;
                      font-family: 'PingFangRegular';
                      font-weight:550;
                    }  
                }
                .one::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 271px;
                }
                .one::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px #fff;
                    background: #fff;
                }
                .one::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px #fff;
                    border-radius: 10px;
                    background: #fff;
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
                .two2{
                  width: 320px;
                  height: 102px;
                  font-size: 18px;
                  position: relative;
                  left: 76px;
                  top: -38px;
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
                      padding: 6px;
                      padding-left: 14px;
                      padding-right: 18px;
                      padding-bottom:6px;
                      font-size: 18px;
                  }
                }
            }
        }

        .voice{
            width: 1200px;
            height: 50px;
            position: absolute;
            bottom: 0px;
            .name01{
                display: inline-block;
                line-height: 55px;
                color: #525252;
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
                width: 1115px;
                height: 52px;
                position: absolute;
                top: -4px;
                outline:none;
            }
            img{
                position: relative;
                left: 0px;
                top: -3px;
            }
            a{
                position: relative;
                left: 1126px;
                top: -3px;
                width: 40px;
                height: 52px;
                font-size: 20px!important;
                font-family: 'PingFangRegular';
                font-weight:550;
                color: #666;
                display: inline-block;
                line-height: 50px;
                padding-left: 12px;
                padding-right:10px;
                border-radius: 0px 8px 8px 0px;
            }
            a:hover{
                color: #000;
            }
            .return{
                position: relative;
                right: 14px;
                top:14px;
                width: 80px;
                height: 52px;
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
                    color: #525252;
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
