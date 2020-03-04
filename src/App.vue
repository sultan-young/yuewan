<template>
  <div id="app">
    <router-view></router-view>
    <div id="nav">
      <router-link active-class="mark" tag="li" to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link active-class="mark" tag="li" to="/chat">
        <i class="iconfont icon-ziyuan"></i>
        <span>聊天室</span>
      </router-link>
      <router-link active-class="mark" tag="li" to="/my">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.mark {
  color: rgb(249, 34, 70);
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
body,
html {
  height: 100%;
  background: #f5f5f5;
}

#app{
  height: 100%;
}

#nav {
  background: #fff;
  position: fixed;
  display: flex;
  bottom: 0px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  color: rgb(51, 51, 51);
  .iconfont {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
