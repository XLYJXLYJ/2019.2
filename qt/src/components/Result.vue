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
                            <p :class="item.direction==2?'guesthead02':'guesthead01'">{{item.speaker}}</p>
                            <span :class="{'guestcontext02':item.direction==2,'guestcontext01':item.direction!==2}" v-html="item.content"></span>
                        </li>
                    </ul>
                </div>
                <div class="how">
                    <ul class="one">
                        <li v-if="customer_emotion=='消极'" style="color:red">客户情绪：{{customer_emotion}}</li>
                        <li v-if="customer_emotion=='中性'" style="color:blue">客户情绪：{{customer_emotion}}</li>
                        <li v-if="customer_emotion=='积极'" style="color:green">客户情绪：{{customer_emotion}}</li>
                        <li v-if="service_emotion=='消极'" style="color:red">客服情绪：{{service_emotion}}</li>
                        <li v-if="service_emotion=='中性'" style="color:blue">客服情绪：{{service_emotion}}</li>
                        <li v-if="service_emotion=='积极'" style="color:green">客服情绪：{{service_emotion}}</li>
                        <li>抢话次数：{{talk_number}}次</li>
                        <li>抢话时长：2分钟</li>
                        <li>语速：{{speed}}</li>
                        <li>敏感词：</li>
                        <ul class="two" v-show="violate_result.length>1">
                            <li v-for="(item,index) in sensitive_word" :key='index'>{{item}}</li>
                        </ul>
                    </ul>
                </div>
                <div class="judge">
                    <p>质检结果</p>
                    <ul class="one">
                        <li :class="score_result=='及格'?'judgeresult01':'judgeresult02'">评分结果：{{score_result}}</li>
                        <li>违禁结果:</li>
                        <ul class="two" v-show="violate_result.length>1">
                            <li v-for="(item,index) in violate_result" :key='index'>{{item}}</li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div class="voice">
                <span class="name01" :title="record_name">音频名称：{{record_name.length>10 ? record_name.substring(0,10)+'...'  : record_name}}</span>
                <audio :src="record_url" controls="controls" loop="loop" class="voicecss">亲 您的浏览器不支持html5的audio标签</audio>
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
        customer_emotion:'',
        service_emotion:'',
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
        record_name:''
        }
    },
    mounted(){
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
                    this.talk_number = response.data.data.ins_res_dict.talk_number
                    this.talk_time = response.data.data.ins_res_dict.talk_time
                    this.speed = response.data.data.ins_res_dict.speed
                    this.sensitive_word = response.data.data.ins_res_dict.sensitive_word
                    this.score_result = response.data.data.ins_res_dict.score_result
                    this.violate_result = response.data.data.ins_res_dict.violate_result
                    this.record_time = response.data.data.int_ins_dict.record_time
                    this.task_name = response.data.data.int_ins_dict.task_name
                    this.record_url = response.data.data.int_ins_dict.record_url
                    this.tra_res_list = response.data.data.tra_res_list
                    this.record_name = response.data.data.int_ins_dict.record_name
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
          background: #f5f5f5;
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
                background: #f5f5f5;
                .name{
                    line-height: 65px;
                    color: #666;
                    font-size: 18px;
                    position: absolute;
                    left: 60px;
                }
                .time{
                    line-height: 65px;
                    color: #666;
                    font-size: 18px;
                    position: absolute;
                    right: 60px;
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
                        .guesthead01{
                            width: 36px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            left: 16px;
                            background: #fff;
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
                            line-height: 20px;
                            border: 1px solid #ededed;
                            float:left;
                            padding: 6px;
                            display: block;
                        }
                        .guesthead02{
                            width: 36px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                            top: -10px;
                            left: 623px;
                            background: #9eea6a;
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
                            line-height: 20px;
                            border: 1px solid #ededed;
                            float:right;
                            padding: 6px;
                        }
                    }
                }
            }
            .how{
                width: 419px;
                height: 285px;
                display: inline-block;
                position: absolute;
                top: 63px;
                right: -1px;
                border: 1px solid #d6d6d6;
                border-right:none;
                background: #e5e5e6;
                .one{
                  width: 416px;
                  height: 282px;
                  padding-top:12px;
                  li{
                      font-size: 16px;
                      padding: 7px;
                      padding-left: 20px;
                  }  
                }
                .two{
                  width: 386px;
                  height: 82px;
                  font-size: 18px;
                  position: relative;
                  left: 20px;
                  overflow: auto;
                  li{
                      float: left;
                      margin: 4px;
                      margin-right: 12px;
                      padding-right: 16px;
                      width: auto;
                      height: auto;
                      text-align: center;
                      background: red;
                      border-radius: 16px;
                      color: #fff;
                  }
                }
            }
            .judge{
                width: 419px;
                height: 280px;
                display: inline-block;
                position: absolute;
                right: -1px;
                top: 350px;
                border-left: 1px solid #d6d6d6;
                background: #e5e5e6;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 24px;
                    padding-top: 30px;
                    padding-bottom: 30px;
                    font-weight: bold;
                }
                .one{
                  width: 416px;
                  height: 194px;
                  li{
                      font-size: 16px;
                      padding: 8px;
                      padding-left: 20px;
                  }  
                }
                .two{
                  width: 386px;
                  height: 122px;
                  font-size: 18px;
                  position: relative;
                  left: 20px;
                  overflow: auto;
                  li{
                      float: left;
                      margin: 4px;
                      margin-right: 12px;
                      padding-right: 16px;
                      width: auto;
                      height: auto;
                      text-align: center;
                      background: red;
                      border-radius: 16px;
                      color: #fff;
                  }
                }
            }
        }
        .judgeresult01{
            color:green;
        }
        .judgeresult02{
            color:red;
        }
        .voice{
            width: 1100px;
            height: 70px;
            position: absolute;
            bottom: 0px;
            .name01{
                display: inline-block;
                line-height: 55px;
                color: #666;
                font-size: 14px;
                position: relative;
                width: 200px;
                height: 54px;
                left: 10px;
                top: 11px;
                border-radius: 20px;
                text-align: center;
                overflow: hidden;
                background: #f5f5f5;
            }
            .voicecss{
                width: 776px;
                height: 70px;
                position: absolute;
                left: 220px;
                top: -5px;
            }
            .return{
                position: absolute;
                right: 14px;
                top: 18px;
                width: 80px;
                height: 40px;
                cursor: pointer;
                border-radius: 8px;
                font-size: 14px;
                button{
                    font-size: 14px;
                    width: 80px;
                    height: 40px;
                    cursor: pointer;
                    background: #8180f8;
                    color: #fff;
                    border-radius: 8px;
                }
                button:hover{
                    color: #fff;
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
