<template>
  <div class="chatWindow">
    <div class="head">
      <div class="title">
        <span class="type" v-if="targetIds.h5_record">{{targetIds.h5_record[1]}}</span>
      </div>
      <div class="operation">
        <span class="magnify" v-show="!lessen" @click="magnify_window" title="还原"></span>
        <span class="lessen"  v-show="lessen" @click="lessen_window" title="全屏"></span>
        <!--<span class="closeWindow" @click="closeWrapper"></span>-->
      </div>
    </div>
    <div class="record images"  ref="recordWrapper"  id="">
      <!--<ul >-->
        <!--&lt;!&ndash;<li><img src="../../../static/tibet-1.jpg" alt="Picture 1"></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li><img src="../../../static/tibet-2.jpg" alt="Picture 2"></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li><img src="../../../static/tibet-3.jpg" alt="Picture 3"></li>&ndash;&gt;-->
      <!--</ul>-->
      <div  ref="texts" class="g-scroll-view scroll"  :style="{width:width}">
        <div ref="text">
          <div class="more" @click="more">
            <span class="text" v-show="get_record"><span class="time"></span>查看更多消息</span>
            <span class="load" v-show="finish"></span>
          </div>
          <div class="paging_record">
            <!--<div class="div_left" >-->
              <!--<p>2131353(450654经纪(⊙o⊙)…)</p>-->
              <!--<span class="avatar"></span>-->
              <!--<span class="box" >544444444444444444444442432kkrte大家都在发大家都在发大家都在发大家都在发大家都在发大家都在发大家都在发大家都在发大家都在发大家都在发</span>-->
            <!--</div>-->
            <div v-if="targetIds.more">
              <div v-for="(m,index) in paging_record" :key="index">
                <div class="div_right" :style="{padding:padding}"  v-if="m.messageDirection==1">
                  <p>({{m.sentTime}}){{m.name}}</p>
                  <span class="service_avatar"></span>
                  <span class="box" v-if="m.content.indexOf(environment)==-1"  v-html="m.content"></span>
                  <span class="pic" v-else  v-html="m.content"></span>
                </div>
                <div class="div_right" :style="{padding:padding}"  v-else-if="m.messageDirection==3" >
                  <p>({{m.sentTime}})Aimi</p>
                  <span class="avatar"></span>
                  <span class="box" v-if="m.content.indexOf(environment)==-1"  v-html="m.content"></span>
                  <span class="pic" v-else  v-html="m.content"></span>
                </div>
                <div class="div_left" v-else-if="m.messageDirection==2" >
                  <p>{{targetIds.h5_record[3]}}({{m.sentTime}})</p>
                  <span class="avatar"></span>
                  <span class="box" v-if="m.content.indexOf(environment)==-1"  v-html="m.content"></span>
                  <span class="pic" v-else  v-html="m.content"></span>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="swiper-slide swiper-slide-active">-->
          <div v-if="deal.length>0">
            <div v-for="(h,index) in deal" :key="index">
              <div class="div_right" :style="{padding:padding}"  v-if="h.messageDirection==1">
                <p>({{h.sentTime}}){{h.name}}</p>
                <span class="service_avatar"></span>
                <span class="box" v-if="h.content.indexOf(environment)==-1"  v-html="h.content"></span>
                <span class="pic" v-else  v-html="h.content"></span>
              </div>
              <div class="div_right" :style="{padding:padding}"  v-else-if="h.messageDirection==3">
                <p>({{h.sentTime}})Aimi</p>
                <span class="avatar"></span>
                <span class="box" v-if="h.content.indexOf(environment)==-1"  v-html="h.content"></span>
                <span class="pic" v-else  v-html="h.content"></span>
              </div>
              <div class="div_left" v-else-if="h.messageDirection==2" >
                <p>{{targetIds.h5_record[3]}}({{h.sentTime}})</p>
                <span class="avatar"></span>
                <span class="box" v-if="h.content.indexOf(environment)==-1"  v-html="h.content"></span>
                <span class="pic" v-else  v-html="h.content"></span>
              </div>
            </div>
          </div>
          <!--<span v-show="targetIds.content.length>0">-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&nbsp;历史记录&nbsp;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</span>-->
          <div v-if="targetIds.content.length>0">
            <div v-for="(con,index) in targetIds.content" :key="index">
              <div class="div_left" v-if="con.type==1">
                <p>{{targetIds.h5_record[3]}}({{con.sentTime}})</p>
                <span class="avatar"></span>
                <span class="box" v-if="con.content.indexOf(environment)==-1"  v-html="con.content"></span>
                <span class="pic" v-else  v-html="con.content"></span>
              </div>
              <div class="div_right" :style="{padding:padding}" v-else>
                <p>({{con.sentTime}}){{s_name}}</p>
                <span class="service_avatar"></span>
                <span class="box" v-if="con.content.indexOf(environment)==-1"  v-html="con.content"></span>
                <span class="pic" v-else  v-html="con.content"></span>
              </div>
            </div>
          </div>


          <div class="div_right" :style="{padding:padding}" style="display: none;">
            <p><!--({{m.sentTime}}){{s_name}}--></p>
            <span class="service_avatar"></span>
            <span class="box" >
              <img  style="width: 100%;" src="../../../static/tibet-1.jpg">
            </span>
          </div>
          <!--<div class="div_right" :style="{padding:padding}">-->
            <!--<p>&lt;!&ndash;({{m.sentTime}}){{s_name}}&ndash;&gt;</p>-->
            <!--<span class="service_avatar"></span>-->
            <!--<span class="box" >-->
              <!--<img  style="width: 100%;" src="../../../static/algorithm2.png"/>-->
            <!--</span>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="input">
    <!--  <div class="bg">-->
        <span class="picture">
          <input type="file"  name="service_image" ref="referenceUpload"   @change="updateFile">
        </span>
        <textarea v-model="text" id="textarea"  ref=""    @keyup="keyDown($event)"></textarea>
        <span class="send" @click="sent($event)">发送</span>
      <!--</div>-->
    </div>
    <v_close v-show="closeStatus" v-on:isClose="listenClose" >是否关闭?</v_close>
  </div>
