<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  height: 100%;
  font-family: Lato;
}
#app {
  height: 100%;
}
.h1,
.h2,
.h3,
h1,
h2,
h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  margin: 10px 0 10px;
}

h2 {
  font-size: 24px;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.page-title {
  font-size: 18px;
}

@font-face {
    font-family: 'iconfont';
    /* project id 374338 */
    src: url('//at.alicdn.com/t/font_374338_ya8jqfr6wohwipb9.eot');
    src: url('//at.alicdn.com/t/font_374338_ya8jqfr6wohwipb9.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_374338_ya8jqfr6wohwipb9.woff') format('woff'), url('//at.alicdn.com/t/font_374338_ya8jqfr6wohwipb9.ttf') format('truetype'), url('//at.alicdn.com/t/font_374338_ya8jqfr6wohwipb9.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}


.el-dialog.roomDetail>.el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

@font-face
{
font-family: 'digital';
src: url('./assets/digital2.ttf'),
}

@import "./style/vue-fontawesome";
</style>
