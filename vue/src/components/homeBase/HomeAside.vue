<template>
    <div class="aside">
 
        <el-menu class="el-menu-vertical-demo" :router="true" :collapse="isCollapse"  background-color="#2F4156" text-color="#fff">
            <el-menu-item index="/person">
                <el-icon>
                    <UserFilled />
                </el-icon>
                <template #title>个人中心</template>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon class="element-icons el-icon-gonghaixueyuan"></el-icon>
                    <span>学员</span>
                </template>
                <el-menu-item index="2-1">
                    <template #title>
                        <el-icon class="element-icons el-icon-xueyuanguanli"></el-icon>
                        <span>学员管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="2-2"><template #title>
                        <el-icon class="element-icons el-icon-jurassic_import-form"></el-icon>
                        <span>导入学员</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon class="element-icons el-icon-kecheng"></el-icon>
                    <span>课程</span>
                </template>
                <el-menu-item index="3-1">
                    <template #title>
                        <el-icon class="element-icons el-icon-kechengguanli"></el-icon>
                        <span>课程管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="3-2"><template #title>
                        <el-icon class="element-icons el-icon-kechengbiao"></el-icon>
                        <span>个人课程</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="4">
                <el-icon class="element-icons el-icon-bianjiwenzhang_huaban"></el-icon>
                <template #title>文章</template>
            </el-menu-item>

            <el-sub-menu index="5">
                <template #title>
                    <el-icon class="element-icons el-icon-houtaiguanli-quanxianguanli"></el-icon>
                    <span>管理权限</span>
                </template>
                <el-menu-item index="/user">
                    <template #title>
                        <el-icon class="element-icons el-icon-zhanghaoquanxianguanli"></el-icon>
                        <span>账号权限</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/manage"><template #title>
                        <el-icon class="element-icons el-icon-zhanghaoguanli"></el-icon>
                        <span>账号管理</span>
                    </template>
                </el-menu-item>
                
            </el-sub-menu>
            <el-menu-item index="6">
                <el-icon class="element-icons el-icon-bianjiwenzhang_huaban"></el-icon>
                <template #title>查看日报</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup name="HomeAside">
import { ref,computed } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
// 定义属性
const store = useStore()
// 设置缩放初始值
const isCollapse = computed(()=>{
    return store.state.isCollapse
})
</script>

<style lang="sass" scoped>
.aside
    .el-menu-vertical-demo:not(.el-menu--collapse) 
        width: 200px
        min-height: 400px
    .el-menu
        border-right: solid 1px #2F4156 

  
</style>