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

<style lang="less">
// @import './common/font.css';
html{background-color:#fff;color:#000;}
body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0;overflow-y:hidden;}
body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
h1,h2,h3,h4,h5,h6{font-family:tahoma,arial,"Hiragino Sans GB","微软雅黑",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
address,cite,dfn,em,i,optgroup,var{font-style:normal}
table{border-collapse:collapse;border-spacing:0;text-align:left}
caption,th{text-align:inherit}
ul,ol,menu{list-style:none}
fieldset,img{border:0}
img,object,input,textarea,button,select{vertical-align:middle}
article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
textarea{overflow:auto;resize:vertical}
input,textarea,button,select,a{outline:0 none;border: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
mark{background-color:transparent}
a,ins,s,u,del{text-decoration:none}
sup,sub{vertical-align:baseline}
html {overflow-x: hidden;height: auto;font-size: 50px;-webkit-tap-highlight-color: transparent;}
body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;}
hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
a {color: #25a4bb;text-decoration: none;}
// .el-button{
//   background: #524AE7;
//   color: #fff;
// }
// .el-radio__input.is-checked+.el-radio__label{
//   color: #524AE7;
// }
// .el-radio__input.is-checked .el-radio__inner{
//   background-color: #524AE7;
//   border-color:#524AE7;
// }
// .el-radio__input:hover{
//   color: #524AE7;
// }
// .el-button--primary{
//   border-color:#524AE7;
// }
.el-button--primary{
  background-color: #524AE7;
  border-color:#524AE7;
  color: #fff;
}
.el-button .el-button--default:hover{
  background: #524AE7!important;
  color: #fff!important;
}
.el-radio__input.is-checked+.el-radio__label{
  color: #666!important;
}
.el-radio__input.is-checked .el-radio__inner{
    border-color: #666!important;
    background: #333!important;
}
.el-radio__inner{
  border: 1px solid #666!important;
}
.uploader-list{
  ul{
    li{
      margin-bottom: 10px;
    }
  }
}
</style>
