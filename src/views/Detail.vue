<template>
  <div v-if="dataList" class="detail">
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(data,index) in dataList.dyarr" :key="index">
          <div class="content-banner-img" :style="{backgroundImage: 'url('+data.image+')'}"></div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <div class="content-headbg">
        <div class="header_content">
          <img :src="teachinfo.avatar" />
        </div>
        <div class="header_teacher_info">
          <div class="play_name" style="fontSize:15px">{{teachinfo.nickname}}</div>
          <div class="banner_bottom">
            <img :src="handleSex(teachinfo.sex)" />
            {{teachinfo.age}}
            <span>|</span>
            {{teachinfo.city}}
            <span>|</span>
            {{teachinfo.RefreshTime}}
          </div>
        </div>
      </div>
    </div>
    <ul class="tabs-nav">
      <li @click="handleServeClick">服务</li>
      <li @click="handleDynamicClick">动态</li>
    </ul>
    <router-view :datady="dataList"></router-view>
    <!-- <van-tabs v-model="active"  id="tabs">
      <van-tab title="聊天"></van-tab>
      <van-tab title="约她"></van-tab>
    </van-tabs> -->
  </div>
</template>
<script>
import jsonp from '@/util/jsonp'
import Vue from 'vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { Tab, Tabs } from 'vant'
// import Bascroll from "better-scroll";
Vue.use(Tab)
Vue.use(Tabs)
export default {
  data () {
    return {
      active: 2,
      dataList: {},
      teachinfo: {}
    }
  },
  mounted () {
    // this.setFootNavHiShow()
    console.log(this.$route.params.contentId)
    //  this.scroll = new Bascroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
    jsonp(
      'https://yapi.tuwan.com/Content/getContentApi/', // 这里填写url
      {
        id: `${this.$route.params.contentId}`,
        callback: '_jsonp6clvxx5n6f',
        type: 'chat'
      }, // 这里填写query字符串
      data => {
        // 这里填写回调函数
        this.dataList = data
        this.teachinfo = data.teachinfo
        console.log(this.dataList)
        console.log(this.teachinfo)
      }
    )
  },
  updated () {
   new Swiper('#swiper1', {
      // loop: true,
      autoplay: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  methods: {
    handleSex (sex) {
      if (sex === 1) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2NTc5NTVDMzY0MzExRTc4MjhEODc3RkFDMjVCNUZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2NTc5NTVEMzY0MzExRTc4MjhEODc3RkFDMjVCNUZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTY1Nzk1NUEzNjQzMTFFNzgyOEQ4NzdGQUMyNUI1RkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTY1Nzk1NUIzNjQzMTFFNzgyOEQ4NzdGQUMyNUI1RkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7fmMBAAAAEbklEQVR42sxXS28bVRQ+M3M94/eDBNsE2pJQt0JUPF0eDYuiSmwqZRGpC5ZI3bLoDpBYsWHHH6jUJbsuInWDVJFNUUEWLWlKq6ZNCKDKcf1KYs/Y4xm735nYqes6Hk8UoVxFin3n+n7n8X3nnJE6nQ6Ns3AsY9jt2appZzeb9qmaZU/rrXaKnwV98kZYKGsxTVmOq0ouoMg3JIlWxrlXcjPA7nTOFgxr/u8tc+6x3jpWaVqkW21qD/xMlmCIkCmhCZoK+tZfj6oLyYC4qkjS4r4MwO5MqWFdvFtpfPlws5neNm3ysiKqQsdjWv6thP/KhF9chn2rYxsAr8892mxeurlRP19uegMeXC9pCn2cCl17I6b9iGhcdzXAanfm/iwZ3/1eqGebdocOYmmKRB8mQ7l3JgLfC1la2NMA5PXcH0X9h1/ztWz7YLCf48iZdDj3/mTwa3zejYTcd2amG/YDB+86R3w3YzBWb1/0PmyZ9sVfHm+ft/aBHvbJFBDyoGwJkqX++/gzY6SCYimqKt/upgB/Z3/+b+une5VG2is4S+9MOkTQ/qCKaH3bpDtl44XfvJnw5z9/LfoFasWiE4GKac+vQGr7Ca0PCT0R85MKog0ueDnUAMY6nbTnoZBFNjuzVDLmrH0mnovSzUKdcgWdqgOS9Q8xqpcKxmRsGUqbfVBtHBsHjO9LQNdHIyodDauUDvqc/VtFnUqokP2Ec1uMydgC5MuyF26LgTMI9YRfoYhPcfZMID0xLNpu2QSNUxxnUD2J68dUyOcaOcYWBaN1yg180i/odDJIM1HNyTkDt8FcDcTjSKBJUQhkZPDfkIpUQDgGuLn1BNii0rSnRx1SAZgF+Mm43/HsLkhVQq7ZAI4E6j3FVKVHLlqpNiABzZHgvzVzpAEo89Ni07RTow4dgYfH4TnreqmkM3kQ8vaucWV4/ekrYacO8HdO/z+1FskbdSoa1kgDGFt2C/90VCXUb8ejW8Vn4D0O3IPH611PM3HN+d9ASu5XGlRsWO4lGuHbGN3NRC9fNIyszPheqMNICRs77mJsGexecxlIdiQ44mIh7TyzPdYSFKI1ORnwLY9m6k4Ycc6R4gskRXFgdXRJRV4K2svAllEuc0GxNxUebjXJQOgjaDgfpUL0KuTFhOMePwm5fTAZdPYY96+K4amHMLbAPTdOxP3rt4v60GqY11u0DOm9B6CTKESs93JXhlHfTlXk9KxCgg+qzbENYEzGZoatvD0RWADIV8PCx1u3IT1+wk2HZXkk/Ow5R+c+lHAHZ8apqA5nYDBjMrZD8YSqXM3EtAt7teM6pMfNptywnaqIMdzpC7wPLdMjpKnWao/tPbDyjLk7kHBf/iQVuoL+/c1eXrDm2VO2nvPnGICzpse5kX/LWIz53EgGQlz+bCpyzU3HnCY0EUIJ9wzOdzMGYw2bCVd5dMYInfNQSzwNpXw3Y1DfO4I8cOj6uxidZzG9asrBWcF38Z18d/9EfDhfTA7Fq9mheDn9v17PnwowAAuagsotFM1MAAAAAElFTkSuQmCC'
      }
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5QTY3RjA5MzY0MzExRTc5Rjc4RTYwNzg5OEVBQ0M2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5QTY3RjBBMzY0MzExRTc5Rjc4RTYwNzg5OEVBQ0M2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDlBNjdGMDczNjQzMTFFNzlGNzhFNjA3ODk4RUFDQzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDlBNjdGMDgzNjQzMTFFNzlGNzhFNjA3ODk4RUFDQzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7dGCK2AAAEAElEQVR42qxXS09TQRT+einyLBZ5lABRKKJRSYCkFRI2TVy4MGHBPyDhD7gzJq7cuPMPmPAPWJC4MTHpxkC1iSKPTaEFCcpb0FJQlHq+O9y2l0dnVL7kptO558535sw5Z87xZLNZGOHoqBP7+wPY2Qlhd7cL37+3I5MJ2O8qK9fg86Vw+fIM/P44KirewLISJst6tAr8+hXBxsYQkslBfP58DV+/QhQBTn7n8UCIgdpaoLl5CcHgOBoaxuD1Rv9NgWw2iM3NEczNDSORaEI6jb9CdTXQ2bmK27dHUV//QhRMmivw+/c9IX2IyckHYnL8F/x+oL//pSjzHCUlr/UKHB4O4sOHJ3j3LoSfP3EhuHQJCIfj6Ol5itLS8fMVODq6h3j8mew8JGNcKCyLlogjFHok45wlrAKRoG32WOziydXmYK9NDnIdw5sT2NkZQTT6QM5fv9iVK+qpqlL/9/aA7W31FAPXJkcg8FF843FegWw2ImYftsOrGEpKRPcgvftsBRIS+skkim6CHOS6f/+VREZUHcH29pAdajp0dPAcgRs3lGNtbEBCFSgvV3N8RxkdyEXOYx/oxPv3g1rTM5zCYaCuDvj0ibvIP7EY8OWLekcZyuqOgpzCbcmfAczPX9Nq3d4OyWyQFKxI5+YgmRFYWQGmp5USBwdKhrI6kFO4LUmtIftDHVpb1e/ysiI+iaUlYG3NLVsM5BRuS86xyyiMHIejBc5O3cila0dWB+G2xBnajYQzGfXLc+bFc1aE8CIqlNVBuC2J/4CRME1MNDerULQsN/nNm5BLxy2rg3B7jTMZ47urSzlZX5/y9N1dZQ3u/NatfGgmk8bLemUhes5VraTj/XfvQjIZpPhQc1SgpgZyySgnfPv2fD85HdprXsloKSMFHCswpzPZNDXlTc5ktLoKLCwAi4vm94NwW2LSGeMP6OmplLLE1FR+nmPO8Z1piUcItyXnF7dTqSkYYi0tcH3DMedMw8/5Rrgt8eA3uH59yfhD5z7o6cnPcWx6Dzggp3AzlhLo7R23Q8kEh4cqixVmT+c/35mAXOQUbuvYGcbsAtLUEc/zAdPwIxc5cxWR3MtiwlG7rNbhxw+VaHgjOuCYc3ynAznIRU5XSeb3v0Ak8lLqeLNdsLBg0uGjK2RyWUfWJge5TpVkYkC7dP72LYCJCX1dyN3S7M7YpCjt64vbHOQqWpZPTamy3GRhE5SVqbK8u1tTlhc2JgsLqjHRFZomBSwbk44Ow8aksDXb2hrB7OywVC9Nxvndgc/HWF/FnTujcoX/ZWvmtkYE6+tDkuPzzSnv+5M+wjOurMw3p21t42hsHJNd/2Nzetoi7vY8nXa359XV7vbc4zFqz/8IMAAHw9XvjAQDRwAAAABJRU5ErkJggg=='
    },
    handleServeClick () {
      this.$router.push('/detail/' + this.$route.params.contentId + '/serve')
    },
    handleDynamicClick () {
      this.$router.push('/detail/' + this.$route.params.contentId + '/dynamic')
    }
  }
}
// https://yapi.tuwan.com/Content/getContentApi/?id=37&callback=_jsonpasbzej5ca15
</script>
<style lang="scss" scoped>
.content-banner-img {
  width: 100%;
  height: 230px;
  background-size: 100%;
  background-position: center center;
}
.swiper-pagination {
  text-align: right;
}
.swiper-pagination-bullet-active {
  background: rgba(251, 125, 131, 1) !important;
}
// .swiper-pagination-bullet{
//   background:rgba(255,255,255,0.5) ;
// }
// .swiper-pagination-bullet-active{
//   background: rgba(251,125,131,1);
// }
.content-headbg {
  color: #fff;
  display: flex;
  position: absolute;
  bottom: 0;
  z-index: 1;
  height: 50px;
  background: url(https://res.tuwan.com/templet/weixin/play/images/contentheadbg.png)
    repeat-x center bottom;
  width: 100%;
}
.header_content {
  height: 40px;
  width: 40px;
  overflow: hidden;
  border: solid 2px #fff;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
.banner_bottom {
  margin-top: 5px;
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 200;
  justify-content: space-around;
  img {
    width: 15px;
  }
}
.tabs-nav {
  height: 50px;
  li {
    float: left;
    width: 50%;
    text-align: center;
    font-size: 18px;
    line-height: 45px;
  }
  background: #ffffff;
}
.tabs-nav.active {
  border-bottom: #ff616b solid 4px;
  color: #ff616b;
}
#tabs {
  position:fixed;
  bottom: 0;
  height: 45px;
  z-index: 5;
}
</style>
