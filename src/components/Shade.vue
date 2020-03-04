<template>
    <div id="shade" @click="clickEvent()">
        <div>
        </div>
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

<style lang="scss" scoped>
    #shade{
        width: 100%;
        height: 100%;
        position: fixed;
        background: #00000090;
        top: 0;
    }
</style>