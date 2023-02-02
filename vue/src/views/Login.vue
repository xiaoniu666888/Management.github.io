<template>
    <div class="wrap">
        <el-form ref="ruleFormRef" :model="ruleForm"  :rules="rules" label-width="80px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"  autocomplete="off"  :prefix-icon="UserFilled" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码" prop="userPass">
                <el-input v-model="ruleForm.userPass" type="password" autocomplete="off" 
                :prefix-icon="MoreFilled" 
                @keyup.enter="submitForm(ruleFormRef)"
                placeholder="请输入密码"/>
            </el-form-item>
           
            <el-form-item label-width="0px">
                <div class="flex-box">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
                    <el-button @click="reg(ruleFormRef)">注册</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { UserFilled,MoreFilled } from '@element-plus/icons-vue'
import {validatename,validatePass} from '@/hooks/handlerRegExp.js'
import {createName,loginName} from '@/assets/js/axios/axios.js'
import {useRouter} from "vue-router"
import {useStore} from 'vuex'
// 执行userRouter获取路由导航
const router = useRouter()
const store = useStore()
// 设置获取表信息
const ruleFormRef = ref()
// 双向绑定数据
const ruleForm = reactive({
  userName: '',
  userPass: ''
})
// 表单验证规则
const rules = reactive({
  // trigger触发验证方式
  userName: [{ validator: validatename, trigger: 'blur' }],
  userPass: [{ validator: validatePass, trigger: 'blur' }],

})
// 登录功能
const submitForm = (formEl) => {

  if (!formEl) return;
  // 表单验证状态
  formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过 true
      let data = await loginName(ruleForm)
      // data.code为0 
      if(!data.code) return;
      // 存储账号数据
      store.commit("ADDUSERINFO",data.data)
      // 跳转路由地址
      router.push("/home")
      // // 清空表单
      // formEl.resetFields()
    } else {
      // 验证不通过 false
      return false
    }
  })
}
// 注册功能
const reg = (formEl) => {

  if (!formEl) return
  // 表单验证状态
  formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过 true 发送请求至后端注册账号密码
      let data = await createName(ruleForm)
      // 清空表单
      formEl.resetFields()
    } else {
      // 验证不通过 false
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style lang="sass" scoped>
.wrap
    position: fixed
    width: 100%
    height: 100%
    background: #2F3133
.demo-ruleForm
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    width: 400px
    height: 180px
    margin: auto
    border-radius: 8px
    border: solid 1px #fff
    padding-top: 20px 
.el-input
    width: 85%
.flex-box
    width: 100%
    text-align: center
    margin-left: 0 !important
</style>