<template>
    <div class="hander">
        <div class="parser" @click="handlerShow">
            <el-icon v-if="bol">
                <Fold />
            </el-icon>
            <el-icon v-else>
                <Expand />
            </el-icon>
            
            {{route.meta.title}}
        </div>
        <div class="parser-info">
            <el-avatar :size="40" :src="'/api/' + store.state.userInfo.userImg" />
            <el-popconfirm title="是否确定退出?" confirm-button-text="确定" cancel-button-text="取消" @confirm="confirmEvent">
                <template #reference>
                    <span class="element-icons el-icon-tuichu"></span>
                </template>
            </el-popconfirm>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { Expand, Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { setDestory } from '@/assets/js/axios/axios.js'
import { useRouter,useRoute} from 'vue-router'

//　定义属性使用
const store = useStore()
const router = useRouter()
const route = useRoute()
// 操作布尔值
let bol = ref(false)
// 确定退出执行函数
const confirmEvent = async () => {
    await setDestory()
    router.replace("/")
}
// 设置缩放
const handlerShow = () => {
    bol.value = !bol.value
    store.commit("HANDLERISCOLLAPSE",!bol.value)
}
</script>

<style lang="sass" scoped>
.hander
    display: flex
    justify-content: space-between
    line-height: 60px
    .el-avatar
        vertical-align: middle
        margin-right: 15px
    .element-icons
        vertical-align: middle
        cursor: pointer
        font-size: 20px
</style>