<template>
  <div id="login">
    <h3>注册页面</h3>
    <h4>请填写表单内容！</h4>
    <div class="divLoginForm">
      <div class="item">
        <input v-model="userInfo.username" required type="text" placeholder="请输入账号" />
      </div>
      <div class="item">
        <input v-model="userInfo.password" required  type="password" placeholder="请输入密码" />
      </div>
      <div class="item">
        <input v-model="userInfo.password1" required type="password" placeholder="请再次输入以确认您的密码" />
      </div>
      <div class="item">
        <input v-model="userInfo.netname" required type="text" placeholder="请输入您的呢名" />
      </div>
      <div @click="register()" class="register">
        <button>注册</button>
      </div>
      <div class="login" @click="login()">
        <button>已有账号，直接登录</button>
      </div>
      <span class="msg">{{msg}}</span>
    </div>
    <backBtn></backBtn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import backBtn from "@/components/BackHome";
import axios from "axios";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        password1: "",
        netname: ""
      },
      msg: ""
    };
  },
  methods: {
    ...mapMutations(["setFootNavHidden"]),
    register() {
      if (this.userInfo.password !== this.userInfo.password1) {
        this.msg = "您两次输入的密码不相同";
        return;
      }
      axios({
        method: "post",
        url: "/ajax/register",
        data: {
          netname: this.userInfo.netname,
          username: this.userInfo.username,
          password: this.userInfo.password
        }
      }).then(data => {
        window.alert(data.data.msg);
        this.$router.push("/login");
      });
    },
    login() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.setFootNavHidden();
  },
  components: {
    backBtn
  }
};
</script>

<style lang="scss" scoped>
.msg {
  font-size: 13px;
  display: block;
  margin: 20px auto;
  text-align: center;
}
#login {
  padding-left: 20px;
  padding-right: 20px;
  h3 {
    font-weight: 300;
    margin-top: 30px;
  }
  h4 {
    font-weight: 260;
    margin-top: 10px;
  }
  .divLoginForm {
    .item {
      width: 100%;
      margin-top: 20px;
      input {
        width: 100%;
        outline: none;
        background: #f5f5f5;
        border: none;
        border-bottom: 1px solid #cecece;
        height: 30px;
      }
    }
    .login,
    .register {
      width: 100%;
      button {
        width: 100%;
        height: 30px;
        border: none;
        margin-top: 15px;
        border-radius: 30px;
        background: #e8e8e8;
        color: #999;
      }
    }
    .register > button {
      color: #fff;
      background: #ff626b;
    }
  }
}
</style>