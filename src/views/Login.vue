<template>
  <div id="login">
    <h3>检测到你还没有登录</h3>
    <h4>请先注册或登录！</h4>
    <div class="divLoginForm">
      <div class="item">
        <input v-model="userInfo.username" type="text" placeholder="请输入账号" />
      </div>
      <div class="item">
        <input v-model="userInfo.password" type="password" placeholder="请输入密码" />
      </div>
      <div class="login" @click="login()">
        <button>登录</button>
      </div>
      <div @click="register()" class="register">
        <button>还没有账号，去注册</button>
      </div>
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
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations(["setFootNavHidden","setNetName"]),
    register() {
      this.$router.push('/register')
      
    },
    login() {
      axios({
        method: "post",
        url: "/ajax/login",
        data: { 
          username: this.userInfo.username,
          password: this.userInfo.password
        }
      }).then(data => {
        this.setNetName(data.data.netname)
        // console.log(this.$store.state.netName)
        window.alert(data.data.msg);
        this.$router.push('/my')
      });
    }
  },
  mounted() {
    this.setFootNavHidden();
  },
  components: {
    backBtn
  },
  
};
</script>

<style lang="scss" scoped>
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
        background: #ff626b;
        height: 30px;
        border: none;
        margin-top: 15px;
        border-radius: 30px;
        color: #fff;
      }
    }
    .register > button {
      background: #e8e8e8;
      color: #999;
    }
  }
}
</style>