<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
body,html,#app{
  min-width 1250px
  width 100%
  height 100%
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  /*height: auto;*/
  min-height: 100%;

}
.footer{
  button{
    border none
    background-color transparent
    cursor pointer
  }
  #pageSelect {
    display inline-block
    li {
      display inline-block
      width 25px
      height 25px
      text-align center
      border-radius 50%
      line-height 25px
    }
  }

}
</style>