</template>
<script>
  import Bus from '../../bus.js';
  import v_close from "../close/close"
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import 'webpack-jquery-ui/css'
  import 'webpack-jquery-ui'
  export default {
    name:"chatWindow",
    props:{
      showWindow:{
        type:Boolean
      },
      id:{
        type: Number
      },
      targetIds:{
        type:Object
      },
      index:{
        type:Number
      },
      showIndex:{
        type:Number
      },
//      gallery:{
//        type:Object
//      }
    },
    data(){
      return {
        closeStatus :false,
        sw:this.showWindow,
        text:"",
        historys:[],
        appkey:"",
        token:"",
        tempArray:[],
        target:this.targetIds,
        s_name:"",
        temp:"",
        p:0,
        pre:"",
        finish:false,
        get_record:true,
        width:100+"%" ,
        padding:"0 10px 0 0",
        lessen:true,
        file:"",
        viewer:"",
        environment:"",
        gallery:"",
        reader:"",
        is_edit:false,
        old_sentence:"",
        timer:null,
        select:'',
        robot_answer_data:'',
        robot_uu_id:''
      }
    },
    mounted(){
      var  this_=this;
      Bus.$on('sent',function (msg) {
        console.log(this.text);
        console.log(msg);
        if(msg.index==this_.index){
          this_.temp=msg.data_text;
          this_.select = msg.a.select
          this_.robot_answer_data = msg.a.robot_answer_data
          this_.sent('false');
        }
      });
      Bus.$on('sentProcess',function (msg) {
        console.log(msg)
        if(msg.index==this_.index){
          this_.temp=msg.data_text;
          this_.sent('false');
        }
      });
      Bus.$on('look',function (msg) {
        this_.text = msg.data_text;
        if(msg.index==this_.index){
          this_.temp=msg.data_text;
          this_.text = msg.data_text;
          this_.robot_uu_id = msg.a.robot_uu_id
          // this_.sent('false');
        }
      })
      var arrStr = document.cookie.split("; ");
      for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == 's_name'){
          //return unescape(temp[1]);
          this_.s_name=unescape(temp[1]);
        }
      }
      this_.gallery=new Viewer(document.getElementById('content'),{
        navbar:false,
        toolbar:false,
        title:false
      })
