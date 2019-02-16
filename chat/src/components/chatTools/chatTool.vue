<template>
  <div class="chatTools">
    <chatList v-bind:closeConnection="closeConnection" v-on:chat_List="closeList"></chatList>
    <!--<chatWindow  v-on:listenStatus="closeWindow"></chatWindow>-->
  </div>
</template>
<script>
import chatList from "../chatList/chatList"
import chatWindow from "../chatWindow/chatWindow";
export default {
  name:"chatTools",
  prop:{
    showWindow:{
      type:Boolean,
    }
  },
  data(){
    return {
      closeConnection:true,

    }
  },
  components:{
    chatList,
    chatWindow
  },
  watch:{
    showWindow:{
      handler(curVal,oldVal){
        this.showWindow=curVal;
      },
      deep:true
    },
  },
  methods:{
    closeList(data){
      if(!data){
        this.closeConnection=false;
//        this.showWindow=false;
      }
    },
    closeWindow(data){
      if(!data){
        this.closeConnection=false;
//        this.showWindow=false;
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .chatTools{
    display table
  }
</style>
