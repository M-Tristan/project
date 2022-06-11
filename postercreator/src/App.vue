<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
::-webkit-scrollbar {
  width: 5px; /* 纵向滚动条*/
  height: 5px; /* 横向滚动条 */
  // background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
  background-color: rgba(204, 204, 204, 0);
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #9b9b9ba2;
  border-radius: 10px;
}
@font-face {
  font-family: SourceHanSansCN-Regular;
  src: url("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/SourceHanSansCN-Regular.otf");
}
</style>
