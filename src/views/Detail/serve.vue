<template>
  <div class="serve">
    <div class="swiper-container" id="swiper2">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="data in datady.gameinfo" :key="data.dtid">
          <div class="header_img" :style="{backgroundImage: 'url('+data.randimg+')'}"></div>
          <div class="header_title">{{data.dtidname}}</div>
        </div>
      </div>
    </div>
    <div class="order_box">
      <div class="order_01">{{datady.gameinfo[index] ? datady.gameinfo[index].dtidname: ""}}</div>
      <div class="order_02">{{datady.gameinfo[index] ? datady.gameinfo[index].grading : ""}}</div>
      <div class="voice">
        <video :src="datady.gameinfo[index].speech" webkit-playsinline="true" id="videoMp3" playsinline="true"></video>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAmCAYAAADa8osYAAAC80lEQVRIibWXTUhUURTHf47S9GmLCCMlaiotKouCIosWtgqCIEqoIJTITV9UZNAXRDDUhEJBJSRFLgJBqkWLkhKyhSElRPTpR7SJ0gizFDTTFm8enXfmXGfUPKv7u/f/zv++O/fedyZtqGQfo4w84BwQBsqBhuHEodG6ANeACJANVACF42X0SHEMWDkeRlHggeqrBHL+txHAKaBR5bs8WqMChl//A0C74DlA2UiN9uDNMAbcBiY6dHrrFuHtypSNVol2LlDt0HUC51Xf8ZEYVQB9giPAJYe2luAS5iOWPJlRK1AMDIq+dcAuhz6meK9llOZ4uAU4pPoOAzMM7XOgSfBC4r9VCG+X3ALuA5scZo3ATdV30qG9p3i7b1QOLAGy8O6uYkeCK8AvwRuAmYauHugWnO8b1Svh/ngSKy4qLjI0A8BjwRFgdgjvcqxS4rPAZCPJQ8XbsDfUR8XrfVEl8EQMTIsnsWbboHSzDF2L4jw5mzNAr+DNRgKAOsXzDM074I/gTGnUQ3BrRoC5RhK9LLmG5ifwRfAUvb5vFS81kvQptnYeQJdoh7VRp+KpRoJBxRkOIzmhDG2UpbibxNDPDDiMJon2b/1QnuLXRoIJir85jKaLdn9IDawW3AZ8MhIsUPze0GQSXJ0eaRQleEjvOGaq78M2Q7MYSBfc5RsdAdbIAeCukSAdWCv4B/DV0CW8dShuslMNnAD6jQRbFNcAQ4ZuvuKGEME3Ae/ibMKOo4prDU2YYDHTCnSE8D5izXj3U1l8li6TsOA64Luh20jw/L0E77B9Bkodyf0oBHaoPl2M+LFVcQ2kVtctI7EWiGIf5gJgheA3xAuWZEaLSPyE1+He+rpwvO43khkdU/wKb0dasZtg3f0CeJqqkfwYNgMlDl02cFD1XZDgunn9qAY+4N0YurbwIw24qvpuECwmkxoBPEsyXoX3Rn60G8Zj/ttSASwX3ItXRSXEWIxiJJZlpUCHJU5l6VyRw79ipg84jVeUmPEXHG6JJsC7fqMAAAAASUVORK5CYII="
          alt />
        <span>{{datady.gameinfo[index].speech_durtion}}秒</span>
      </div>
      <div class="order_03">接单{{datady.gameinfo?Math.ceil(datady.gameinfo[index].total):""}}次</div>
      <div class="present" v-html="datady.gameinfo?datady.gameinfo[index].desc:''"></div>
    </div>
    <backBtn></backBtn>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {
    mapMutations
  } from 'vuex'
  import backBtn from '@/components/BackHome'
  export default {
    props: ['datady'],
    data() {
      return {
        index: 0
      }
    },
    beforeMount() {
      this.datady.gameinfo = []
      this.datady.gameinfo.push("")
    },
    mounted() {
      this.setFootNavHidden()
    },
    updated() {
      console.log(this.datady)
      new Swiper('#swiper2', {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    methods: {
      ...mapMutations(["setFootNavHidden"])
    },
    components: {
      backBtn
    }
  }

</script>
<style lang="scss" scoped>
  .serve {
    overflow: scroll;
  }

  .swiper-wrapper {
    height: 110px;
    background: #f6f6f6;
    padding: 10px 1px;
  }

  .swiper-slide {
    width: 115px !important;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 1.5px 2.598px 7px 0px rgba(0, 0, 0, 0.2);
  }

  .header_img {
    margin: 5px auto;
    width: 90%;
    height: 70%;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .header_title {
    font-size: 12px;
    font-weight: 200;
    color: #f92246;
    margin-left: 7px;
  }

  .order_box {
    background: #ffffff;
    padding: 5px 15px;
    height: 250px;

  }

  .order_01 {
    font-size: 17px;
    color: #333333;
    border-left: #ff616b solid 5px;
    padding-left: 5px;
    line-height: 15px;
    font-weight: 300;
    float: left;
  }

  .order_02 {
    font-size: 12px;
    color: #fff;
    background-color: #ffd4af;
    line-height: 18px;
    height: 18px;
    text-align: center;
    width: 40px;
    border-radius: 4px;
    margin-left: 10px;
    float: left;
  }

  .order_03 {
    font-size: 13px;
    color: #666666;
    font-weight: 300;
    margin-top: 20px;
  }

  .voice {
    position: relative;
    text-indent: 40px;
    color: #ffa7ad;
    font-size: 14px;
    border: #ffa7ad solid 1px;
    width: 90px;
    padding-left: 5px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    float: right;
    display: flex;
    margin-right: 20px;
    justify-content: space-around;
    img {
      width: 10px;
      display: inline-block;
      margin-right: 12px;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    video {
      position: absolute;
      left: -9999px;
      top: 0;
      width: 0;
      height: 0;
    }
  }

  .present {
    font-size: 13px;
    color: #666666;
    line-height: 25px;
  }

</style>
