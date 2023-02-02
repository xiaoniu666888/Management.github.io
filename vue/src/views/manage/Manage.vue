<template>
  <div class="wrap">
    <!-- 设置新增 -->
    <div class="warp-handler">
      <el-button type="primary" @click="dialogTableVisible = true">新增账号</el-button>
      <div class="search">
        <el-input placeholder="请输入搜索名称" v-model.trim="inputValue"></el-input> &nbsp;
        <el-button type="primary" @click="handlerSearch">搜索</el-button>
        <el-button type="primary" @click="handlerRoleData">重置</el-button>
      </div>
    </div>
    <!-- 对话框 设置表单-->
    <el-dialog v-model="dialogTableVisible" title="添加账号">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="账号名称" prop="name">
          <el-input v-model.trim="ruleForm.name" type="text" autocomplete="off" placeholder="设置字母开头" />
        </el-form-item>
        <el-form-item label="账号密码" prop="pass">
          <el-input v-model.trim="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="部门" prop="txt">
          <el-input v-model.trim="ruleForm.txt" placeholder="请选择部门" />
        </el-form-item>
        <el-form-item label="账号权限" prop="jurisdiction">
          <el-select v-model.trim="ruleForm.jurisdiction"  placeholder="账号权限" size="default">
            <el-option
              v-for="item in selectArr"
              :key="item._id"
              :label="item.roleName"
              :value="item._id"
          />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">添加账号</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { validatename, validatePass, validateTrim } from '@/hooks/handlerRegExp.js'
import { getJurisdiction } from "@/assets/js/axios/axios.js"
import {userFormClear} from '@/hooks/handlerData.js'


// 搜索框绑定值
let inputValue = ref("")
// 显示对话框
let dialogTableVisible = ref(false)
// 设置下拉框显示数据
let selectArr = ref([])
// 绑定ref
const ruleFormRef = ref()
// 表单验证
const ruleForm = reactive({
  name: "",
  pass: '123123',
  txt: '',
  jurisdiction: '',
})
// 验证
const rules = reactive({
  name: [{ validator: validatename, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  txt: [{ validator: validateTrim, trigger: 'blur' }],
  jurisdiction: [{ validator: validateTrim, trigger: 'blur' }],
})

// 添加账号函数
const submitForm = (formEl)=>{
  if (!formEl) return;
  // 表单验证状态
  formEl.validate(async (valid) => {
    if (valid) {
        console.log(ruleForm);
    } else {
      // 验证不通过 false
      return false
    }
  })
}

// 设置清空
const reset = ()=>{
    // ruleForm.name =  "";
    // ruleForm.pass =  '123123';
    // ruleForm.txt =  '';
    // ruleForm.jurisdiction =  '';
    userFormClear(ruleForm)
}

const handlerSearch = () => {

}
const handlerRoleData = () => {

}
// 获取设置的账号权限
onMounted(() => {
  handerInit()
})
// 账号权限初始化
const handerInit = async () => {
  let data = await getJurisdiction()
  selectArr.value = data.data
}
 

</script>

<style lang="sass" scoped>
.wrap 
    .warp-handler
        display: flex
        justify-content: space-between
        margin-bottom: 15px
    .search
        display: flex
        width: 400px
        justify-content: sapce-between
</style>