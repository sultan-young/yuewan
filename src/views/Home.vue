<template>
  <div class="home">
    <div class="app-header">
      <h1>
        <img src="https://res.tuwan.com/templet/play/chat/h5/images/logo.png" alt />
      </h1>
      <div class="search">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </div>
    </div>
    <div class="swiper-nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(data,index) in trendRouters" :key="index">
            <router-link :to="'/list?dtid='+list.dtid" tag="li" class="item" v-for="list in trendRouters[index]" :key="list.dtid" >
              <img :src="list.images" alt />
              <span>{{list.gamename}}</span>
            </router-link>
          
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonp from "@/util/jsonp";
import Vue from "vue";
import { Search } from "vant";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

Vue.use(Search);
export default {
  data() {
    return {
      value: "", //搜索框的值。
      dataList: {}, //这个是取回的所有数据，是个大对象。
      trendRouters: [] //这个是动态路由的数组，聊天室，线上LOL那些。
    };
  },
  mounted() {
    jsonp(
      "https://yapi.tuwan.com/Index/getPlayIndexApi/", //这里填写url
      { callback: "_jsonp38cyo66fzc", type: "chat" }, //这里填写query字符串
      data => {
        //这里填写回调函数
        this.dataList = data;
        this.HandlerRouters(this.dataList.gamelist);
        console.log(this.dataList);
      }
    );
  },
  updated() {
    var swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  methods: {
    HandlerRouters(data) {
      var flag = -1;
      data.forEach((value, index) => {
        if (index % 5 === 0 || index === 0) {
          this.trendRouters.push([]);
          flag++;
        }
        this.trendRouters[flag].push(value);
      });
      // console.log(this.trendRouters);
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  height: 100px;
  display: flex;
  justify-content: space-around;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
    }
    span {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
.swiper-pagination{
  bottom: 0px;
}
.home {
  height: 100%;
  font-size: 1rem;
  .app-header {
    height: 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      width: 30%;
      padding: 10px 12px;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .search {
      display: flex;
      align-items: center;
      height: 100%;
      width: 50%;
    }
  }
}
</style>