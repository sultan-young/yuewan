<template>
  <div>
    <div class="dyn" v-for="data in datady.dynamiclist.data" :key="data.id">
      <div class="cont_img_box">
        <img :src="data.imgurl" alt />
      </div>
      <div class="courses_text">{{data.content}}</div>
      <div class="courses_time">{{data.time}}</div>
    </div>
    <div class="discuss">资料</div>
    <ul class="datum">
      <li>身高:{{datady.teachinfo.height}}CM</li>
      <li>星座:</li>
      <li>职业:{{datady.teachinfo.work}}</li>
      <li>魅力部位:{{datady.teachinfo.organ}}</li>
      <li>个性标签:{{datady.teachinfo.tag}}</li>
      <li>兴趣爱好:{{datady.teachinfo.like}}</li>
    </ul>
  </div>
</template>
<script>
import 'swiper/css/swiper.min.css'
import Vue from 'vue'
import { List } from 'vant'
Vue.use(List)
export default {
  props: ['datady'],
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.cont_img_box {
  img {
    width: 100%;
  }
}
.courses_text {
  font-size: 15px;
  color: #333333;
  padding: 0 3%;
  padding-bottom: 0;
  width: 100%;
  white-space: normal;
}
.courses_time {
  font-size: 12px;
  color: #999999;
  padding-left: 3%;
}
.discuss {
  font-size: 17px;
  color: #333333;
  margin: 3%;
  border-left: #ff616b solid 5px;
  padding-left: 5px;
  line-height: 15px;
  font-weight: 200;
  margin-bottom: 10px;
}
.datum {
  padding: 17px;
  padding-top: 0;
  li {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    border-bottom: #e8e8e8 solid 1px;
  }
}
</style>
