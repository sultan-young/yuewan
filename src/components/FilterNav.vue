<template>
    <div id="filterNav" >
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods: {
        clickEvent(){
            this.$emit("click")
        }
    }
}
</script>

<style lang="scss" scope>
    #filterNav{
        position: fixed ;
        right: 0;
        height: 103%;
        top: 0;
        // bottom: 0;
        background: #fff;
        width: 70%;
        z-index: 9;
    }
    
</style>