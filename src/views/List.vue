<template>
  <div id="list">
    <div class="nav-header">
      <li @click="changeType(0)" :class="{selected: type == 0}">推荐</li>
      <li @click="changeType(1)" :class="{selected: type == 1}">热门</li>
      <li @click="changeType(2)" :class="{selected: type == 2}">新人</li>
      <li @click="filterNavShow = true">筛选</li>
    </div>
    <div class="center-wraper" v-countHeight>
      <div class="center">
        <li v-for="item in computedDate" :key="item.id">
          <div class="poster">
            <img :src="item.avatar" alt />
            <span>{{item.grading}}</span>
          </div>
          <div class="item_info">
            <p class="name">{{item.nickname}}</p>
            <div class="online">
              <i
                class="iconfont"
                :class="item.sex==='男'? 'icon-nan': 'icon-nv'"
                :style="{color : item.sex==='男'? 'skyblue': '#f92246'}"
              ></i>
              <span>{{item.age}} | {{item.city}} | {{item.RefreshTime}}</span>
            </div>
            <div class="ordercount">
              <span>接单{{item.ordernum}}次</span>
              <p>
                ￥
                <span>{{item.price}}</span>
                / {{item.typeflag}}
              </p>
            </div>
            <div class="tc">
              <span v-for="cy in item.ptag" :key="cy">{{cy}}</span>
            </div>
          </div>
        </li>
        <!-- <freshen></freshen> -->
        <van-loading
          size="24px"
          color="red "
          v-show="loadingShow"
          style="margin:0px auto"
          vertical
        >加载中...</van-loading>
      </div>
    </div>
    <transition enter-active-class="animated fadeInRight"  mode="out-in">
      <filternav v-if="filterNavShow" >
          <div>123123</div>
      </filternav>
    </transition>
    <backhome></backhome>
    <transition enter-active-class="animated fadeIn" mode="out-in">
      <shade v-if="filterNavShow" @click="filterNavShow = false"></shade>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import jsonp from "@/util/jsonp";
import backhome from "@/components/BackHome";
import freshen from "@/components/Freshen";
import filternav from "@/components/FilterNav";
import shade from "@/components/Shade";
import BScroll from "better-scroll";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);

export default {
  data () {
    return {
      data: {},
      type: 0,
      page: 1,
      loadingShow: false,
      filterNavShow: false
    };
  },
  mounted() {
    this.setFootNavHidden();
    this.getData();
    this.scroll = new BScroll(".center-wraper", {
      pullUpLoad: {
        threshold: -50, //距离底部距离多少时候刷新页面。
        stop: 20
      }
    });
    this.scroll.on("pullingUp", () => {
      console.log("数据加载请求发出");
      this.loadingShow = true;
      this.getData(() => {
        // console.log(this.data.data);
        this.loadingShow = false;
        this.scroll.finishPullUp();
      });
    });
  },
  methods: {
    ...mapMutations(["setFootNavHidden"]),
    filterNavShow1(){
        console.log(111)
    },
    getData(callback) {
      jsonp(
        "https://yapi.tuwan.com/Lists/getListApi", //这里填写url
        {
          type: 0,
          page: this.page,
          callback: "_jsonp38cyo66fzc",
          dtid: this.$route.query.dtid
        }, //这里填写query字符串
        data => {
          //这里填写回调函数
          // this.dataList = data;
          // this.HandlerRouters(this.dataList.gamelist);
          if (this.data.data === undefined) {
            this.data = data;
          } else {
            var newArr = this.checkKey(data.data); //该方法用来处理加载来的数据可能是重复的情况。用来过滤加载的数组。
            // console.log(newArr);
            this.data.data = this.data.data.concat(newArr);
            console.log("数据加载完毕");
            callback && callback();
          }
          this.page++;
        }
      );
    },
    checkKey(data) {
      //该方法用来处理加载来的数据可能是重复的情况。用来过滤加载的数组。
      var arr = [];
      data.forEach(item => {
        var flag = this.data.data.every(value => {
          return value.id !== item.id;
        });
        if (flag) {
          arr.push(item);
        }
      });
      return arr;
    },
    changeType(value) {
      this.page = 1;
      this.type = value;
      jsonp(
        'https://yapi.tuwan.com/Lists/getListApi', // 这里填写url
        {
          type: this.type,
          callback: '_jsonp38cyo66fzc',
          dtid: this.$route.query.dtid
        },
        data => {
          this.data = data;
          //   console.log(data);
        }
      )
    }
  },
  components: {
    backhome,
    freshen,
    filternav,
    shade
  },
  updated() {
    this.$nextTick(() => {
      this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
    });
  },
  directives: {
    countHeight(el) {
      var domNav = document.getElementsByClassName("nav-header")[0];
      if (domNav === undefined) {
        return;
      }
      el.style.height =
        document.documentElement.clientHeight - domNav.clientHeight + "px";
    }
  },
  computed: {
      computedDate(){
          return this.data.data
      }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  color: #f92246;
}
#list {
  height: 100%;
  background: rgb(241, 240, 240);
}
.nav-header {
  color: #666666;
  font-size: 16px;
  background: #fff;
  height: 6%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.center-wraper {
  //   height: 100%;
  overflow: hidden;
}
.center {
  width: 100%;
  min-height: 300px;
  margin-top: 10px;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 47%;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 2px 2px 3px 3px #dfdfdf;
    border-radius: 10px 10px 5px 5px;
    overflow: hidden;
    .poster {
      position: relative;
      width: 100%;
      img {
        width: 100%;
        height: 150px;
      }
      span {
        position: absolute;
        bottom: 10px;
        right: 5px;
        background: #ffcfa6;
        color: #fff;
        border-radius: 5px;
        font-size: 10px;
        padding: 2px 5px;
      }
    }
    .item_info {
      padding: 0px 10px 5px;
      .name {
        font-size: 12px;
        color: #333;
      }
      .online {
        color: #666;
        font-size: 10px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        i {
          margin-left: -3px;
          margin-right: 3px;
        }
      }
      .ordercount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 1px;
          color: #666;
        }
        p {
          font-size: 14px;
          color: red;
          font-weight: 200;

          span {
            font-size: 18px;
            color: red;
            font-weight: 400;
          }
        }
      }
      .tc {
        margin-top: 5px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        span {
          border-radius: 0.03rem;
          font-size: 10px;
          border: solid 1px #cccccc;
          color: #999;
          padding: 2px 5px;
          margin: 1px 10px;
        }
      }
    }
  }
}
</style>
