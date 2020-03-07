<template>
    <div>
      <div class="scrollinner">
          <div class="h4head">
            <h4>个人资料</h4>
          </div>
          <div class="header">
               <b>头像</b>
               <img src="https://uc.tuwan.com/images/noavatar_middle.gif" class="img1">
               <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
          <div class="nav">
             <div class="nav1">
                  用户名  
             </div>
             <span style=" position: absolute; top:20%;font-size: 0.84rem;">twm_d2b337b14</span>
             <span style="font-size: 0.66rem; position: absolute; right: 0px; top:20%;color: rgb(153, 153, 153);">此项不可修改</span>
          </div>
          <div class="nav">
             <div class="nav1">
                  昵称 
             </div>
             <input type="text" placeholder="请输入昵称" class="fl nickname_inport">
          </div>
           <div class="nav">
             <div class="nav1">
                QQ
             </div>
             <input type="text" placeholder="请输入QQ号" class="fl nickname_inport">
          </div>
           <div class="nav">
             <div class="nav1">
                  性别
             </div>
             <input type="text" placeholder="请输入性别" class="fl nickname_inport">
          </div>
           <div class="nav">
             <div class="nav1">
                  生日 
             </div>
             <input type="text" placeholder="" class="fl nickname_inport">
          </div>
           <div class="nav">
             <div class="nav1">
                  城市
             </div>
             <input type="text" placeholder="请输入你所在城市" class="fl nickname_inport">
          </div>
           <div class="nav">
             <div class="nav1">
                  手机号 
             </div>
             <input type="text" placeholder="" class="fl nickname_inport">
          </div>
           <div class="nav fb" @click="handcheck()">
               <a href="" style="font-size: 0.9rem;color: #475d89;padding-left: 0.3rem;position:absolute;top:27%;left:5%;">返回上一页</a>
              <img src="//res.tuwan.com/templet/weixin/yuewan/static/img/right_icon.f622e47.png" alt="" class="img2 fr">
          </div>
         <div class="keep">保存</div>
      </div>
    </div>
</template>
<script>
export default {
    methods:{
      handcheck(){
          this.$router.back()
      }
    }
}
</script>
<style lang="scss" scoped>
.fb{
  position: absolute;
  margin-top: 5%;
}
.nickname_inport{
        width: 73%;
    font-size: 0.9rem;
    padding-left: 3%;
    height: 2.6rem;
    line-height: 2.6rem;
    margin-top: 0.3rem;
    border: none;
    background: #fff;
}
.fl {
    float: left;

}
      .nav{
        width: 100%;
        height: 3rem;
        background-color: #fff;
        border-bottom: 1px solid #928e8e;
        .nav1{
          color: #404040;
          font-size: 0.9rem;
          width: 24%;
          height: 100%;
          line-height: 300%;
          text-align: center;
          float: left;
        }
      }
      b{
          color: #404040;
          font-size: 1rem;
          width: 24%;
          line-height: 1.6rem;
          height: 1.6rem;
           position: absolute;
          left: 5%;
          top: 30%;
          font-weight: 500;
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
        .h4head{
          
          position: relative;
          width: 100%;
          height: 6%;
        }
        h4{
          position: absolute;
          left: 5%;
          top: 40%;
          font-weight: 500;
          font-size:1rem;
      }
    }
    .header{
      border-bottom: #928e8e solid 1px;
      position: relative;
      height: 4.8rem;
      background-color: #fff;
      }
    .keep{
      background-color: #ff626b;
      color: #fff;
      text-align: center;
      line-height: 3rem;
      height: 3rem;
      bottom: 0;
      position: fixed;
      width: 100%;
      z-index: 2;
    }
     .img1{
          width: 3rem;
          position:absolute;
          border-radius: 50%;
          border: solid 2px #ebebeb;
          float: right;
          right: 10%;
          top:20%;
    }
     .img2{
        width: 0.5rem;
        top: 50%;
        position: absolute;
        right: 5%;
        transform: translateY(-50%);
        float:right;
    }
</style>
