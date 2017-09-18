<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
html,body{margin:0px; height:100%; }
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
    margin-bottom: 10px
}

p {
    margin: 0 0 10px;
}

h2 {
    font-size: 24px;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 100;
}
@import './style/vue-fontawesome';
</style>
