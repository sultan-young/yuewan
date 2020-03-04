<template>
  <div>
    <i class="iconfont icon-shouye" title="回到首页" @click="backHome()"></i>
  </div>
</template>

<script>
export default {
    methods: {
        backHome(){
            this.$router.push("/home")
        }
    }
}
</script>

<style lang="scss" scoped>
    i{
        background: #ffffffbb;
        box-shadow: 0px 0px 2px 6px #cccccc90;
        padding: 8px;
        border-radius: 50%;
        position: fixed;
        bottom: 50px;
        right: 20px;
        z-index: 10;
    }
</style>