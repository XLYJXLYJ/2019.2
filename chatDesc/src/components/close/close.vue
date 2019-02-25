<template>
  <div class="vue-close">
    <div>
      <div class="tips"><slot></slot></div>
      <div class="tool">
        <span @click.stop="sure">是</span>
        <span @click.stop="cancel">否</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'vue-close',
    methods:{
      sure(){
        this.$emit('isClose',true)
      },
      cancel(){
        this.$emit('isClose',false)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .vue-close{
    position  fixed;
    width 100%
    height 100%
    z-index 100
    text-align center
    top 0
    left 0
    >div {
      position absolute
      width 270px
      height 120px
      top 50%;
      left 50%;
      transform  translate(-50%,-50%);
      .tips {
        height 78px
        line-height 78px
        background-color #B9E3FF;
        border-radius 5px 5px 0px 0px
        letter-spacing 3px
      }
      .tool {
        height 41px
        background-color #3199E0
        border-radius 0px 0px 5px 5px
        display flex
        span {
          flex 1
          line-height 41px
          cursor: pointer
          &:first-child {
            border-right .5px solid #3199E0
          }
          &:last-child {
            border-left .5px solid #efeff9
          }
        }
      }
    }
  }
</style>