//     this_.environment="http://test.open.qb-tech.net/chat_image/";
      if(window.location.href.indexOf("test") > 0) {
        this_.environment= "http://test.open.qb-tech.net/chat_image/";
      }else{
        this_.environment= "http://open.qb-tech.net/chat_image/";
      }
      var inputs = document.getElementsByClassName('input');
      /*this_.$jquery('.input').resizable({*/
     /* this_.$jquery('.input').resizable({
        handles: 'n', //'e'是east，允许拖动右侧边框的意思
        maxHeight: 260,
        minHeight: 135,
        //resize方法在#left大小改变后被执行
        resize: function(event, ui) { //由于我们调整的是#left的大小，当#left改变时，要同时改变#middle的大小
          clearTimeout(this_.timer);
          this_.$jquery('.record').height(this_.$jquery('.chatWindow').height() - ui.size.height - this_.$jquery('.head').height());
          this_.timer=setTimeout(function(){
            var div = document.getElementsByClassName('scroll');
            for(let i=0;i<=this_.index;i++){
            /!*  div[this_.index].scrollTop = div[this_.index].scrollHeight;*!/
              console.log(i,"iaa");
              div[i].scrollTop = div[i].scrollHeight;
            }
            /!*div[this_.showIndex].scrollTop = div[this_.showIndex].scrollHeight;*!/
            console.log(this_.showIndex, " div[this.showIndex]");
            /!*   console.log("div[this_.index].scrollTop", div[this_.index]);*!/
            this_.$jquery('.chatWindow .input textarea').height(ui.size.height - 60)

          },0);
        }
      })*/
      this_.$jquery(window).resize(function () {
        var t = null;
        clearTimeout(t);
        t = setTimeout(function(){
          this_.$jquery('.input').css('top','');
        },200)
      })
    },
    components:{
      v_close
    },
    computed:{
      deal() {
          if(this.targetIds.total_page==0){
            this.get_record=false;
          }else{
            this.get_record=true;
          }
          var history = this.targetIds.history;
          var length = this.targetIds.history.length;
          for (var i = 0; i < length; i++) {
            var split=history[i].create.split(" ");
            history[i].sentTime = split[1];
          }
          return history;
      },
      content() {
        return this.targetIds.content
      },
      h5_record() {
        return this.targetIds.h5_record
      },
      paging_record(){
        var more=this.targetIds.more;
        var length=this.targetIds.more.length;
        for (var i=0;i<length;i++){
          var split=more[i].create.split(" ");
          more[i].sentTime = split[1];
        }
        return this.targetIds.more
      },
    },
    watch:{
      deal:{
        handler:function(val, oldVal){
          var this_=this;
          this_.$nextTick(function(){
            var heights= this_.$refs.texts.offsetHeight;
            var height= this_.$refs.text.offsetHeight;
//            if(height>heights){
//              this_.width="calc(100% + 20px)"
//              this_.padding="0 16px 0  0"
//            }
            setTimeout(function () {
              var div = document.getElementsByClassName('g-scroll-view');
              div[this_.index].scrollTop = div[this_.index].scrollHeight;
            },100)
            setTimeout(function () {
              var child=document.getElementsByClassName("viewer-container");
              if(child.length>1){
                var parent=document.getElementsByTagName("body")[0];
                for(var j=1;j<child.length;j++){
                  parent.removeChild(child[j]);
                }
              }
              this_.gallery.update()
            },1000)
          })
        },
        deep:true,
        immediate:true,
      },
      paging_record(newValue,oldValue){
        var this_=this;
        var div = document.getElementsByClassName('g-scroll-view');
        this_.$nextTick(function() {
          var heights= this_.$refs.texts.offsetHeight;
          var height= this_.$refs.text.offsetHeight;
//          if(height>heights){
//            this_.width="calc(100% + 20px)";
//            this_.padding="0 16px 0  0"
//          }
          setTimeout(function () {
            var paging_record = document.getElementsByClassName('paging_record');
            var st = div[this_.index].scrollTop + paging_record[this_.index].scrollHeight-this_.pre;
            this_.pre=paging_record[this_.index].scrollHeight;
            div[this_.index].scrollTop=st;
          },100)
          setTimeout(function () {
            var child=document.getElementsByClassName("viewer-container");
            if(child.length>1){
              var parent=document.getElementsByTagName("body")[0];
              for(var j=1;j<child.length;j++){
                parent.removeChild(child[j]);
              }
            }
            this_.gallery.update();
          },1000)
        })
      },
      content:{
        handler:function(val, oldVal) {
          var this_ = this;
          this_.$nextTick(function () {
            var heights = this_.$refs.texts.offsetHeight;
            var height = this_.$refs.text.offsetHeight;
//            if (height > heights) {
//              this_.width = "calc(100% + 20px)";
//              this_.padding = "0 16px 0  0"
//            }
            setTimeout(function () {
              var div = document.getElementsByClassName('g-scroll-view');
              for (var i = 0; i < div.length; i++) {
                div[i].scrollTop = div[i].scrollHeight;
              }
            }, 100)
          })
          setTimeout(function () {
             this_.gallery.destroy();
             var child=document.getElementsByClassName("viewer-container");
             if(child.length>0){
               var parent=document.getElementsByTagName("body")[0];
               for(var j=0;j<child.length;j++){
                 parent.removeChild(child[j]);
               }
             }
             this_.gallery=new Viewer(document.getElementById('content'),{
                navbar:false,
                toolbar:false,
                title:false
             })

          },100)
        },

        deep:true,
        immediate:true,
      },
      h5_record(newValue,oldValue){
        var this_=this;
        this_.$nextTick(function(){
          var heights= this_.$refs.texts.offsetHeight;
          var height= this_.$refs.text.offsetHeight;
          if(height>heights){
            this_.width="calc(100% + 20px)";
            this_.padding="0 16px 0  0"
          }
          setTimeout(function () {
            var div = document.getElementsByClassName('g-scroll-view');
            div[this_.index].scrollTop = div[this_.index].scrollHeight;
          },100)
        })
      }


    },
    methods:{
      photoCompress(file,w,objDiv){
        var this_=this;
        var ready=new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload=function(){
          var re=this.result;
          this_.canvasDataURL(re,w,objDiv)
        }
      },
      canvasDataURL(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
          var that = this;
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      convertBase64UrlToBlob(urlData){
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
      updateFile(e){
        var this_=this;
        var files = e.target.files[0];
        var form = new FormData();
        var url ='/acs/v1.0/service_upload_image';
        var xhr;
        if(files.size/1024>1024){
          this_.photoCompress(files,{
            quality:0.9
          },function (base64Codes) {
          var bl = this_.convertBase64UrlToBlob(base64Codes);
          form.append("service_image", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
          xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
          xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
          xhr.onload = this_.uploadComplete; //请求完成
          xhr.onerror =  this_.uploadFailed; //请求失败
          xhr.send(form); //开始上传，发送form数据
          })
        }else{
          form.append("service_image", files); // 文件对象
          xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
          xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
          xhr.onload = this_.uploadComplete; //请求完成
          xhr.onerror =  this_.uploadFailed; //请求失败
          xhr.send(form); //开始上传，发送form数据
        }
      },
      uploadComplete(evt) {
        var this_=this;
        //服务断接收完文件返回的结果
        var returndata = JSON.parse(evt.target.responseText);
        if (returndata.msg == "ok") {
          this_.sent(returndata.data);
          this_.$refs.referenceUpload.value = null;
        }
      },
      magnify_window(){
        this.lessen=!this.lessen
        if(screen.width<1500){
          console.log(this.lessen)
          console.log(screen.width)
          if(this.lessen == true){
            document.getElementsByTagName("body")[0].setAttribute('style','height:98.6%')
            document.getElementsByTagName("html")[0].setAttribute('style','height:98.6%')
          }else{
            document.getElementsByTagName("body")[0].setAttribute('style','height:100%')
            document.getElementsByTagName("html")[0].setAttribute('style','height:100%')
          }
        }
        Bus.$emit('magnify_window',{'magnify':true});
      },
      lessen_window(){
        this.lessen=!this.lessen
        if(screen.width<1500){
          console.log(this.lessen)
          console.log(screen.width)
          if(this.lessen == true){
            document.getElementsByTagName("body")[0].setAttribute('style','height:98.6%')
            document.getElementsByTagName("html")[0].setAttribute('style','height:98.6%')
          }else{
            document.getElementsByTagName("body")[0].setAttribute('style','height:100%')
            document.getElementsByTagName("html")[0].setAttribute('style','height:100%')
          }
        }
        Bus.$emit('lessen_window',{'lesson':true});
      },
      more(){
        var  this_=this;
        this_.finish=true;
        this_.get_record=false;
        this_.p++;
        this_.$ajax.get("/acs/v1.0/service_online_status",{params : {'targetId' :this_.targetIds.targetId,'p':this_.p,'customer_token':this_.targetIds.h5_record[5]}}).then((res) => {
          if (res.data.errmsg == 'OK') {
            this_.finish=false;
            var data=res.data.data.log_dict_list;
            for(var i=0;i<data.length;i++){
              if(data[i].content.indexOf(this_.environment)==0){
                data[i].content="<div><img src='"+data[i].content+"'></div>"
              }
            }
            Bus.$emit('more',{data:res.data.data.log_dict_list,id:this_.index})
            setTimeout(function () {
              if(res.data.data.total_page==this_.p){
                this_.get_record=false;
              }else{
                this_.get_record=true;
              }
            },1000)
          }
        })
      },
      compare(){
        return function(a,b){
          var value1 = a.sentTime;
          var value2 = b.sentTime;
          return value1 - value2;
        }
      },
      closeWrapper(){
        this.closeStatus=true;
      },
      listenClose(data){//子组件传递
        this.closeStatus=false;
        if(data){//断开聊天
          this.sw=false
          this.$emit('listenStatus',false)
        }
      },
      setCaretPosition(ctrl, pos){//设置光标位置函数
        if(ctrl.setSelectionRange)
        {
          ctrl.focus();
          ctrl.setSelectionRange(pos,pos);
        }
        else if (ctrl.createTextRange) {
          var range = ctrl.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      },
      sent(data,a){
        var html =""
        if(data=='false'){
          html=this.temp;
        }else if(!(data instanceof Object)){
          if(data.indexOf(this.environment)==0){
            html=data;
          }
        }else{
          html=this.text.replace(/\n/g,'<br/>')
          this.text="";
        }
        if(html.trim().length<1) return false;
        if(this.is_edit){
          this.is_edit = false ;
        /*  console.log('编辑前')
          console.log('编辑后'+html)*/
        }

        if(localStorage.getItem('selectEdit') == 1) {
          this.$ajax({
            method: "put",
            url: "/acs/v1.0/robot_robot",
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              'robot_uu_id':  this_.robot_uu_id,
              'modify_content': html,
              'service_send_status':2
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then(res => {
            localStorage.setItem('selectEdit',0)
          })
        }
        // if(this.targetIds.answer[0].select){
        //     this.targetIds.h5_record.push(this.targetIds.answer[0].select)
        // }
        this.targetIds.h5_record[8] = this.select
        this.targetIds.h5_record[9] = this.robot_answer_data
        this.$emit("updateRecord",{index:this.index,content:html,type:2,extra:this.targetIds.h5_record});
      },
      keyDown(event){
        event.preventDefault()
       var this_=this;
       if (event.ctrlKey && event.keyCode == 13)  {
         var $input = document.getElementById("textarea");
         var cursurPosition=0;
         if($input.selectionStart){//非IE
           cursurPosition= $input.selectionStart;
         }else{//IE
           try{
             var range = document.selection.createRange();
             range.moveStart("character",-$input.value.length);
             cursurPosition=range.text.length;
           }catch(e){
             cursurPosition = 0;
           }
         }
         //var value=$input[this_.index].value;
         document.getElementById("textarea").value=document.getElementById("textarea").value.slice(0, cursurPosition) + '\n' + document.getElementById("textarea").value.slice(cursurPosition);
         this.setCaretPosition( document.getElementById("textarea"),cursurPosition+1);
         //document.getElementById("textarea").value+= '\n'
       }else if(event.keyCode == 13){
         event.preventDefault();
         event.returnValue = false;
         this.sent({});
       }
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .more{
    text-align center
    font-size 13px
    cursor pointer
   /* color #524ae7*/
    color rgba(49,153,224,1)
    margin-top 10px
    .text {
      width 97px
      display inline-block
      /*display inline-block!important*/
      .time {
        width 14px
        height 14px
        background url("../../../static/history.png") no-repeat
        /*display inline-block !important*/
        margin-right 5px
        float left
        margin-top 3px
      }
    }
    .load{
      display inline-block
      background url("../../../static/load.gif") no-repeat
      background-size cover
      width 20px
      height 20px

    }
  }
  .chatWindow{
    border-top 1px solid #d6d6d6
    position relative
    float left
    background-color #eef3f6
    width calc(100vw - 650px)
    height 100%
    padding 20px 0px
    box-sizing border-box
    display none
    left -14px;
    .head {
      height 40px
      border-bottom 1px solid rgba(215,218,220,.3)
      padding 0 20px
      .title {
        display inline-block
      }
      .operation {
        float right
        span {
          display inline-block
          width 21px
          height 21px
          background url("../../assets/toggle.png")
          background-repeat no-repeat
          background-position-y -40px
          cursor: pointer
          &.magnify {
            background-position-x -36px
          }
          &.lessen {
            background-position-x -102px

          }
          &.closeWindow {
            background-position-x -88px
          }
        }
      }
    }
    .input{
      position absolute
      bottom 0px
      height 135px
      width 100%
      background:rgba(253,253,253,1)
    /*  .bg{
        width 90%
        !*height 150px*!
        background:rgba(253,253,253,1);
        margin: 0 auto
        position: absolute
        bottom: 0
      }*/
      .picture{
        position absolute
        left 10px
        top 5px
        /*margin-top 5px
        margin-left 10px*/
        display inline-block
        width 23px
        height 19px
        background-image url("../../../static/picture.png")
        background-repeat no-repeat
        background-size cover
        input[type='file']{
          width 100%;
          height 100%;
          opacity 0
        }
      }
      textarea{
        height 100px
       /* height 52px*/
        width 100%
        resize none
        outline none
        border-top solid rgba(221,221,221,1) 1px
        border-right none
        border-bottom  none
        border-left  none
        padding 5px 10px 5px 10px
        box-sizing border-box
        font-size 15px
        margin-top 32px
      }
      .send{
        position absolute
       /* font-size 14px*/
        display block
        width 32px
        height 15px
       /* padding 3px 15px
        border 1px solid #e5e5e5*/
        font-size: 14px;
        padding: 3px 15px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        cursor: pointer;
        line-height:15px
        right: 30px
        top 4px
       /* background:url("./send.png") no-repeat*/
      }
    }
    .record{
      height calc(100vh - 260px)
      overflow hidden
      .div_left{
        padding 0 10px
        box-sizing border-box
        overflow hidden
        display block
        text-align left
        p{
          margin 0
          font-size  14px

        }
        .avatar{
          display inline-block
          width 35px
          height 35px
          background url("../../assets/customer.png")
          background-repeat  no-repeat
          float left
        }
        .pic{
          position relative
          display inline-block
          min-width 12px
          max-width 20%
          background transparent
          margin-left 20px
          float left
          word-break:break-all
          text-align left
          div{
            width 100%
            img{
              width 100%
            }
          }
        }
        .box{
          position relative
          display inline-block
          min-width 12px
          max-width 80%
          padding 6px 7px
          background white
         /* border-radius  3px*/
          margin-left 20px
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
          border-radius:6px;
          border 1px solid #e2e2ec
          float left
          word-break:break-all
          text-align left
          img{
            width 100px;
            height auto;
          }
        /*  &:before{
            position absolute
            content ""
            background  url("../../../static/triangle_left.png") no-repeat
            left -9px
            top 7px
            width 9px
            height 19.5px
          }*/
          &:after{
            position absolute
            content: ""
            width 3px
            height 19px
            left -1px
            top 7px
            border none
            background-color  white
          }
        }
      }
      .div_right{
        width 100%
        padding 10px
        overflow hidden
        display block
        text-align right
        margin-right 20px
        box-sizing border-box
        padding-right 10px
        p{
          margin 0
          font-size  14px
        }
        .service_avatar,.avatar{
          display inline-block
          width 35px
          height 35px
          background url("../../assets/aimi.png")
          background-repeat  no-repeat
          float right
        }
        .service_avatar{
          background url("../../assets/customer.png")
        }
        .pic{
          position relative
          display inline-block
          min-width 12px
          max-width 20%
          background transparent
          margin-right 20px
          float right
          word-break:break-all
          text-align right
          div{
            width 100%
            img{
              width 100%
            }
          }
        }
        .box{
          position relative
          display inline-block
          min-width 12px
          max-width 80%
          padding 8px 10px
          background rgba(169,165,253,.35)
         /* border-radius  3px*/
          margin-right 20px
          border 1px solid #e2e2ec
          float right
          background:rgba(49,153,224,1);
          box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
          border-radius:6px;
          word-break:break-all
          text-align left
          /*&:before{
            position absolute
            content: ""
            width 0
            height 0
            right -20px
            top 8px
            border-top 8px solid transparent
            border-left 16px solid #e3e1ec
            border-bottom 8px solid transparent
            background-color transparent
          }*/
         /* &:after{
            position absolute
            content: ""
            background  url("../../../static/triangle_right.png") no-repeat
            width 9px
            height 19px
            right -8.5px
            top 7px

          }*/
          div{
            width 100%
            img{
              width 100px;
              height auto;
            }
          }
        }
      }
      div{
        .div_left,.div_right{
          span{
            display block
            text-align center
            font-size 15px
            margin 10px 0px
          }
        }
      }
    }
  }
  .record  .g-scroll-view{
    overflow-x hidden
    height 100%!important


  }
  .record  .g-scroll-view>div{
    width 100%
  }
  .record .gm-scrollbar.-vertical .thumb{display: none}
</style>
