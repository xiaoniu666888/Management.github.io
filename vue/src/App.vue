<script setup>
import { useStore } from "vuex"
// 执行刷新时  重新获取session进行免登录
const store = useStore();
store.dispatch("handlerUserInfo")
</script>

<template>
    <router-view></router-view>

</template>

<style lang="sass" scoped>

</style>
