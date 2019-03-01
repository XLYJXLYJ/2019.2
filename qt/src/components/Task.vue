<template>
  <div class="index">
      <Head></Head>
      <div class="head-content">
        <div class="head-content-center">
          <div class="task-concent">
            <p class="language">我的任务</p>
            <div class="show-task">
                <ul class="show-task-head">
                    <li>任务名称</li>
                    <li>录音名称</li>
                    <li>录音类型</li>
                    <li>客户姓名</li>
                    <li>录音时长</li>
                    <li>全部状态</li>
                    <li>操作</li>
                </ul>
                <ul class="show-task-context">
                    <li v-for="(item,index) in task" :key='index'>
                        <div class="time"><p>{{item.create_time}}</p><img src="../assets/delete.png" alt="" @click="Delete(item.id)"></div>
                        <div class="detail">
                            <p class="detail-context" :title="item.task_name">{{item.task_name}}</p>
                            <p class="detail-context" :title="item.record_name">{{item.record_name.length>10 ? item.record_name.substring(0,10)+'...'  : item.record_name}}</p>
                            <p class="detail-context" :title="item.record_type">{{item.record_type}}</p>
                            <p class="detail-context" :title="item.record_type">{{item.customer_name}}</p>
                            <p class="detail-context" :title="item.record_time">{{item.record_time}}</p>
                            <p class="detail-context" :title="item.status_name">{{item.status_name}}</p>
                            <p class="detail-context" v-show="!item.record_status"><el-button type="danger" @click="Delete(item.id)">取消任务</el-button></p>
                            <p class="detail-context" v-show="item.record_status"><router-link :to="`/Result/${item.id}`"><el-button type="success">查看结果</el-button></router-link></p>
                        </div>
                    </li>
                </ul>
                <div class="page" v-show="pageShow">
                    <el-pagination
                        :current-page.sync="currentPage"
                        @current-change ="handleCurrentChange"
                        @prev-click="Selectpagebefore"
                        @next-click="Selectpageafter"
                        layout="prev, pager, next"
                        :total="totalPageNum">
                    </el-pagination>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Head from '@/components/Head'
import Qs from 'qs'
  export default {
    data() {
      return {
        qtTrasversion:'',
        cancelTask:'',
        task:[],
        totalPageNum:0,
        cur_page:'',
        currentPage:1,//当前页数
        intervalid:'', //定时器
        pageShow:true
      }
    },
    created(){
        this.GetTask()
        this.intervalid = setInterval(() => {
            this.GetTask()
        },20000)
        this.currentPage = parseInt(localStorage.getItem('page')) || 1
    },
    // mounted(){
    //     this.intervalid = setInterval(() => {
    //         this.GetTask()
    //     },2000)
    // },
    destroyed () {
        clearInterval(this.intervalid)
    },
    methods:{
        GetTask(){
            this.axios.get('/merchant/v2.0/inspection/inspection_task?pageSize=' + parseInt(localStorage.getItem('page')))
            .then(response => {  
                this.task = response.data.data.logs_dict_list
                if(this.task.length==0){
                    this.cur_page = this.cur_page-1
                     localStorage.setItem('page',this.cur_page)
                    this.axios.get('/merchant/v2.0/inspection/inspection_task?pageSize=' + parseInt(localStorage.getItem('page')))
                    .then(response => { 
                        if(response.data.status == 200){
                            this.task = response.data.data.logs_dict_list
                            this.totalPageNum = response.data.data.total_page*10
                        } 
                    }) 
                    // if(this.cur_page == 0){
                    //     this.pageShow = false
                    //     this.$message({
                    //         type: 'info',
                    //         message: '任务为空'
                    //     });  
                    // }
                }
                this.totalPageNum = response.data.data.total_page*10
            })
        },
        Delete(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios.post('/merchant/v2.0/inspection/inspection_task',
                    Qs.stringify({
                        ins_id:id,
                    })
                )
                .then(response => {  
                    if(response.data.status == 200){
                        this.GetTask()
                    }
                }) 
                
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        // routeResult(id){
        //     this.$router.push({
        //         name: 'Result',
        //         params: {
        //             id: id
        //         }
        //     })
        // },
        //获取当前页数
        handleCurrentChange(val){
            this.cur_page = val;
            localStorage.setItem('page',this.cur_page)
            this.GetTask()
        },
        // 前页数
        Selectpagebefore(){
            this.cur_page = this.cur_page-1
            localStorage.setItem('page',this.cur_page)
            this.GetTask()
        },
        // 后页数
        Selectpageafter(){
            this.cur_page = this.cur_page+1
            localStorage.setItem('page',this.cur_page)
            this.GetTask()
        },
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
        height: 800px;
        position: relative;
        top: 20px;
        margin: 0 auto;
        .language{
          width: 100%;
          text-align: center;
          font-size: 24px;
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .show-task{
            width: 1100px;
            height: 700px;
            .show-task-head{
                width: 1099px;
                height: 54px;
                background: #F5F5F5;
                li{
                    float: left;
                    width: 156px;
                    text-align: center;
                    font-size: 16px;
                    color: #666;
                    line-height: 55px;
                }
            }
            .show-task-context{
                margin-top: 10px;
                li{
                    height: 107px;
                    width: 1098px;
                    margin-top: 10px;
                    border:1px solid #d6d6d6;
                    .time{
                        width: 1097px;
                        height: 46px;
                        background-color: #F5F5F5;
                        position: relative;
                        left: 0px;
                        border-bottom:1px solid #d6d6d6;
                        p{
                            color: #666;
                            font-size: 18px;
                            position: relative;
                            top: 14px;
                            padding-left: 10px;
                        }
                        img{
                            width: 25px;
                            height: 25px;
                            position: relative;
                            left: 1000px;
                            top: -8px;
                        }
                    }
                    .detail{
                        width: 1097px;
                        height: 88px;
                        position: relative;
                        border-bottom: none;
                        .detail-context{
                            display: inline-block;
                            width: 152px;
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            color: #666;
                            font-size: 14px;
                            border-left:1px solid #d6d6d6;
                        }
                    }
                }
            }
            .page{
                text-align: center;
                margin: 20px;
            }
        }
      }
    }
  }
}
// .el-button{
//   background: #524AE7;
//   color: #fff;
// }
// .el-button--primary{
//   border-color:#524AE7;
// }
</style>

