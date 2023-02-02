import { createStore } from 'vuex'
import { getSession } from "@/assets/js/axios/axios.js"
import router from "../router/index.js"

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      userInfo: {},
      isCollapse: false
    }
  },
  actions: {
    async handlerUserInfo(context) {
      // 获取session信息
      let data = await getSession()
      // 不存在账号信息,不允许往下执行
      if (!data.code) {
        router.replace("/");
        return
      }
      context.commit("ADDUSERINFO", data.data.data)
    }
  },
  mutations: {
    ADDUSERINFO(state, value) {
      state.userInfo = value
    },
    HANDLERISCOLLAPSE(state, value){
      state.isCollapse = value
    }
  }
})
export default store
