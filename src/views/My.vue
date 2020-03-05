<template>
    <div>
       <div class="scrollinner">
          <div class="header" @click="handlock()">
              <!-- <router-link class="header" tag="div" to="/my/myname"> -->
              <img src="https://uc.tuwan.com/images/noavatar_middle.gif" class="img1">
              <div class="userinfo_info">
                  <p class="pname">twm_d2b337b14<img src="https://res.tuwan.com/templet/play/images/app/0.png" alt=""></p>
                  <p class="pid"> UID : 2939303</p>
              </div >
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2">
          </div>
          <div class="useritem_content">
              <img src="http://res.tuwan.com/templet/weixin/yuewan/static/img/diamond_icon.de89923.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fl">充值钻石</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
             <div class="useritem_content">
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/money_icon.7ab66c0.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fi">我的钱包</div>
                <div class="useritem_left fr" style="color:red; margin-right:5%;">充值</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr" style="color:red;">
          </div>
            <div class="useritem_content fb">
                <div class="fi">
                    <p>0.00</p>
                    <p>约玩币</p>
                </div>
                 <div class="fi">
                    <p>0</p>
                    <p>贡献值</p>
                </div>
            </div>
           <div class="useritem_content">
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/vip_icon.e742211.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fl">我的订单</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
           <div class="useritem_content">
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/setting_icon.e633505.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fl">设置中心</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
           <div class="useritem_content">
              <img src="http://res.tuwan.com/templet/weixin/yuewan/static/img/diamond_icon.de89923.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fl">申请入驻</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
           <div class="useritem_content">
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/kefu_icon.c89a213.png" alt="" class="useritem_icon fi">
                <div class="useritem_left fl">联系客服</div>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
       </div>
    </div>
</template>
<script>
export default ({
  methods: {
    handlock () {
      this.$router.push('/my/myname')
    }
  }
})
</script>
<style lang="scss" scoped>
  .fi{
     float: left;
  }
  .fr{
      float: right;
  }
  .fb{
      height: 14% !important;
      margin-top: 0 !important;
      div{
        text-align: center;
        line-height: 1.2;
        font-size: 0.84rem;
        width:50%;
         margin-top: 5%;
        p{
         margin: 0 0 10px;
        }
         p:nth-child(1){
            color:#666;
         }
          p:nth-child(2){
            color:#999;
         }
      }
  }
.useritem_content {
    width: 100%;
    float: left;
    background: #fff;
    // padding: 4% 5%;
    border-top: solid 1px #e8e8e8;
    line-height: 0;
    color: #333;
    position: relative;
    height: 7%;
    margin-top:0.6rem;
    .useritem_left {
        font-size: 1rem;
        padding: 0 3% 0 2%;
        line-height: 2.9rem;
        color: #333;
        text-indent: 1.72rem;
        position: relative;
    }
    .useritem_icon{
            position: absolute;
            width: 0.84rem;
            left: 5%;
            top: 50%;
            transform: translateY(-50%);
    }
}
  .img2{
        width: 0.39rem;
        top: 50%;
        position: absolute;
        right: 5%;
        transform: translateY(-50%);
    }
    .scrollinner{
        width: 100%;
        height:100%;
        background-color:#f5f5f5;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }
    .header{
            position: relative;
            margin:20px 0 0;
            background: #fff;
            line-height: 0;
            border-top: solid 1px #e8e8e8;
            /* border-bottom: solid 1px #e8e8e8; */
            float: left;
            width: 100%;
            margin-top: 0.2rem;
    .img1{
          width: 4rem;
          border-radius: 50%;
          border: solid 2px #ebebeb;
          float: left;
    }
    .userinfo_info{
        line-height: 0.3rem;
        float: left;
         padding: 2% 3% ;
        width: 50%;
        img{
            width: 1.98rem;
            display: inline-block;
            margin-left: 8px;
        }
        .pid{
                color: #858585;
                font-size: 0.26rem;
                font-weight: 200;
                line-height: 0.4rem;
                position: relative;
                text-indent: 0.6rem;
                padding: 7% 0;
        }
    }

    }

</style>
