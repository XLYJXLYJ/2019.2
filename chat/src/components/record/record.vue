<template>
  <div class="record clearfloat">
    <v_aside></v_aside>
    <v_head title="历史对话"></v_head>
    <div class="content clearfloat">
      <!-- <span class="record_title"><span>历史对话</span></span>-->
      <div class="condition clearfloat">
        <form method="get" action="/acs/v1.0/record_excel">
          <span>筛选：</span>
          <select @change="listen_robot" name="robot_code" class="robot_code">
            <option value="">按机器人编号</option>
            <option v-for="(rm , index) in robot_number" :keys="index">{{rm}}</option>
          </select>
          <select @change="listen_role" name="role" class="role">
            <option value="">按角色</option>
            <option value="service">客服</option>
            <option value="customer">客户</option>
          </select>
          <input name="start_date" id="datetimeStart" ref="datetimeStart" type="text" placeholder="开始时间"
                 readonly="readonly">
          <span>至</span>
          <input name="end_date" id="datetimeEnd" ref="datetimeEnd" type="text" placeholder="结束时间" readonly="readonly">
          <span class="search" @click="search_record">搜索</span>
          <input type="hidden" name="product_id" class='product_id' value=""/>
          <input type="submit" class="submit" value="提交"/>
          <span class="export" @click="submit">导出当前列表</span>
        </form>
        <table>
          <thead class="first">
          <tr>
            <th class="id">对话组ID</th>
            <th class="number">机器人编号</th>
            <th class="create">时间</th>
            <th>角色</th>
            <th>名称</th>
            <th>内容</th>
            <th>用户反馈</th>
          </tr>
          </thead>
          <thead>
          <tr v-for="(record,index) in records" :key="index">
            <td :title="record.id.length>8 ?  record.id:'' ">{{record.id.length>8 ? record.id.substring(0,8)+'...' :
              record.id}}
            </td>
            <td>{{record.robot_code}}</td>
            <td>{{record.create}}</td>
            <td>{{record.role}}</td>
            <td>{{record.name}}</td>
            <td :title="record.content.length>8 ?  record.content:'' ">{{record.content.length>8 ?
              record.content.substring(0,8)+'...' : record.content}}
            </td>
            <td>{{record.is_solve}}</td>
          </tr>
          </thead>
        </table>
       <!-- <div class="footer" v-show="totalPages>0">
          <span class="start" @click="firstPage">首页</span>
          <span class="pre" @click="prePage"></span>
          <span class="pages" :style="{width:pages_width+'px'}">
            <span class="pages_li"
                  :style="{width:pages_li_width+'px',transition:'all 600ms ease 0s', transform: 'translateX('+ translateX_width +'px)'}">
              <span class="page" :class="{active:index+1==initPageNo}" v-for="(totalPage,index) in totalPages"
                    @click="choose(index+1)">{{index+1}}</span>
            </span>
          </span>
          <span class="next" @click="nextPage"></span>
          <span class="end" @click="lastPage">末页</span>
          <span class="amount">共<span class="number">{{totalPages}}</span>页</span>
          <input type="text" v-model="ship_number"/>
          <span class="ship" @click="ship">跳转</span>
        </div>-->
      </div>
       <div class="footer" v-show="totalPages>0">
        <span class="start" @click="firstPage">首页</span>
        <span class="pre" @click="prePage"></span>
        <span class="pages" :style="{width:pages_width+'px'}">
          <span class="pages_li"
                :style="{width:pages_li_width+'px',transition:'all 600ms ease 0s', transform: 'translateX('+ translateX_width +'px)'}">
            <span class="page" :class="{active:index+1==initPageNo}" v-for="(totalPage,index) in totalPages"
                  @click="choose(index+1)">{{index+1}}</span>
          </span>
        </span>
        <span class="next" @click="nextPage"></span>
        <span class="end" @click="lastPage">末页</span>
        <span class="amount">共<span class="number">{{totalPages}}</span>页</span>
        <input type="text" v-model="ship_number"/>
        <span class="ship" @click="ship">跳转</span>
      </div>
    </div>
  </div>
