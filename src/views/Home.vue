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
    <div class="content">
         <div class="tt">
           <p class="title">为您推荐</p>
         </div>
         <ul>
           <li v-for="(data,index) in dataList.QuickPlay" :key="index" class="zh">
           <dl>
             <dt>
                 <img :src="data.imgurl" alt="" class="photo">
                 <span class="work">{{data.title}}</span>
                 <span class="dw">{{data.grading}}</span>
             </dt>
             <dd>
                 <span class="name">{{data.nickname}}</span>
                 <p class="price">￥{{data.price}}/{{data.typeflag}}</p>
             </dd>
           </dl>
         </li>
         </ul>
    </div>
    <div class="content" v-for="(data,index) in dataList.hot" :key="index">
          <div class="tt">
           <p class="title">{{data.title}}</p>
         </div>
         <ul>
           <li v-for="(data,index) in data.data" :key="index" class="zh">
           <dl>
             <dt>
                 <img :src="data.imgurl" alt="" class="photo">
                 <span class="dw">{{data.grading}}</span>
             </dt>
             <dd>
                 <span class="name">{{data.nickname}}</span>
                 <p class="price">￥{{data.price}}/{{data.typeflag}}</p>
             </dd>
           </dl>
         </li>
         </ul>
         <div class="footer"></div>
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
  overflow: scroll;
  background: #f5f5f5;
  .app-header {
    height: 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
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
.swiper-nav{
  background: white;
  margin-bottom:12px;
}
.content{
  height: 210px;
  background: white;
  margin-bottom:12px;
}
.tt{
  height: 36px;
}
.title{
  color: #f92246;
  font-size: 17px;
  line-height:36px; 
  text-align: center;
}
.photo{
  width: 105px;
  height: 105px;
}
.name{
  font-size: 13px;
}
.price{
  font-size: 13px;
  color: #f93354;
}
dt{
  position: relative;
}
dd{
  width: 110px;
}
ul{
  display: flex;
  justify-content: space-around;
}
.work{
  width: 54px;
  height: 16px;
  font-size: 0.18rem;
  line-height: 16px;
  color: #ffffff;
  background:rgba(255,99,113,0.90);
  text-align: center;
  position: absolute;
  left: -8px;
  bottom: 11px;
  border-radius: 10%;
}
.dw{
  height: 13px;
  width: 27px;
  border-radius: 10%;
  line-height: 13px;
  font-size:0.18rem;
  color: #ffffff;
  background: rgba(255,207,166,0.90);
  text-align: center;
  position: absolute;
  top: 6px;
  right: 10px;
}
.footer{
  height: 115px;
}
</style>