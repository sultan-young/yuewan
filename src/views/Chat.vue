<template>
  <div class="chat">
    <div class="chatarea">
      <li v-for="data in chatData" :key="data.id" class="text">
        <div class="name">{{data.name}}</div>
        <span>:</span>
        <div class="msg">{{data.msg}}</div>
      </li>
    </div>
    <div class="chatBtn">
      <input id="ipt" type="text" v-model="value" />
      <button @click="sendmessage()" id="btn">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      ws: null,
      chatData: [{name : "系统消息",msg : "欢迎来到聊天室！"}]
    };
  },
  mounted() {
    this.ws = new WebSocket("ws://127.0.0.1:8888");
    this.ws.onopen = function() {
      console.log("成功进入聊天室");
    };
    this.ws.onmessage = (data)=> {
      console.log(data)
      this.chatData.push({
        id : data.timeStamp,
        name : "昵名用户",
        msg : JSON.parse(data.data)
      })
    };
    document.getElementsByClassName("chatarea")[0].style.height =
      document.documentElement.clientHeight -
      document.getElementsByClassName("chatBtn")[0].clientHeight -
      document.getElementById("nav").clientHeight +
      "px";
  },
  methods: {
    sendmessage() {
      this.ws.send(JSON.stringify(this.value));
      this.value = ""
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
}
.chatarea {
  min-height: 300px;
  background: #f5f5f5;
  overflow: scroll;
  .text {
    display: flex;
    margin: 5px;
    .name {
      margin-right: 5px;
    }
    .msg {
      margin-left: 5px;
    }
  }
}
.chatBtn {
  display: flex;
  #ipt {
    flex: 4;
    float: left;
    outline: none;
  }
  #btn {
    float: left;
    border: none;
    background: #ccc;
    outline: none;
    flex: 1;
  }
}
</style>