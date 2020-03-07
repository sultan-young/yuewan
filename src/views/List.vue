<template>
  <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div" id="list">
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
    <transition enter-active-class="animated fadeInRight" mode="out-in">
      <filternav v-if="filterNavShow">
        <div class="drawer">
          <h3>性别</h3>
          <ul>
            <li
              v-for="(item,index) in data.searchType.sex"
              :key="item"
              :class="{list_select_active : index == filterNavStatus.sex}"
              @click="filterNavStatus.sex = +index;"
            >{{item}}</li>
          </ul>
          <h3>等级</h3>
          <ul>
            <li
              @click="filterNavStatus.grading = +index"
              :class="{list_select_active : index == filterNavStatus.grading}"
              v-for="(item,index) in data.searchType.grading"
              :key="item"
            >{{item}}</li>
          </ul>
          <h3>价格</h3>
          <ul>
            <li
              @click="filterNavStatus.price = +index"
              :class="{list_select_active : index == filterNavStatus.price}"
              v-for="(item,index) in data.searchType.price"
              :key="item"
            >{{item}}</li>
          </ul>
          <div class="sideSure">
            <li @click="resetBtn()">重置</li>
            <li @click="submitBtn()">确定</li>
          </div>
        </div>
      </filternav>
    </transition>
    <backhome></backhome>
    <transition enter-active-class="animated fadeIn" mode="out-in">
      <shade v-if="filterNavShow" @click="filterNavShow = false"></shade>
    </transition>
  </v-touch>
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
import VueTouch from "vue-touch";
import { toast, stopToast } from "@/util/loading";

Vue.use(VueTouch, { name: "v-touch" });
Vue.use(Loading);

export default {
  data() {
    return {
      data: {},
      type: 0,
      page: 1,
      loadingShow: false,
      filterNavShow: false,
      filterNavStatus: {
        sex: 0,
        grading: 0,
        price: 0
      }
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
    onSwipeLeft() {
      if (this.type === 2) {
        this.changeType(0);
      } else {
        this.changeType(++this.type)
      }
    },
    onSwipeRight(){
     if (this.type === 0) {
        this.changeType(2);
      } else {
        this.changeType(--this.type)
      }
    },
    switchSex(value) {
      if (value === "全部") {
        return "全部";
      } else if (value === "帅哥") {
        return "男";
      } else {
        return "女";
      }
    },
    resetBtn() {
      this.filterNavStatus = {
        sex: 0,
        sexContent: "全部",
        grading: 0,
        price: 0
      };
    },
    submitBtn() {
      this.filterNavShow = false;
    },
    filterNavShow1() {
      console.log(111);
    },
    getData(callback) {
      toast();
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
            stopToast();
            this.data = data;
          } else {
            var newArr = this.checkKey(data.data); //该方法用来处理加载来的数据可能是重复的情况。用来过滤加载的数组。
            // console.log(newArr);
            this.data.data = this.data.data.concat(newArr);
            console.log("数据加载完毕");
            stopToast();
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
      toast();
      jsonp(
        "https://yapi.tuwan.com/Lists/getListApi", // 这里填写url
        {
          type: this.type,
          callback: "_jsonp38cyo66fzc",
          dtid: this.$route.query.dtid
        },
        data => {
          this.data = data;
          stopToast();
          //   console.log(data);
        }
      );
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
    computedDate() {
      var sexIndex = this.filterNavStatus.sex;
      var gradingndex = this.filterNavStatus.grading;
      var priceIndex = this.filterNavStatus.price;
      var arr = [];
      // console.log(sexIndex, gradingndex, priceIndex);
      // console.log(this.data.data);
      if (priceIndex === 0 && sexIndex === 0 && gradingndex === 0) {
        arr = this.data.data;
        return arr;
      }
      if (this.data.data !== undefined) {
        arr = this.data.data.filter(item => {
          return (
            item.sex ===
            this.switchSex(
              this.data.searchType.sex[sexIndex] ||
                this.data.searchType.sex[sexIndex] === "全部"
            )
          );
        });
        console.log(arr);

        arr = arr.filter(item => {
          console.log(
            item.grading,
            this.data.searchType.grading[gradingndex],
            item.grading,
            "全部"
          );
          return (
            item.grading === this.data.searchType.grading[gradingndex] ||
            this.data.searchType.grading[gradingndex] === "全部"
          );
        });
        console.log(arr);

        arr = arr.filter(item => {
          return (
            +item.price === +this.data.searchType.price[priceIndex] ||
            this.data.searchType.price[priceIndex] === "全部"
          );
        });
        console.log(arr);
        // console.log(arr);
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.list_select_active {
  background: #ff707a !important;
  color: #fff !important;
}
.drawer {
  width: 100%;
  height: 100%;
  justify-content: center;
  h3 {
    font-size: 15px;
    color: #666;
    margin-left: 2%;
    margin-top: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      padding: 5px 2%;
      box-sizing: border-box;
      width: 29%;
      margin: 5px 2%;
      font-size: 14px;
      color: #333333;
      border-radius: 5px;
      text-align: center;
      background: #ecedf1;
    }
  }
  .sideSure {
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 100%;
    li {
      width: 50%;
      text-align: center;
      padding: 10px 10px;
      font-size: 14px;
      background: #eaeaea;
      color: #333;
    }
    li:nth-child(2) {
      background: #ff626b;
      color: #fff;
    }
  }
}
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
  height: 100%;
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
