<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <HomeAside></HomeAside>
      </el-aside>
      <el-container>
        <el-header>
          <HomeHander></HomeHander>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import HomeHander from "@/components/homeBase/HomeHander.vue"
import HomeAside from "@/components/homeBase/HomeAside.vue"

</script>

<style lang="sass" scoped>
.common-layout
.el-container
    min-height: 100vh

    .el-aside
      width: auto
      background-color: #2F4156
    .el-header
        background: #fff
        height: 60px
    .el-main
        background: #eee
    .box
      user-select: none
</style>