</template>
<script>
  import v_aside from "../aside/aside"
  import v_head from "../head/head"

  export default {
    name: "record",
    data() {
      return {
        robot_number: [],
        service_number: [],
        records: "",
        initPageNo: "",
        totalPages: "",
        totalCount: "",
        pages_li_width: "",
        pages_width: "",
        translateX_width: 0,
        robot_code: "",
        start_data: "",
        end_data: "",
        ship_number: "",
        role: "",

      }
    },
    components: {
      v_aside,
      v_head
    },
    created: function () {
      this.$ajax.get('/acs/v1.0/robot_number').then(res => {
        this.robot_number = res.data.data;

      })
//      this.$ajax.get('/acs/v1.0/service_number').then(res=>{
//        this.service_number=res.data.data;
//        console.log(this.service_number[0].id)
//      })
    },
    mounted: function () {
      laydate.render({
        elem: '#datetimeStart', //指定元素
        type: 'datetime',
        done: function (value, date, endDate) {
          end.config.min = {
            year: date.year,
            month: date.month - 1,
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
        }
      });
      var end = laydate.render({
        elem: '#datetimeEnd', //指定元素
        type: 'datetime'
      });
      this.$ajax.get('/acs/v1.0/record_dialogs').then(res => {
        this.records = res.data.data.log_dict_list;
        this.initPageNo = res.data.data.current_page;
        this.totalPages = res.data.data.total_page;
        this.pages_width = this.totalPages > 5 ? 175 : this.totalPages * 35;
        this.pages_li_width = this.totalPages * 35
      })
//      var this_=this;
//      var timer= setInterval(function () {
//        this_.delCookie('s_token')
//        this_.delCookie('service_id')
//        this_.delCookie('company');
//        this_.delCookie('s_name');
//        this_.delCookie('date');
//        this_.delCookie('targetId');
//        this_.$router.push({'path': '/'});
//      },15000)
//      document.onkeydown=function(e){
//        timer_()
//      };
//      document.mousemove=function(e){
//        timer_()
//      };
//      document.mousedown=function(e){
//        timer_()
//      };
//      function  timer_() {
//        clearInterval(timer);
//        timer= setInterval(function () {
//        },15000)
//      }
//      function delCookie(name){
//        var exp = new Date();
//        exp.setTime(exp.getTime() - 1);
//        var cval=this.getCookie(name);
//        if(cval!=null)
//          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
//      }

    },
    methods: {
      submit() {
        $('.submit').click();
      },
      submit_() {
        console.log('1234');
      },
      ship() {
        if (this.ship_number && this.ship_number > 0 && this.ship_number <= this.totalPages) {
          this.choose(this.ship_number);
          this.ship_number = "";
        }
      },
      firstPage() {
        this.initPageNo = 1;
        this.translateX_width = 0;
        this.paging();
      },
      lastPage() {
        this.initPageNo = this.totalPages;
        this.translateX_width = 175 - this.pages_li_width;
        this.paging();
      },
      choose(data) {
        this.initPageNo = data;
        var flag = false
        var flag1 = false
        if (!(this.translateX_width == 0 && this.initPageNo <= 3)) {//第一页
          flag = true
        }
        if (!(this.initPageNo - 1 < this.totalPages && this.initPageNo - 1 >= this.totalPages - 2) || !(this.translateX_width + this.pages_li_width <= 175)) {
          flag1 = true
        }
        if (flag1 && flag) {
          this.translateX_width = -((this.initPageNo - 3) * 35);
          this.translateX_width = -this.translateX_width + 175 >= this.pages_li_width ? 175 - this.pages_li_width : this.translateX_width
          //if()
          this.translateX_width = this.translateX_width > 0 ? 0 : this.translateX_width;
        }


//        if(flag){
//          this.translateX_width =0;
//        }

        this.paging();
      },
      listen_robot(ele) {
        console.log(ele.target.value)
        this.robot_code = ele.target.value;
      },
      listen_role(ele) {
        console.log(ele.target.value);
        this.role = ele.target.value
      },
      search_record() {
        this.initPageNo = 1;
        this.translateX_width = 0;

        this.paging();
      },
      nextPage() {
        var number = this.initPageNo + 1 > this.totalPages ? this.totalPages : this.initPageNo + 1
        this.choose(number);
//        if(this.translateX_width+this.pages_li_width <=175){
//          if(!(this.initPageNo+1>this.totalPages)){
//            this.initPageNo +=1;
//          }
//        }else{
//          this.initPageNo +=1;
//          if(!(this.translateX_width==0&&this.initPageNo<=3)){
//            this.translateX_width -=35;
//          }
//        }
//        this.paging()
      },
      prePage() {
        var number = this.initPageNo > 2 ? this.initPageNo - 1 : 1
        this.choose(number);
//        if(this.translateX_width>=0){
//          if(this.initPageNo-1!=0){
//            this.initPageNo -=1;
//          }
//        }else{
//          if(this.initPageNo-1<this.totalPages&&this.initPageNo-1>=this.totalPages-2){
//            this.translateX_width +=35;
//          }
//          this.initPageNo -=1;
//        }
//        this.paging()
      },
      paging() {
        this.$ajax.get('/acs/v1.0/record_dialogs', {
          params: {
            role: this.role,
            start_date: this.$refs.datetimeStart.value,
            end_date: this.$refs.datetimeEnd.value,
            p: this.initPageNo,
            robot_code: this.robot_code
          }
        }).then(res => {
          this.records = res.data.data.log_dict_list;
          this.initPageNo = res.data.data.current_page;
          this.totalPages = res.data.data.total_page;
          this.pages_width = this.totalPages > 5 ? 175 : this.totalPages * 35;
          this.pages_li_width = this.totalPages * 35
        })
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .record {
    position relative
    height auto
    width 100%
   /* overflow hidden*/
    /*height: 100%;*/
    .content {
      /* position absolute*/
      /*position: relative
      left 150px
      top 80px*/
  /*    width calc(100vw - 170px)*/
      background #eef3f6
      /* height calc(100vh - 80px)*/
      min-height: 938px;
      overflow hidden
     /* padding 20px*/
     /* padding-top:20px
      padding-left:20px*/
      padding-right:20px
      box-sizing border-box
      min-width 1000px
      padding-left 170px
      padding-top 100px

      .record_title {
        position relative
        font-size 15px
        display block
        color #454545
        margin-bottom 20px

        &:before {
          position absolute
          content ""
          display inline-block
          height 16px
          width 3px;
          background-color #524AE7
          left -8px
          margin-top 2px
        }
      }

      .condition {
        margin-top 20px
        margin-left 20px
        color #727689

        select {
          border 1px solid #ebebf5
          width 150px
          height 34px
        }

        #datetimeStart {
          margin-left 10px
        }

        #datetimeStart, #datetimeEnd {
          text-align center
        }

        input {
          height 30px
          border 1px solid #ebebf5
        }

        .search, .export {
          display inline-block
          padding 0 20px
          line-height 34px
          height 34px
          background: rgba(49, 153, 224, 1);
          /*  background-color #524AE7*/
          color white
          border-radius 5px
          margin-left 20px
          cursor pointer
        }

        .submit {
          display none
        }

        .clearfloat {
          clear: both
        }
      }

      table {
        min-width 1000px
        width calc(100vw - 230px)
        border-collapse collapse
        /*margin-left 0px*/
        margin-top 40px
        text-align center
       /* border 1px solid #eae8f5*/
        box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
        border-radius:5px;

        th, td {
        /*  border 1px solid #eae8f5*/
          padding 20px 0
          color #434343
          width 250px
          white-space normal
          word-break break-all
        }

        th {
          font-weight 600
        }

        .id, .data {
          width 120px
        }

        .number {
          width 100px
        }
      }

      .footer {
        margin-top 30px
        float right
        overflow auto
        color #464646

        .pages {
          width 180px
          overflow hidden
          height 25px
          position relative
          display inline-block

          .pages_li {
            position absolute
            width auto
            height 25px
            display block
          }
        }

        > span, input {
          display inline-block
          float left
          text-align center
        }

        .pre, .next, .page {
          width 25px
          height 25px
          display inline-block
          margin 0 5px
        }

        .pre, .next {
          background url(../../../static/right.png) no-repeat
          width 10px
          margin-left 10px
          cursor pointer
        }

        .pre {
          margin-top -6px;
          transform rotate(180deg)
        }

        .next {
          margin-top 7px
          margin-right 10px
        }

        .page {
          /*margin-left 10px*/
          border-radius 50%
          line-height 25px
          cursor pointer
          text-align center
          font-size 13px
        }

        .page:hover, .active.page {
          /*  background-color #524AE7*/
          background: rgba(49, 153, 224, 1);
          color white
        }

        .amount, input, .ship {
          margin-left 10px
        }

        input {
          height 20px
          width 40px
          outline none
        }

        .ship {
          cursor pointer
        }

        .ship:hover {
          color #3199E0
        }

        .end, .start {
          cursor pointer
        }

        .end:hover, .start:hover {
          color #3199E0
        }
      }
    }
  }

  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }
  .first{
    border-bottom solid 1px #eae8f5
    tr th{
      border-right solid 1px #eae8f5
    }
  }
  tr td:nth-child(2){
    width 130px
  }
  tr td:nth-child(3){
    width 300px
  }
  /*tr td:nth-child(4){
    min-width 120px
  }
  tr td:nth-child(5){
    min-width 150px
  }*/
</style>
